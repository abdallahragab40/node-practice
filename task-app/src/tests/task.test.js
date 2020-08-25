const request = require("supertest");
const app = require("../app");
const Task = require("../models/task");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Autorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "Handle Series",
    })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
});
