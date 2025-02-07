# Write-Up for Quorum Legislative Data Challenge

## 1. Strategy & Implementation

**Overview:**  
I began by analyzing the provided CSV files to understand the relationships between legislators, bills, votes, and vote results. Using mermaid.js, I created visual diagrams to map out the entity relationships and the data flow between the frontend and backend. This analysis informed my initial architectural decisions. I started with the backend—designing API endpoints with Express.js to process CSV files via the `csv-parser` library. Two primary routes (`bills.js` and `legislators.js`) were implemented, both leveraging a shared `csvService.js` to load data into in-memory structures for fast lookups, alongside basic error handling and tests using Vitest. Once the backend was operational, I moved on to the frontend. Initially, I built the UI components without a UI library to focus on core functionality, then integrated Material-UI to enhance the user experience. During this phase, I refined the components, fixed a bug on the legislators endpoint, and ensured robust functionality through further testing.

**Backend:**  
- **Architecture:** Built with Node.js and Express, the backend processes CSV files using `csv-parser` and stores the data in in-memory structures for quick lookup.
- **Structure:** Created dedicated routes (`bills.js` and `legislators.js`) that rely on a shared `csvService.js` for loading data.
- **Testing & Error Handling:** Employed Vitest for unit testing and implemented basic error handling for API responses.

**Frontend:**  
- **Framework & UI:** Developed using React with Vite and Material-UI for a responsive, interactive interface.
- **Dynamic Components:** Implemented components (e.g., BillsTable and LegislatorsTable) that adapt to the data structure.
- **Integration:** Connected the frontend to the backend API endpoints and refined the UI based on testing and bug fixes.

**Tools & Assistance:**  
- **Frontend:** React, Vite, Material-UI  
- **Backend:** Node.js, Express  
- **Testing:** Vitest  
- **Other:** Utilized ChatGPT for debugging, test writing, and idea generation.

## 2. Accommodating Future Columns (e.g., "Bill Voted On Date", "Co-Sponsors")

The current design supports additional columns with minimal adjustments:
- **Backend:** Update the data dictionaries in `csvService.js` to include new fields.
- **Frontend:** The dynamic table components automatically handle and display any new columns added to the data.

## 3. Generating CSVs from Input Data

To support CSV generation rather than just consuming them:
- **Backend Adjustments:**
  - Create new endpoints (e.g., `POST /api/export`) to accept input data.
  - Use libraries like `csv-writer` to generate CSV files dynamically.
- **Frontend Enhancements:**
  - Add UI elements (e.g., forms, checkboxes, download buttons) for users to specify and export data.
  - Allow dynamic configuration of the columns included in the exported CSV.

## 4. Time Spent

Approximately 5–6 hours were dedicated to analyzing the data, designing the architecture, implementing both the backend and frontend, writing tests, and preparing documentation.
