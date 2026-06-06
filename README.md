# 💳 Backend Ledger - Banking Transaction System

A production-inspired **Banking Transaction System** built with **Node.js, Express.js, MongoDB, and JWT Authentication**. The project simulates real-world banking operations such as account management, secure authentication, transaction processing, ledger maintenance, and transaction auditing while following industry-standard backend architecture practices.

---

## 🚀 Project Overview

Backend Ledger is designed to demonstrate how modern financial systems manage user accounts, transactions, and ledger records securely.

The application provides:

* Secure User Authentication
* Account Management
* Deposit & Withdrawal Operations
* Transaction Recording
* Ledger Tracking
* Email Notifications
* JWT-Based Authorization
* Token Blacklisting for Secure Logout

The project follows a modular MVC architecture, making it scalable, maintainable, and easy to extend with advanced banking features.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* User Registration
* Secure Login System
* JWT Authentication
* Protected Routes
* Secure Logout using Token Blacklisting
* Password Hashing with bcrypt

### 👤 Account Management

* Create Bank Accounts
* View Account Information
* Balance Tracking
* User Account Association

### 💸 Transaction Management

* Deposit Funds
* Withdraw Funds
* Transfer Funds
* Transaction History
* Transaction Validation
* Real-Time Balance Updates

### 📒 Ledger System

* Complete Financial Record Tracking
* Audit-Friendly Transaction Storage
* Persistent Ledger Entries
* Transaction Monitoring

### 📧 Email Integration

* Transaction Notifications
* Account Activity Alerts
* Automated Email Services

---

## 🏗️ System Architecture

```text
Client
   │
   ▼
Express Routes
   │
   ▼
Controllers
   │
   ▼
Business Logic
   │
   ▼
MongoDB Database
```

### Architecture Pattern

* MVC Architecture
* RESTful API Design
* Modular Code Structure
* Service Layer Integration
* Middleware-Based Security

---

## 📂 Project Structure

```bash
BACKEND_LEDGER/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── account.controller.js
│   │   ├── auth.controller.js
│   │   └── transaction.controller.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   ├── account.model.js
│   │   ├── blacklist.model.js
│   │   ├── ledger.model.js
│   │   ├── transaction.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── account.routes.js
│   │   ├── auth.routes.js
│   │   └── transaction.routes.js
│   │
│   ├── services/
│   │   └── email.service.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcrypt

### Services

* Nodemailer

### Environment Management

* dotenv

## 🔄 Transaction Processing Engine

The transaction engine follows a production-inspired 10-step workflow designed to ensure consistency, auditability, and duplicate-request protection.

### Transfer Workflow

```text
1. Validate Request
        │
2. Validate Idempotency Key
        │
3. Verify Account Status
        │
4. Calculate Sender Balance
        │
5. Create Pending Transaction
        │
6. Create Debit Ledger Entry
        │
7. Create Credit Ledger Entry
        │
8. Mark Transaction Completed
        │
9. Commit MongoDB Transaction
        │
10. Send Email Notification
```

### Financial Guarantees

* Duplicate transaction prevention using Idempotency Keys.
* Account balance derived from ledger entries.
* Atomic transaction execution using MongoDB Sessions.
* Transaction history remains immutable.
* Ledger integrity maintained even under concurrent requests.

---

## ⚡ ACID Transaction Support

The system uses MongoDB Sessions and Transactions to ensure all banking operations execute atomically.

### Example

If any of the following operations fail:

* Transaction Creation
* Debit Ledger Entry
* Credit Ledger Entry
* Status Update

the entire operation is rolled back automatically.

```text
SUCCESS
 ├── Create Transaction
 ├── Debit Ledger
 ├── Credit Ledger
 └── Commit

FAILURE
 └── Rollback Everything
```

This prevents partial fund transfers and maintains data consistency.

---

## 🔑 Idempotency Protection

Every transaction requires a unique idempotency key.

### Why?

Network retries can accidentally send the same request multiple times.

Without protection:

```text
Transfer ₹1000
Retry Request
Transfer ₹1000 Again
```

Total Money Sent = ₹2000 ❌

With Idempotency:

```text
Transfer ₹1000
Retry Request
Already Processed
```

Total Money Sent = ₹1000 ✅

This pattern is widely used in payment gateways such as Stripe and Razorpay.

---

## 🔐 Authentication Workflow

### Registration Flow

```text
User Registration
        │
Create User
        │
Hash Password (bcrypt)
        │
Generate JWT
        │
Send Welcome Email
        │
Return Authentication Token
```

### Login Flow

```text
User Login
        │
Fetch User
        │
Verify Password
        │
Generate JWT
        │
Return Token
```

### Logout Flow

```text
User Logout
        │
Store Token In Blacklist
        │
Clear Cookie
        │
Reject Future Requests
```

---

## 🚫 Token Revocation System

JWTs are stateless by nature.

To implement secure logout, the project introduces a Token Blacklist Collection.

### Process

```text
User Logout
       │
Store JWT
       │
Blacklist Collection
       │
Authentication Middleware
       │
Access Denied
```

### Additional Optimization

Blacklisted tokens automatically expire after 3 days using MongoDB TTL indexes.

This prevents unnecessary database growth.

---

## 📧 Event-Driven Email Notifications

The system sends email notifications after critical actions.

### Supported Events

* User Registration
* Successful Fund Transfer

### Benefits

* Improved user experience
* Transaction visibility
* Banking-style notifications

---

## 🏦 Initial Fund Injection System

A dedicated system-user account is responsible for injecting initial funds.

### Why?

In real banking systems, money is not generated by regular users.

Special internal accounts perform controlled fund creation.

### Workflow

```text
System User
      │
Create Transaction
      │
Generate Ledger Entries
      │
Credit Customer Account
      │
Mark Transaction Complete
```

Only privileged system users can access this route.

---

## 📊 System Design Principles

The project follows several concepts commonly used in financial technology systems:

### Ledger-Based Accounting

Balances are computed from historical records instead of stored values.

### Immutable Audit Trail

Financial history cannot be modified after creation.

### Atomic Transactions

Money transfer operations either complete fully or not at all.

### Idempotent Requests

Duplicate transaction processing is prevented.

### Secure Authentication

JWT-based authentication with token revocation support.

### Separation of Concerns

Controllers, Models, Routes, Services, and Middleware are organized independently for maintainability.

---

## 💼 Backend Engineering Concepts Demonstrated

This project showcases practical implementation of:

* RESTful API Design
* MVC Architecture
* JWT Authentication
* Token Revocation
* MongoDB Aggregation
* MongoDB Transactions
* ACID Principles
* Ledger Accounting
* Idempotent APIs
* Email Service Integration
* Middleware-Based Authorization
* Financial Data Integrity
* Audit Logging
* Scalable Backend Architecture


## 📡 API Endpoints

### 🔐 Authentication Routes

| Method | Endpoint | Description |
|----------|------------|------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user and generate JWT |
| POST | `/api/auth/logout` | Logout user and blacklist token |

---

### 👤 Account Routes

| Method | Endpoint | Description |
|----------|------------|------------|
| POST | `/api/accounts/` | Create a new account |
| GET | `/api/accounts/` | Get all accounts of logged-in user |
| GET | `/api/accounts/balance/:accountId` | Get account balance |

> All Account Routes require JWT Authentication.

---

### 💸 Transaction Routes

| Method | Endpoint | Description |
|----------|------------|------------|
| POST | `/api/transactions/` | Create a transaction |
| POST | `/api/transactions/system/initial-funds` | Create initial funds for system account |

> Transaction creation requires authenticated users.

> Initial Fund creation is restricted to system users through dedicated authorization middleware.


## 🎯 Core Banking Functionalities

### Account Creation

Users can create multiple accounts that are linked to their profile.

### Fund Transfer

Supports secure money transfers between accounts while maintaining transaction integrity.

### Balance Tracking

Every transaction automatically updates account balances.

### Ledger Recording

All financial operations are stored in a dedicated ledger for auditability and tracking.

### Initial Funding System

A privileged system route allows creation of initial funds, simulating how real banking systems inject funds into accounts.


## 🔒 Security Features

### Authentication Security

* JWT Authentication
* Route Protection
* Authorization Middleware
* Secure Logout

### Data Security

* Password Hashing using bcrypt
* Environment Variables
* Input Validation
* Protected Sensitive Data

### Session Security

* Token Blacklisting
* Invalid Token Prevention
* Authentication Middleware

## 🗄️ Database Design & Data Models

The system follows a **Ledger-Based Accounting Architecture**, where account balances are not stored directly in the database. Instead, balances are computed from immutable ledger entries, ensuring auditability, consistency, and financial integrity.

---

## 👤 User Model

Represents authenticated users of the banking system.

### Fields

| Field      | Type    | Description                        |
| ---------- | ------- | ---------------------------------- |
| name       | String  | User's full name                   |
| email      | String  | Unique email address               |
| password   | String  | Securely hashed password           |
| systemUser | Boolean | Internal privileged system account |

### Security Features

* Passwords are hashed using bcrypt before storage.
* Password field is hidden by default.
* Email uniqueness enforced.
* Regex-based email validation.
* Internal system users cannot be modified after creation.

### Purpose

Acts as the primary identity layer for authentication and authorization.

---

## 🏦 Account Model

Represents a bank account owned by a user.

### Fields

| Field    | Type     | Description              |
| -------- | -------- | ------------------------ |
| user     | ObjectId | Account owner            |
| status   | String   | Active / Frozen / Closed |
| currency | String   | Account currency         |

### Indexes

```js
{ user: 1, status: 1 }
```

### Special Capability

The account does not store balance directly.

Instead, balance is calculated dynamically from ledger entries using MongoDB Aggregation Pipelines.

### Balance Calculation

```text
Balance =
Total Credits
-
Total Debits
```

This approach prevents accidental balance corruption and mirrors real-world banking systems.

---

## 💸 Transaction Model

Represents a transfer of funds between two accounts.

### Fields

| Field          | Type     | Description                             |
| -------------- | -------- | --------------------------------------- |
| fromAccount    | ObjectId | Sender account                          |
| toAccount      | ObjectId | Receiver account                        |
| amount         | Number   | Transfer amount                         |
| status         | String   | Pending / Completed / Failed / Reversed |
| idempotencyKey | String   | Prevents duplicate transactions         |

### Transaction Lifecycle

```text
Pending
   │
   ├──► Completed
   │
   ├──► Failed
   │
   └──► Reversed
```

### Production Feature: Idempotency

Every transaction requires a unique idempotency key.

This guarantees that repeated API requests cannot accidentally process the same financial transaction multiple times.

A common requirement in payment gateways and fintech systems.

---

## 📒 Ledger Model

The most important component of the system.

Stores immutable accounting records for every financial operation.

### Fields

| Field       | Type     | Description            |
| ----------- | -------- | ---------------------- |
| account     | ObjectId | Related account        |
| transaction | ObjectId | Associated transaction |
| amount      | Number   | Transaction amount     |
| type        | String   | Credit / Debit         |

### Immutable Ledger Architecture

Ledger entries cannot be:

* Updated
* Deleted
* Replaced
* Modified

Any attempt triggers an exception.

```text
Credit Entry
     +
Debit Entry
     =
Account Balance
```

### Why This Matters

Real banking systems never modify historical financial records.

Instead of editing transactions, new entries are created to maintain a complete audit trail.

This project follows the same principle.

### Audit Benefits

* Complete transaction history
* Regulatory-friendly design
* Tamper-resistant records
* Financial traceability

---

## 🚫 Token Blacklist Model

Used for secure logout functionality.

### Fields

| Field | Type   | Description           |
| ----- | ------ | --------------------- |
| token | String | Invalidated JWT Token |

### Security Enhancement

When users logout:

1. JWT token is stored in blacklist.
2. Future requests using that token are rejected.
3. Blacklisted tokens automatically expire after 3 days.

### TTL Index

```js
expireAfterSeconds: 259200
```

This prevents database growth while maintaining logout security.

---

## 🔗 Entity Relationships

```text
User
 │
 └───< Account
          │
          │
          ├──< Transaction >──┐
          │                   │
          │                   │
          └──< Ledger >────────┘
```

### Relationship Overview

* One User can own multiple Accounts.
* One Transaction connects two Accounts.
* One Transaction generates Ledger Entries.
* Ledger Entries determine Account Balance.
* JWT Tokens are managed separately through the Blacklist collection.

---

## 🎯 Financial Integrity Principles Implemented

### Double-Entry Inspired Accounting

Every transfer creates ledger records that preserve financial consistency.

### Immutable Audit Trail

Historical records can never be altered.

### Dynamic Balance Calculation

Balances are derived from ledger entries rather than stored values.

### Idempotent Transactions

Duplicate requests cannot create duplicate transfers.

### Secure Authentication

JWT Authentication with token revocation support.

These principles closely resemble practices used in modern fintech, payment gateway, and banking backend systems.


## ⚙️ Installation Guide

### Clone Repository

```bash
git clone https://github.com/your-username/backend-ledger.git
```

### Navigate to Project

```bash
cd backend-ledger
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

REFRESH_TOKEN=your_refresh_token

CLIENT_ID=your_client_id

CLIENT_SECRET=your_client_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password
```

### Start Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

---

## 📈 Future Enhancements

* Role-Based Access Control (RBAC)
* Two-Factor Authentication (2FA)
* Redis Caching
* Docker Containerization
* Kubernetes Deployment
* Microservices Architecture
* Fraud Detection Module
* Rate Limiting
* Admin Dashboard
* Real-Time Notifications
* API Documentation using Swagger

---

## 🎯 Learning Outcomes

Through this project, I gained hands-on experience in:

* Backend Development
* REST API Design
* MongoDB Data Modeling
* Authentication & Authorization
* Financial Transaction Systems
* Ledger Management
* Middleware Development
* Email Service Integration
* Scalable Project Architecture
* Secure Coding Practices

---

## 📊 Project Highlights

✔ Production-Oriented Backend Architecture

✔ Banking Transaction Simulation

✔ JWT Authentication & Secure Logout

✔ Ledger-Based Transaction Tracking

✔ Email Notification Service

✔ MongoDB Data Modeling

✔ Clean MVC Structure

✔ Scalable and Maintainable Codebase

---

## 👨‍💻 Author

### Debarpan Deb

Computer Science & Engineering Student

Aspiring Full Stack Developer | Backend Developer

### Connect With Me

* GitHub: https://github.com/YOUR_USERNAME
* LinkedIn: https://linkedin.com/in/YOUR_LINKEDIN

---

## ⭐ Support

If you found this project useful or interesting, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates further development.
