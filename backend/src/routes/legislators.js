import express from "express";
import { loadData } from "../services/csvService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // Fetch/load data
  console.log(await loadData())
  const { bills, voteResults, votes, legislators } = await loadData({legislatorsFile: true, billsFile: true, votesFile: true, voteResultsFile: true});

  // Reduce voteResults to a summary of legislators and their supported/opposed bills
  const results = Object.keys(voteResults).reduce((acc, key) => {
    let voteResult = voteResults[key];
    let vote = voteResult?.vote_id ? votes[voteResult.vote_id] : null;
    let bill = vote?.bill_id ? bills[vote.bill_id] : null;
    let legislator = bill?.sponsor_id ? legislators[bill.sponsor_id] : null;

    // Initialize legislator object
    if(legislator) {
      if(!acc[legislator.id]) {
        acc[legislator.id] = acc[legislator.id] ||
          {
            ID: legislator.id,
            Legislator: legislator.name,
            "Supported bills": 0,
            "Opposed bills": 0
          };
      }

      // Sum supported or opposed bill
        let voteType = Number(voteResult.vote_type);
        if(voteType === 1) {
          acc[legislator.id]["Supported bills"] += 1;
        } else if(voteType === 2) {
          acc[legislator.id]["Opposed bills"] += 1;
        }
    }
    
    return acc;
  }, {})

  res.json(results);
  console.log(results);
});

export default router;
