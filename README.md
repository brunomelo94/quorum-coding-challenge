# Quorum Legislative Data Challenge

This project is a **full-stack web application** built with **React (Vite) for the frontend** and **Express.js for the backend**. The goal is to process and display legislative data from CSV files, answering key questions about bills and legislators.


## Entity relationships 

```mermaid
erDiagram
    LEGISLATORS {
        int id PK
        string name
    }
    
    BILLS {
        int id PK
        string title
        int primary_sponsor FK
    }

    VOTES {
        int id PK
        int bill_id FK
    }

    VOTE_RESULTS {
        int id PK
        int legislator_id FK
        int vote_id FK
        int vote_type
    }

    LEGISLATORS ||--o{ BILLS : "sponsors"
    BILLS ||--o{ VOTES : "has"
    VOTES ||--o{ VOTE_RESULTS : "records"
    LEGISLATORS ||--o{ VOTE_RESULTS : "casts"

```

## Sequence diagram

```mermaid
sequenceDiagram
    participant User
    participant WebApp
    participant Backend
    participant Database

    User->>WebApp: Request both summaries
    par Legislator Voting Summary
        WebApp->>Backend: Fetch legislator's votes
        Backend->>Database: Query legislator votes
        Database-->>Backend: Return voting results
        Backend-->>WebApp: Send legislator voting summary
    and Bill Voting Summary
        WebApp->>Backend: Fetch bill votes
        Backend->>Database: Query bill votes and sponsor
        Database-->>Backend: Return bill voting details
        Backend-->>WebApp: Send bill summary
    end
    WebApp-->>User: Display both summaries
```