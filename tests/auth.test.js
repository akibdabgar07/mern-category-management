const request = require("supertest");
const app = require("../src/App");

describe("Authentication API", () => {
  it("register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      user_name: "testuser",
      email: "user123@example.com",
      password: "Testing@12345",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });
});
