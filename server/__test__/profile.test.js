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

const pre_inserted_dummy_account_03 = {
  username: "pre-InsertedDummy03",
  email: "pre-InsertedDummy03@mail.com",
  password: hashPassword("password"),
};

const profile_dummy_account_02 = {
  fullName: "Dummmy02",
  bio: "this is a dummy account",
};

describe("GET /profile", () => {
  describe("Success", () => {
    test("should return status 200 and array of profiles", async () => {
      let { status, body } = await request(app)
        .get("/profile")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(200);
      expect(body).toEqual(expect.any(Array));
      expect(body).not.toHaveLength(0);
      expect(body[0]).toHaveProperty("id", expect.any(Number));
      expect(body[0]).toHaveProperty("fullName", expect.any(String));
      expect(body[0]).toHaveProperty("profileImgUrl", expect.any(String));
      expect(body[0]).toHaveProperty("bio", expect.any(String));
      expect(body[0]).toHaveProperty("createdAt", expect.any(String));
      expect(body[0]).toHaveProperty("updatedAt", expect.any(String));
      expect(body[0]).toHaveProperty("User", expect.any(Object));
      expect(body[0].User).toHaveProperty("id", expect.any(Number));
      expect(body[0].User).toHaveProperty("username", expect.any(String));
      expect(body[0].User).toHaveProperty("createdAt", expect.any(String));
      expect(body[0].User).toHaveProperty("updatedAt", expect.any(String));
    });
  });

  describe("Failed", () => {
    test("Should return status 401 unauthenticated when haven't logged in yet", async () => {
      let { status, body } = await request(app).get("/profile");

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 401 unauthenticated when token is invalid", async () => {
      let { status, body } = await request(app)
        .get("/profile")
        .set("Authorization", `Bear ${access_token_user_1}`);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });
  });
});

describe("POST /profile", () => {
  describe("Success", () => {
    test("Should return status 201 and a success message", async () => {
      let { status, body } = await request(app)
        .post("/profile")
        .field("fullName", profile_dummy_account_02.fullName)
        .field("bio", profile_dummy_account_02.bio)
        .attach("image", image, "image.png")
        .set("Authorization", `Bearer ${access_token_user_2}`);

      expect(status).toBe(201);
      expect(body).toHaveProperty("message", "Profile created Succesfully.");
    });
  });

  describe("Failed", () => {
    test("should return status 401 unauthenticated when haven't yet logged in", async () => {
      let { status, body } = await request(app)
        .post("/profile")
        .field("fullName", profile_dummy_account_02.fullName)
        .field("bio", profile_dummy_account_02.bio)
        .attach("image", image, "image.png");

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 401 unauthenticated when token is invalid", async () => {
      let { status, body } = await request(app)
        .post("/profile")
        .field("fullName", profile_dummy_account_02.fullName)
        .field("bio", profile_dummy_account_02.bio)
        .attach("image", image, "image.png")
        .set("Authorization", `Bear ${access_token_user_1}`);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 403 unauthorized when the profile is already been created.", async () => {
      let { status, body } = await request(app)
        .post("/profile")
        .field("fullName", "profile_dummy_account_01.fullName")
        .field("bio", "profile_dummy_account_01.bio")
        .attach("image", image2, "image2.png")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(403);
      expect(body).toHaveProperty(
        "message",
        "Profile has already been created."
      );
    });

    test("Should return status 400 image is not attached", async () => {
      let { status, body } = await request(app)
        .post("/profile")
        .field("fullName", "profile_dummy_account_01.fullName")
        .field("bio", "profile_dummy_account_01.bio")
        // .attach("image", image2, "image2.png")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty(
        "message",
        "Image is required."
      );
    });
  });
});

describe("GET /profile/:username", () => {
  describe("Success", () => {
    test("should return status 200 and an object of profile", async () => {
      let { status, body } = await request(app)
        .get("/profile/pre-InsertedDummy01")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(200);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("id", 1);
      expect(body).toHaveProperty("UserId", 1);
      expect(body).toHaveProperty("profileImgUrl", "gimmy.com");
      expect(body).toHaveProperty("bio", "this is a dummy account");
      expect(body).toHaveProperty("createdAt", expect.any(String));
      expect(body).toHaveProperty("updatedAt", expect.any(String));
    });
  });

  describe("Failed", () => {
    test("Should return status 401 unauthenticated when haven't logged in yet", async () => {
      let { status, body } = await request(app).get(
        "/profile/pre-InsertedDummy01"
      );

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 401 unauthenticated when token is invalid", async () => {
      let { status, body } = await request(app)
        .get("/profile/pre-InsertedDummy01")
        .set("Authorization", `Bear ${access_token_user_1}`);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 404 not found when username doesn't exist", async () => {
      let { status, body } = await request(app)
        .get("/profile/unidentifiedUsername099999")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Profile not Found.");
    });
  });
});

describe("PUT /profile/:username", () => {
  describe("Success", () => {
    test("Should return status 201 and a message of success update", async () => {
      let { status, body } = await request(app)
        .put("/profile/pre-InsertedDummy01")
        .field("fullName", "changed_fullname01")
        .field("bio", "changed_bio01")
        .attach("image", imageforupdate, "imageforupdate.png")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(201);
      expect(body).toHaveProperty("message", "Profile updated Succesfully.");
    });

    test("Should return status 201 and a message of success update without image", async () => {
      let { status, body } = await request(app)
        .put("/profile/pre-InsertedDummy01")
        .field("fullName", "changed_fullname01")
        .field("bio", "changed_bio01")
        .set("Authorization", `Bearer ${access_token_user_1}`);

      expect(status).toBe(201);
      expect(body).toHaveProperty("message", "Profile updated Succesfully.");
    });
  });

  describe("Failed", () => {
    test("should return status 401 unauthenticated when haven't yet logged in", async () => {
      let { status, body } = await request(app)
        .put("/profile/pre-InsertedDummy01")
        .field("fullName", "changed_fullname01")
        .field("bio", "changed_bio01")
        .attach("image", imageforupdate, "imageforupdate.png");

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 401 unauthenticated when token is invalid", async () => {
      let { status, body } = await request(app)
        .put("/profile/pre-InsertedDummy01")
        .field("fullName", "changed_fullname01")
        .field("bio", "changed_bio01")
        .attach("image", imageforupdate, "imageforupdate.png")
        .set("Authorization", `Bear ${access_token_user_1}`);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 403 unauthorized user trying to edit profile that isnt their own", async () => {
      let { status, body } = await request(app)
        .put("/profile/pre-InsertedDummy03")
        .field("fullName", "changed_fullname03")
        .field("bio", "changed_bio03")
        // .attach("image", imageforupdate2, "imageforupdate2.png")
        .set("Authorization", `Bearer ${access_token_user_2}`);

      expect(status).toBe(403);
      expect(body).toHaveProperty("message", "You're not authorized");
    });

    test("Should return status 404 when username name not found", async () => {
      let { status, body } = await request(app)
        .put("/profile/unidentifiedUsername99")
        .field("fullName", "changed_fullname03")
        .field("bio", "changed_bio03")
        // .attach("image", imageforupdate2, "imageforupdate2.png")
        .set("Authorization", `Bearer ${access_token_user_2}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Profile not Found.");
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
      UserId: 3,
      fullName: "Dummy Account3",
      profileImgUrl: "gimmy.com3",
      bio: "this is a dummy account3",
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
  await queryInterface.bulkDelete("Profiles", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("PrivateMessages", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});
