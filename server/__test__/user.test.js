const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt.js");
const { queryInterface } = sequelize;
const { User } = require("../models");

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

describe("POST /register", () => {
  describe("Success", () => {
    test("Should return 201 and object of new user", async () => {
      let { status, body } = await request(app).post("/register").send(user_1);

      expect(status).toBe(201);
      expect(body).toHaveProperty("username", expect.any(String));
      expect(body).toHaveProperty("email", user_1.email);
    });
  });

  describe("Failed", () => {
    test("should return status 400 when no username given", async () => {
      let { username, email, password } = user_1;
      let { status, body } = await request(app)
        .post("/register")
        .send({ email, password });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Username is required.");
    });

    test("should return status 400 when username is empty", async () => {
      let { username, email, password } = user_1;
      let { status, body } = await request(app)
        .post("/register")
        .send({ username, email: "", password });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Email is required.");
    });

    test("should return status 400 when email not unique", async () => {
      let { status, body } = await request(app)
        .post("/register")
        .send({ ...pre_inserted_dummy_account_01, email: "difEmail@mail.com" });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Username must be unique.");
    });

    test("should return status 400 when no email given", async () => {
      let { username, password } = user_1;
      let { status, body } = await request(app)
        .post("/register")
        .send({ username, password });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Email is required.");
    });

    test("should return status 400 when email is empty", async () => {
      let { username, password } = user_1;
      let { status, body } = await request(app)
        .post("/register")
        .send({ username, email: "", password });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Email is required.");
    });

    test("should return status 400 when password is empty", async () => {
      let { username, password, email } = user_1;
      let { status, body } = await request(app)
        .post("/register")
        .send({ username, password: "", email });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Password is required.");
    });

    test("should return status 400 when no password given", async () => {
      let { username, password, email } = user_1;
      let { status, body } = await request(app)
        .post("/register")
        .send({ username, email });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Password is required");
    });

    test("should return status 400 when email format is invalid", async () => {
      let { username, password } = user_1;
      let { status, body } = await request(app).post("/register").send({
        username,
        email: "email_test2",
        password,
      });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Invalid email format.");
    });

    test("should return status 400 when email not unique", async () => {
      let { status, body } = await request(app)
        .post("/register")
        .send({ ...pre_inserted_dummy_account_01, username: "baru" });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Email must be unique");
    });
  });
});

describe("POST /login", () => {
  describe("Success", () => {
    test("Should return status 200 and object of access_token", async () => {
      let { status, body } = await request(app)
        .post("/login")
        .send(pre_inserted_dummy_account_01);

      expect(status).toBe(200);
      expect(body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("Failed", () => {
    test("Should return status 401 and invalid credentials", async () => {
      let { status, body } = await request(app).post("/login").send(user_2);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid Email/Password");
    });

    test("should return status 400 when no email given", async () => {
      let { email, password } = user_2;
      let { status, body } = await request(app)
        .post("/login")
        .send({ password });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Email is required");
    });

    test("should return status 400 when no password given", async () => {
      let { email, password } = user_2;
      let { status, body } = await request(app).post("/login").send({ email });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Password is required.");
    });

    test("should return status 400 when password is empty", async () => {
      let { email, password } = user_2;
      let { status, body } = await request(app)
        .post("/login")
        .send({ email, password: "" });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Password is required.");
    });

    test("should return status 401 when password is incorrect", async () => {
      let { status, body } = await request(app)
        .post("/login")
        .send({ ...pre_inserted_dummy_account_01, password: "wrongpassword" });

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid Email/Password");
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
      username: "pre-InsertedDummy02",
      email: "pre-InsertedDummy02@mail.com",
      password: hashPassword("password"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  access_token_user_1 = signToken({ id: 1 });
  access_token_user_2 = signToken({ id: 2 });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});
