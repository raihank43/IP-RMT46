const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt.js");
const { queryInterface } = sequelize;
const { User, PrivateMessage } = require("../models");
const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../data/image.png");
const filePath2 = path.resolve(__dirname, "../data/image2.png");
const filePath3 = path.resolve(__dirname, "../data/imageforupdated.jpg");
const filePath4 = path.resolve(__dirname, "../data/imageforupdate2.png");
const image = fs.createReadStream(filePath);
const image2 = fs.createReadStream(filePath2);
const imageforupdate = fs.createReadStream(filePath3);
const imageforupdate2 = fs.createReadStream(filePath4);

const user_1 = {
  username: "dummy",
  email: "dummy1@mail.com",
  password: "password",
};

const user_2 = {
  username: "dummy2",
  email: "dummy2@mail.com",
  password: "password",
};

const pre_inserted_dummy_account_01 = {
  username: "pre-InsertedDummy01",
  email: "pre-InsertedDummy01@mail.com",
  password: hashPassword("password"),
};

const pre_inserted_dummy_account_02 = {
  username: "pre-InsertedDummy02",
  email: "pre-InsertedDummy02@mail.com",
  password: hashPassword("password"),
};

describe("GET /:username/message", () => {
  describe("Success", () => {
    test("should return status 200 and array of private message between users", async () => {
      let { status, body } = await request(app)
        .get("/pre-InsertedDummy02/message")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(200);
      expect(body).toEqual(expect.any(Array));
      expect(body).not.toHaveLength(0);
      expect(body[0]).toHaveProperty("id", expect.any(Number));
      expect(body[0]).toHaveProperty("SenderId", expect.any(Number));
      expect(body[0]).toHaveProperty("text", expect.any(String));
      expect(body[0]).toHaveProperty("createdAt", expect.any(String));
      expect(body[0]).toHaveProperty("updatedAt", expect.any(String));
      expect(body[0]).toHaveProperty(
        "messageBelongsToLoggedUser",
        expect.any(Boolean)
      );
      expect(body[0]).toHaveProperty("Sender", expect.any(Object));
      expect(body[0].Sender).toHaveProperty("username", expect.any(String));
      expect(body[0].Sender).toHaveProperty("Profile", expect.any(Object));
      expect(body[0].Sender.Profile).toHaveProperty(
        "profileImgUrl",
        expect.any(String)
      );
      expect(body[0].Sender.Profile).toHaveProperty(
        "fullName",
        expect.any(String)
      );
    });
  });

  describe("Failed", () => {
    test("Should return status 401 unauthenticated when haven't logged in yet", async () => {
      let { status, body } = await request(app).get(
        "/pre-InsertedDummy02/message"
      );

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 401 unauthenticated when token is invalid", async () => {
      let { status, body } = await request(app)
        .get("/pre-InsertedDummy02/message")
        .set("Authorization", `Bear ${access_token_user_1}`);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 404 when username is not found", async () => {
      let { status, body } = await request(app)
        .get("/obviouslyUnidentifiedUsername/message")
        .set("Authorization", `Bearer ${access_token_user_1}`);
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "User not Found.");
    });
  });
});

describe("POST /:username/message", () => {
  describe("Success", () => {
    test("should return status 201 and an object of message data with image", async () => {
      let { status, body } = await request(app)
        .post("/pre-InsertedDummy02/message")
        .field("text", "helllloooo")
        .attach("image", image, "image.png")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(201);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("text", expect.any(String));
      expect(body).toHaveProperty("imgUploadPriv", expect.any(String));
      expect(body).toHaveProperty("SenderId", expect.any(Number));
      expect(body).toHaveProperty("ReceiverId", expect.any(Number));
      expect(body).toHaveProperty("updatedAt", expect.any(String));
      expect(body).toHaveProperty("createdAt", expect.any(String));
    });

    test("should return status 201 and an object of message data without image", async () => {
      let { status, body } = await request(app)
        .post("/pre-InsertedDummy02/message")
        .field("text", "helllloooo")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(201);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("text", expect.any(String));
    //   expect(body).toHaveProperty("imgUploadPriv", expect.any(null));
      expect(body).toHaveProperty("SenderId", expect.any(Number));
      expect(body).toHaveProperty("ReceiverId", expect.any(Number));
      expect(body).toHaveProperty("updatedAt", expect.any(String));
      expect(body).toHaveProperty("createdAt", expect.any(String));
    });
  });

  describe("Failed", () => {
    test("Should return status 401 unauthenticated when haven't logged in yet", async () => {
      let { status, body } = await request(app)
        .post("/pre-InsertedDummy02/message")
        .field("text", "helllloooo")
        .attach("image", image, "image.png")

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 401 unauthenticated when token is invalid", async () => {
      let { status, body } = await request(app)
        .post("/pre-InsertedDummy02/message")
        .field("text", "helllloooo")
        .attach("image", imageforupdate, "image.png")
        .set("Authorization", `Bear ${access_token_user_1}`);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 404 when username is not found", async () => {
      let { status, body } = await request(app)
        .post("/obviouslyUnidentifiedUsername/message")
        .field("text", "helllloooo")
        .attach("image", image2, "image.png")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "User not Found.");
    });

    test("Should return status 400 when text is not given", async () => {
      let { status, body } = await request(app)
        .post("/pre-InsertedDummy02/message")
        .attach("image", imageforupdate2, "image.png")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Message is required.");
    });

    test("Should return status 400 when text is empty", async () => {
      let { status, body } = await request(app)
        .post("/pre-InsertedDummy02/message")
        .send({ text: "" })
        .attach("image", image, "image.png")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Message is required.");
    });
  });
});

describe("DELETE /:id/message", () => {
  describe("Success", () => {
    test("should return status 200 and the deleted message.", async () => {
      let { status, body } = await request(app)
        .delete("/3/message")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(200);
      expect(body).toHaveProperty("message", "Message succesfully deleted.");
    });
  });

  describe("Failed", () => {
    test("Should return status 401 unauthenticated when haven't logged in yet", async () => {
      let { status, body } = await request(app).delete("/2/message");

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 401 unauthenticated when token is invalid", async () => {
      let { status, body } = await request(app)
        .delete("/3/message")
        .set("Authorization", `Bear ${access_token_user_1}`);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 404 when private message is not found", async () => {
      let { status, body } = await request(app)
        .delete("/99999/message")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Data not found");
    });

    test("should return status 403 Forbidden when user trying to delete a message that isnt their own", async () => {
      let { status, body } = await request(app)
        .delete("/2/message")
        .set("Authorization", `Bearer ${access_token_user_1}`); // akun staff

      expect(status).toBe(403);
      expect(body).toHaveProperty("message", "You're not authorized");
    });
  });
});

beforeAll(async () => {
  await queryInterface.bulkInsert("Users", [
    {
      username: pre_inserted_dummy_account_01.username,
      email: pre_inserted_dummy_account_01.email,
      password: hashPassword(pre_inserted_dummy_account_01.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: pre_inserted_dummy_account_02.username,
      email: pre_inserted_dummy_account_02.email,
      password: hashPassword(pre_inserted_dummy_account_02.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  access_token_user_1 = signToken({ id: 1 });
  access_token_user_2 = signToken({ id: 2 });

  await queryInterface.bulkInsert("Profiles", [
    {
      UserId: 1,
      fullName: "Dummy Account",
      profileImgUrl: "gimmy.com",
      bio: "this is a dummy account",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  await queryInterface.bulkInsert("PrivateMessages", [
    {
      SenderId: 1,
      ReceiverId: 2,
      text: "this is a dummy message",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      SenderId: 2,
      ReceiverId: 1,
      text: "this is a dummy message too",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      SenderId: 1,
      ReceiverId: 2,
      text: "this message is for deleted",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});
