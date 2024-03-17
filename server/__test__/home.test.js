const app = require("../app");
const request = require("supertest");

describe("GET /", () => {
  describe("Success", () => {
    test("Should return 200 and a message", async () => {
      let { status, body } = await request(app).get("/");

      expect(status).toBe(200);
      expect(body).toHaveProperty("message", "Welcome to KoneksiON API");
    });
  });
});
