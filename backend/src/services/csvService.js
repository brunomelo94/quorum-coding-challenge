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

export const loadData = async (params) => {
  try {
    const fileMapping = {
      legislatorsFile: { key: 'legislators', path: LEGISLATORS_FILE },
      billsFile: { key: 'bills', path: BILLS_FILE },
      votesFile: { key: 'votes', path: VOTES_FILE },
      voteResultsFile: { key: 'voteResults', path: VOTE_RESULTS_FILE },
    };

    // Filter out only those keys enabled in params and map them to promises
    const loadPromises = Object.keys(fileMapping)
      .filter((paramKey) => params[paramKey])
      .map((paramKey) => {
        const { key, path } = fileMapping[paramKey];
        return loadCSV(path).then((data) => ({ key, data }));
      });

    // Await all the promises concurrently
    const loadedFiles = await Promise.all(loadPromises);

    // Build the result object from the loaded files
    const result = loadedFiles.reduce((acc, { key, data }) => {
      acc[key] = data;
      return acc;
    }, {});

    return result;
  } catch (error) {
    console.error("Error loading data:", error);
    return {};
  }
};

