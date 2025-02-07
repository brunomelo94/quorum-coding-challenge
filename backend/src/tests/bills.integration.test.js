process.env.NODE_ENV = "test"; // Ensure test mode is activated

import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import express from "express";
import billsRouter from "../routes/bills.js"; // Adjust path if needed
import { loadData } from "../services/csvService.js";


// Create a new Express app instance
const app = express();
app.use(express.json());
app.use("/bills", billsRouter);

describe("GET /bills (Integration Test with Real CSV Data)", () => {
  let realData;

  beforeEach(async () => {
    // Load actual CSV data
    realData = await loadData({
      legislatorsFile: true,
      billsFile: true,
      votesFile: true,
      voteResultsFile: true,
    });
  });

  it("should correctly process real CSV data", async () => {
    const response = await request(app).get("/bills");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Object.keys(response.body).length).toBeGreaterThan(0); // Ensure some data is returned

    // Validate one bill structure
    const firstBill = Object.values(response.body)[0];
    expect(firstBill).toHaveProperty("ID");
    expect(firstBill).toHaveProperty("Bill");
    expect(firstBill).toHaveProperty("Supporters");
    expect(firstBill).toHaveProperty("Opposers");
    expect(firstBill).toHaveProperty("Primary Sponsor");
  });

  it("should return correct counts for a known bill (if dataset is stable)", async () => {
    const response = await request(app).get("/bills");

    expect(response.status).toBe(200);
    const bills = response.body;

    // Actual Bill ID dataset
    const knownBillId = 2900994;
    if (bills[knownBillId]) {
      expect(bills[knownBillId].Supporters).equals(13);
      expect(bills[knownBillId].Opposers).equals(6);
    }
  });
});
