import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../services/csvService.js", () => ({
  loadData: vi.fn(),
}));

import request from "supertest";
import express from "express";
import billsRouter from "../routes/bills.js";
import * as csvService from "../services/csvService.js";

const app = express();
app.use(express.json());
app.use("/bills", billsRouter);

describe("GET /bills", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a list of bills with supporters, opposers, and primary sponsors", async () => {
    csvService.loadData.mockResolvedValue({
      bills: {
        1: { id: 1, title: "Bill A", sponsor_id: 101 },
        2: { id: 2, title: "Bill B", sponsor_id: 102 },
      },
      voteResults: {
        1: { vote_id: 201, legislator_id: 301, vote_type: "1" },
        2: { vote_id: 202, legislator_id: 302, vote_type: "2" },
      },
      votes: {
        201: { bill_id: 1 },
        202: { bill_id: 2 },
      },
      legislators: {
        101: { name: "Senator A" },
        102: { name: "Senator B" },
      },
    });

    const response = await request(app).get("/bills");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      1: {
        ID: 1,
        Bill: "Bill A",
        Supporters: 1,
        Opposers: 0,
        "Primary Sponsor": "Senator A",
      },
      2: {
        ID: 2,
        Bill: "Bill B",
        Supporters: 0,
        Opposers: 1,
        "Primary Sponsor": "Senator B",
      },
    });
  });

  it("should return 500 if loadData returns incomplete data", async () => {
    csvService.loadData.mockResolvedValue({
      bills: null,
      voteResults: {},
      votes: {},
      legislators: {},
    });

    const response = await request(app).get("/bills");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Incomplete data loaded." });
  });

  it("should return 500 if an internal error occurs", async () => {
    csvService.loadData.mockRejectedValue(new Error("Unexpected error"));

    const response = await request(app).get("/bills");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error." });
  });
});
