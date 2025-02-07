import express from "express";
import { loadData } from "../services/csvService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Fetch/load data
    const { bills, voteResults, votes, legislators } = await loadData({
      legislatorsFile: true,
      billsFile: true,
      votesFile: true,
      voteResultsFile: true
    });

    // Optional: Validate that all necessary data is present
    if (!bills || !voteResults || !votes || !legislators) {
      return res.status(500).json({ error: "Incomplete data loaded." });
    }

    // Reduce voteResults to a summary of bills
    const results = Object.keys(voteResults).reduce((acc, key) => {
      const voteResult = voteResults[key];
      const vote = voteResult?.vote_id ? votes[voteResult.vote_id] : null;
      const bill = vote?.bill_id ? bills[vote.bill_id] : null;
      const legislator = bill?.sponsor_id ? legislators[bill.sponsor_id] : null;

      if (bill) {
        // Initialize bill object if it doesn't exist
        if (!acc[bill.id]) {
          acc[bill.id] = {
            ID: bill.id,
            Bill: bill.title,
            Supporters: 0,
            Opposers: 0,
            "Primary Sponsor": legislator?.name || "Not provided"
          };
        }

        // Sum yay or nay vote based on vote_type
        const voteType = Number(voteResult.vote_type);
        if (voteType === 1) {
          acc[bill.id].Supporters += 1;
        } else if (voteType === 2) {
          acc[bill.id].Opposers += 1;
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
