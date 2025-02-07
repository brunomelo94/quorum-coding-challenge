import express from "express";
import { loadData } from "../services/csvService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // Fetch/load data
  const { bills, voteResults, votes, legislators } = await loadData({legislatorsFile: true, billsFile: true, votesFile: true, voteResultsFile: true});

  // Reduce voteResults to a summary of bills
  const results = Object.keys(voteResults).reduce((acc, key) => {
    let voteResult = voteResults[key];
    let vote = voteResult?.vote_id ? votes[voteResult.vote_id] : null;
    let bill = vote?.bill_id ? bills[vote.bill_id] : null;
    let legislator = bill?.sponsor_id ? legislators[bill.sponsor_id] : null;

    // Initialize bill object
    if(bill && !acc[bill.id]) {
      acc[bill.id] = acc[bill.id] ||
        {
          ID: bill.id,
          Bill: bill.title,
          Supporters: 0,
          Opposers: 0,
          "Primary Sponsor": legislator?.name || "Not provided"
        };
    }
    
    // Sum yay or nay!
    let voteType = Number(voteResult.vote_type);
    if(voteType === 1) {
      acc[bill.id].Supporters += 1;
    } else if(voteType === 2) {
      acc[bill.id].Opposers += 1;
    }

    return acc;
  }, {})

  res.json(results);
  console.log(results);
});


export default router;
