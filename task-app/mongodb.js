const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-app";

MongoClient.connect(
  connectionUrl,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to the database");
    }

    const db = client.db(databaseName);

    // CREATE
    db.collection("users").insertMany(
      [
        {
          name: "Abbas",
          age: 23,
        },
        {
          name: "Mostafa",
          age: 27,
        },
        {
          name: "Amir",
          age: 26,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert user");
        }
        console.log(result.ops);
      }
    );

    db.collection("tasks").insertMany(
      [
        {
          description: "complete website design",
          completed: true,
        },
        {
          description: "complete website develop",
          completed: false,
        },
        {
          description: "complete website market",
          completed: false,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("unable to insert many tasks");
        }
        console.log(result.ops);
      }
    );

    // READ
    db.collection("users").findOne(
      { _id: new ObjectID("5e8d69d2f513c023bc89859d") },
      (error, result) => {
        if (error) {
          return console.log("unable to fetch");
        }
        console.log(result);
      }
    );

    db.collection("users")
      .find({ age: 25 })
      .toArray((error, result) => {
        console.log(result);
      });

    db.collection("tasks").findOne(
      {
        _id: new ObjectID("5e8d69d2f513c023bc8985a2"),
      },
      (error, result) => {
        if (error) {
          return console.log("unable to fetch");
        }
        console.log(result);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, result) => {
        console.log(result);
      });

    // UPDATE
    db.collection("users")
      .updateOne(
        { _id: new ObjectID("5e8d67970eb09e30f01a27a6") },
        {
          $set: {
            name: "Osama",
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    db.collection("users")
      .updateOne(
        { _id: new ObjectID("5e8d67970eb09e30f01a27a6") },
        {
          $inc: {
            age: 3,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    db.collection("tasks")
      .updateMany(
        {
          completed: false,
        },
        {
          $set: {
            completed: true,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // DELETE
    db.collection("users")
      .deleteOne({
        age: 31,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    db.collection("tasks")
      .deleteOne({
        description: "complete website market",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
