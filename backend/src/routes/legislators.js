import express from "express";
import { loadData } from "../services/csvService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Fetch/load data
    const data = await loadData({
      legislatorsFile: true,
      voteResultsFile: true
    });

    const { voteResults, legislators } = data;

    // Validate that all required data is loaded
    if (!voteResults || !legislators) {
      return res.status(500).json({ error: "Incomplete data loaded." });
    }

    // Reduce voteResults to a summary of legislators and their supported/opposed bills
    const results = Object.keys(voteResults).reduce((acc, key) => {
      const voteResult = voteResults[key];
      const legislator = voteResult.legislator_id ? legislators[voteResult.legislator_id] : null;

      if (legislator) {
        // Initialize legislator object if it doesn't exist
        if (!acc[legislator.id]) {
          acc[legislator.id] = {
            ID: legislator.id,
            Legislator: legislator.name,
            "Supported bills": 0,
            "Opposed bills": 0
          };
        }

        // Sum supported or opposed bills based on vote type
        const voteType = Number(voteResult.vote_type);
        if (voteType === 1) {
          acc[legislator.id]["Supported bills"] += 1;
        } else if (voteType === 2) {
          acc[legislator.id]["Opposed bills"] += 1;
        }
      }
      
      return acc;
    }, {});

    res.json(results);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


export default router;
