const request = require("supertest");
const app = require("../src/App");

describe("Category API Tests", () => {
  let token;
  let categoryId;

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/register").send({
      user_name: "testuser",
      email: "user123@example.com",
      password: "Testing@12345",
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "user123@example.com",
      password: "Testing@12345",
    });

    token = loginRes.body.access_token;
  });

  test("Create a Category", async () => {
    const res = await request(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Electronics" });

    expect(res.status).toBe(201);
    expect(res.body.category.name).toBe("Electronics");
    categoryId = res.body.category._id;
  });
});
