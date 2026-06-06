# 💳 Backend Ledger

> A production-inspired Banking Transaction System built with Node.js, Express.js, MongoDB, and JWT Authentication.

Backend Ledger simulates real-world banking workflows including account creation, secure authentication, account-to-account fund transfers, immutable ledger recording, transaction auditing, and email notifications.

Unlike traditional CRUD banking projects, Backend Ledger implements **ledger-based accounting**, **idempotent transactions**, **MongoDB ACID transactions**, and **JWT token revocation**, concepts commonly used in fintech and banking systems.

---

# 🚀 What Makes This Different?

Most student banking projects simply store account balances and update them directly.

Backend Ledger follows a ledger-based architecture where:

* Balances are derived from ledger entries
* Financial records are immutable
* Transactions are ACID-compliant
* Duplicate transfers are prevented
* Audit trails are preserved
* JWT tokens can be revoked securely

---

# 🏗️ System Architecture

```text
User
 │
 ▼
Authentication Layer
 │
 ▼
Account Service
 │
 ▼
Transaction Engine
 │
 ▼
Ledger System
 │
 ▼
MongoDB
```

### Architecture Patterns

* MVC Architecture
* RESTful APIs
* Service Layer Pattern
* Middleware-Based Security
* Ledger-Based Accounting

---

# ✨ Features

## 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure Logout
* Token Blacklisting
* Password Hashing using bcrypt

## 🏦 Account Management

* Create Bank Accounts
* View User Accounts
* Dynamic Balance Calculation
* Multiple Account Support

## 💸 Transaction Engine

* Account-to-Account Transfers
* Initial Fund Injection System
* Idempotency Protection
* Transaction Status Tracking
* MongoDB Session Transactions

## 📒 Ledger System

* Immutable Ledger Records
* Audit-Friendly Design
* Financial History Tracking
* Balance Derived From Ledger Entries

## 📧 Notifications

* Registration Emails
* Transaction Emails

---

# 🔄 Transaction Workflow

The transaction engine follows a 10-step workflow designed to maintain financial consistency and prevent duplicate transfers.

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

### Guarantees

✔ Duplicate Transaction Prevention

✔ Immutable Financial Records

✔ Atomic Money Transfers

✔ Ledger-Based Balance Tracking

✔ Audit Trail Preservation

---

# ⚡ ACID Transaction Support

MongoDB Sessions are used to ensure that all financial operations execute atomically.

```text
SUCCESS
 ├── Create Transaction
 ├── Debit Ledger
 ├── Credit Ledger
 └── Commit

FAILURE
 └── Rollback Everything
```

If any operation fails, the entire transaction is rolled back automatically.

---

# 🔑 Idempotency Protection

Every transaction requires a unique `idempotencyKey`.

This prevents duplicate financial operations caused by:

* Network Retries
* Client Timeouts
* Duplicate Requests

A common pattern used in payment gateways and fintech systems.

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |
| POST   | `/api/auth/logout`   |

## Accounts

| Method | Endpoint                           |
| ------ | ---------------------------------- |
| POST   | `/api/accounts/`                   |
| GET    | `/api/accounts/`                   |
| GET    | `/api/accounts/balance/:accountId` |

## Transactions

| Method | Endpoint                                 |
| ------ | ---------------------------------------- |
| POST   | `/api/transactions/`                     |
| POST   | `/api/transactions/system/initial-funds` |

---

# 🗄️ Database Design

## User

Stores:

* Name
* Email
* Hashed Password
* System User Flag

## Account

Stores:

* Account Owner
* Currency
* Account Status

### Account Status

```text
Active
Frozen
Closed
```

---

## Transaction

Stores:

* Sender Account
* Receiver Account
* Amount
* Status
* Idempotency Key

### Transaction States

```text
Pending
Completed
Failed
Reversed
```

---

## Ledger

Stores immutable financial records.

### Ledger Types

```text
Credit
Debit
```

Balance is calculated as:

```text
Total Credits - Total Debits
```

---

## Token Blacklist

Stores invalidated JWT tokens.

Used to implement secure logout.

Tokens automatically expire after 3 days using MongoDB TTL indexes.

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing (bcrypt)
* Route Protection
* Token Revocation
* Input Validation
* Environment Variables
* Immutable Ledger Records
* Transaction Integrity Checks

---

# 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* bcrypt

### Services

* Nodemailer

### Environment Management

* dotenv

---

# ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/backend-ledger.git
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email

EMAIL_PASS=your_email_password
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

---

# 📈 Future Improvements

* Role-Based Access Control (RBAC)
* Two-Factor Authentication (2FA)
* Redis Caching
* Docker Deployment
* Kubernetes
* Swagger API Documentation
* Fraud Detection Engine
* Real-Time Notifications

---

# 👨‍💻 Author

### Debarpan Deb

Computer Science & Engineering Student

Aspiring Backend & Full Stack Developer

**GitHub:** https://github.com/YOUR_USERNAME

**LinkedIn:** https://linkedin.com/in/YOUR_LINKEDIN

---

⭐ If you found this project interesting, consider giving it a star.
