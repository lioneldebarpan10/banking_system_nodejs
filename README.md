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

---

## 🔄 Banking Workflow

```text
User Registration
        │
        ▼
User Login
        │
        ▼
JWT Token Generation
        │
        ▼
Access Protected APIs
        │
        ▼
Create Bank Account
        │
        ▼
Deposit / Withdraw / Transfer
        │
        ▼
Transaction Recording
        │
        ▼
Ledger Update
        │
        ▼
Email Notification
```

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

---

## 🗄️ Database Models

### User Model

Stores:

* User Information
* Authentication Data
* Account References

### Account Model

Stores:

* Account Number
* Current Balance
* Account Owner

### Transaction Model

Stores:

* Transaction Type
* Amount
* Sender
* Receiver
* Timestamp

### Ledger Model

Stores:

* Financial Records
* Transaction Logs
* Historical Tracking

### Blacklist Model

Stores:

* Invalidated JWT Tokens

---

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
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

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
