import request from "supertest";
import app from "../server";
import { connectDb } from "../config/db.mjs";
import { ObjectId } from "mongodb";

// Connect to the database before running all tests
beforeAll(async () => {
  await connectDb();
});

describe("test authentication and get the token", () => {
  test("should return a token when user logs in", async () => {
    // Attempt to log in with valid credentials and check if the response includes a token and userId
    await request(app)
      .post("/api/auth/login")
      .send({
        email: "authtest@example.com",
        password: "test123456",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("userId");
      });
  });
});

describe("test profile and get the userProfile", () => {
  test("should create a user profile", async () => {
    // Log in the user to get a token
    const user = await request(app).post("/api/auth/login").send({
      email: "authtest@example.com",
      password: "test123456",
    });

    // Create a new user profile with provided details
    const profile = {
      firstName: "test",
      lastName: "user",
      phone: "1234567890",
      addr1: "xyz",
      addr2: "xyz2",
      city: "xyz",
      _state: "xyz",
      zipcode: "0000",
      email: "authtest@example.com",
      updated: true,
      userId: user.body.userId,
    };

    // Make a POST request to create a user profile and verify the response
    await request(app)
      .post("/api/auth/profile")
      .set("Authorization", `Bearer ${user.body.token}`)
      .send(profile)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toHaveProperty("message");
      });
  });

  test("should get a user profile", async () => {
    // Log in to get a token
    const user = await request(app).post("/api/auth/login").send({
      email: "authtest@example.com",
      password: "test123456",
    });

    // Make a GET request to fetch the user's profile and verify the response contains all expected properties
    await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${user.body.token}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toHaveProperty("firstName");
        expect(response.body).toHaveProperty("lastName");
        expect(response.body).toHaveProperty("city");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("addr1");
        expect(response.body).toHaveProperty("phone");
      });
  });
});

describe("test appointments and get the appointments and create a new appointment", () => {
  test("should create an appointment", async () => {
    // Log in to get a token
    const user = await request(app).post("/api/auth/login").send({
      email: "authtest@example.com",
      password: "test123456",
    });

    // Define a new appointment object
    const appointment = {
      userId: user.body.userId,
      date: "2024-10-23",
      time: "04:30:00",
      department: "orthopedics",
      doctor: {
        name: "Dr. Emily Johnson",
        rating: 4.7,
      },
      name: "daneyal",
      img: null,
      comments: "zsxcszcdszc dszc dszc zdsc dsc",
    };

    // Make a POST request to create an appointment and verify the response
    await request(app)
      .post("/api/appointments/book")
      .set("Authorization", `Bearer ${user.body.token}`)
      .send(appointment)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toHaveProperty("message");
      });
  });

  test("should get all appointments", async () => {
    // Log in to get a token
    const user = await request(app).post("/api/auth/login").send({
      email: "authtest@example.com",
      password: "test123456",
    });

    // Make a GET request to fetch all appointments for the user and verify the response contains the expected properties for an appointment
    await request(app)
      .get("/api/appointments/myappointments")
      .set("Authorization", `Bearer ${user.body.token}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        const obj = response.body[0]; // Assuming the response is an array of appointments
        expect(obj).toHaveProperty("date");
        expect(obj).toHaveProperty("time");
        expect(obj).toHaveProperty("img");
        expect(obj).toHaveProperty("department");
        expect(obj).toHaveProperty("doctor");
        expect(obj).toHaveProperty("name");
        expect(obj).toHaveProperty("comments");
      });
  });
});
