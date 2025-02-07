import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

const DATA_DIR = path.resolve("./src/data");
const BILLS_FILE = path.join(DATA_DIR, "bills.csv");
const LEGISLATORS_FILE = path.join(DATA_DIR, "legislators.csv");
const VOTES_FILE = path.join(DATA_DIR, "votes.csv");
const VOTE_RESULTS_FILE = path.join(DATA_DIR, "vote_results.csv");

// Utility function to load CSV data
const loadCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = {};
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results[data.id] = data)
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};

// Load data from CSV files based on params
export const loadData = async (params) => {
  try {
    const result = {};
    if(params.legislatorsFile) {
        result.legislators = await loadCSV(LEGISLATORS_FILE);
    }
    if(params.billsFile) {
        result.bills = await loadCSV(BILLS_FILE);
    }
    if(params.votesFile) {
        result.votes = await loadCSV(VOTES_FILE);
    }
    if(params.voteResultsFile) {
        result.voteResults = await loadCSV(VOTE_RESULTS_FILE);
    }
    return result;
  } catch (error) {
    console.error("Error loading data:", error);
    return {};
  }
};
