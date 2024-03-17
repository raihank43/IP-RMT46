const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt.js");
const { queryInterface } = sequelize;
const { User, PrivateMessage, GroupMessage, Group } = require("../models");
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

const pre_inserted_dummy_account_03 = {
  username: "pre-InsertedDummy03",
  email: "pre-InsertedDummy03@mail.com",
  password: hashPassword("password"),
};

const profile_dummy_account_02 = {
  fullName: "Dummmy02",
  bio: "this is a dummy account",
};

describe("GET /group", () => {
  describe("Success", () => {
    test("should return status 200 and array of conversations in public group", async () => {
      let { status, body } = await request(app)
        .get("/group")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(200);
      expect(body).toEqual(expect.any(Array));
      expect(body).not.toHaveLength(0);
      expect(body[0]).toHaveProperty("id", expect.any(Number));
      expect(body[0]).toHaveProperty("UserId", expect.any(Number));
      expect(body[0]).toHaveProperty("GroupId", expect.any(Number));
      expect(body[0]).toHaveProperty("text", expect.any(String));
      expect(body[0]).toHaveProperty("imgUploadGroup", expect.any(String));
      expect(body[0]).toHaveProperty("createdAt", expect.any(String));
      expect(body[0]).toHaveProperty("updatedAt", expect.any(String));
      expect(body[0]).toHaveProperty("Group", expect.any(Object));
      expect(body[0].Group).toHaveProperty("id", expect.any(Number));
      expect(body[0].Group).toHaveProperty("name", expect.any(String));
      expect(body[0].Group).toHaveProperty("createdAt", expect.any(String));
      expect(body[0].Group).toHaveProperty("updatedAt", expect.any(String));
      expect(body[0]).toHaveProperty("User", expect.any(Object));
      expect(body[0].User).toHaveProperty("Profile", expect.any(Object));
      expect(body[0].User.Profile).toHaveProperty("id", expect.any(Number));
      expect(body[0].User.Profile).toHaveProperty("UserId", expect.any(Number));
      expect(body[0].User.Profile).toHaveProperty(
        "fullName",
        expect.any(String)
      );
      expect(body[0].User.Profile).toHaveProperty(
        "profileImgUrl",
        expect.any(String)
      );
      expect(body[0].User.Profile).toHaveProperty("bio", expect.any(String));
      expect(body[0].User.Profile).toHaveProperty(
        "createdAt",
        expect.any(String)
      );
      expect(body[0].User.Profile).toHaveProperty(
        "updatedAt",
        expect.any(String)
      );
      expect(body[0]).toHaveProperty(
        "messageBelongsToLoggedUser",
        expect.any(Boolean)
      );
    });
  });

  describe("Failed", () => {
    test("Should return status 401 unauthenticated when haven't logged in yet", async () => {
      let { status, body } = await request(app).get("/group");

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 401 unauthenticated when token is invalid", async () => {
      let { status, body } = await request(app)
        .get("/group")
        .set("Authorization", `Bear ${access_token_user_1}`);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });
  });
});

describe("POST /group", () => {
  describe("Success", () => {
    test("should return status 201 and a message being sent", async () => {
      let { status, body } = await request(app)
        .post("/group")
        .field("text", "test send a message to public group")
        .attach("image", image, "image.png")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(201);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("UserId", expect.any(Number));
      expect(body).toHaveProperty("GroupId", expect.any(Number));
      expect(body).toHaveProperty("text", expect.any(String));
      expect(body).toHaveProperty("imgUploadGroup", expect.any(String));
      expect(body).toHaveProperty("createdAt", expect.any(String));
      expect(body).toHaveProperty("updatedAt", expect.any(String));
    });
  });

  describe("Success", () => {
    test("should return status 201 and a message being sent without image", async () => {
      let { status, body } = await request(app)
        .post("/group")
        .field("text", "test send a message to public group")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(201);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("UserId", expect.any(Number));
      expect(body).toHaveProperty("GroupId", expect.any(Number));
      expect(body).toHaveProperty("text", expect.any(String));

      expect(body).toHaveProperty("createdAt", expect.any(String));
      expect(body).toHaveProperty("updatedAt", expect.any(String));
    });
  });

  describe("Failed", () => {
    test("Should return status 401 unauthenticated when haven't logged in yet", async () => {
      let { status, body } = await request(app).post("/group");

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 401 unauthenticated when token is invalid", async () => {
      let { status, body } = await request(app)
        .post("/group")
        .set("Authorization", `Bear ${access_token_user_1}`);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 400 when text is empty", async () => {
      let { status, body } = await request(app)
        .post("/group")
        .set("Authorization", `Bear ${access_token_user_1}`)
        .attach("image", image2, "image2.png")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Message is required.");
    });
  });
});

describe("DELETE /group/:id", () => {
  describe("Success", () => {
    test("Should return 200 and a message of successfull delete", async () => {
      let { status, body } = await request(app)
        .delete("/group/1")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(200);
      expect(body).toHaveProperty("message", "Message succesfully deleted.");
    });
  });

  describe("Failed", () => {
    test("Should return status 401 unauthenticated when haven't logged in yet", async () => {
      let { status, body } = await request(app).delete("/group/1");

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 401 unauthenticated when token is invalid", async () => {
      let { status, body } = await request(app)
        .delete("/group/1")
        .set("Authorization", `Bear ${access_token_user_1}`);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 404 when private message is not found", async () => {
      let { status, body } = await request(app)
        .delete("/group/99")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Data not found");
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
    {
      username: pre_inserted_dummy_account_03.username,
      email: pre_inserted_dummy_account_03.email,
      password: hashPassword(pre_inserted_dummy_account_03.password),
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
    {
      UserId: 2,
      fullName: "Dummy Account2",
      profileImgUrl: "gimmy.com2",
      bio: "this is a dummy account2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      UserId: 3,
      fullName: "Dummy Account3",
      profileImgUrl: "gimmy.com3",
      bio: "this is a dummy account3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  await queryInterface.bulkInsert("Groups", [
    { name: "Public", createdAt: new Date(), updatedAt: new Date() },
  ]);

  await queryInterface.bulkInsert("GroupMessages", [
    {
      UserId: 1,
      GroupId: 1,
      text: "Hello everyone in Public!",
      imgUploadGroup: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      UserId: 2,
      GroupId: 1,
      text: "Hello!",
      imgUploadGroup: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      UserId: 3,
      GroupId: 1,
      text: "Nice to meet you!",
      imgUploadGroup: "",
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
  await queryInterface.bulkDelete("Profiles", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Groups", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("GroupMessages", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});
