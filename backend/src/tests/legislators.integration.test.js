process.env.NODE_ENV = "test"; // Ensure test mode is activated

import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import express from "express";
import legislatorsRouter from "../routes/legislators.js"; // Adjust path if needed
import { loadData } from "../services/csvService.js";

// Create a new Express app instance
const app = express();
app.use(express.json());
app.use("/legislators", legislatorsRouter);

describe("GET /legislators (Integration Test with Real CSV Data)", () => {
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
    const response = await request(app).get("/legislators");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Object.keys(response.body).length).toBeGreaterThan(0); // Ensure some data is returned

    // Validate one legislator structure
    const firstLegislator = Object.values(response.body)[0];
    expect(firstLegislator).toHaveProperty("ID");
    expect(firstLegislator).toHaveProperty("Legislator");
    expect(firstLegislator).toHaveProperty("Supported bills");
    expect(firstLegislator).toHaveProperty("Opposed bills");
  });

  it("should return correct counts for a known legislator (if dataset is stable)", async () => {
    const response = await request(app).get("/legislators");

    expect(response.status).toBe(200);
    const legislators = response.body;

    // Legislator ID with known data
    const knownLegislatorId = 412211;
    if (legislators[knownLegislatorId]) {
      expect(legislators[knownLegislatorId]["Supported bills"]).equal(1);
      expect(legislators[knownLegislatorId]["Opposed bills"]).equal(1);
    }
  });
});
