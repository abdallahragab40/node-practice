const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("should register a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Omar",
      email: "o@o.com",
      password: "12345678",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response).toMatchObject({
    user: {
      name: "Omar",
      email: "o@o.com",
    },
    token: user.tokens[0].token,
  });
});

test("should login user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.user).toBe(user.tokens[1].token);
});

test("should not login user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "a@o.com",
      password: "123467",
    })
    .expect(400);
});

test("should get profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Autorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete account", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not delete account", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should upload profile image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "src/tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should update valid fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "Hamada" })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Hamada");
});

test("should not update invalid fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "cairo" })
    .expect(400);
});
