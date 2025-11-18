📚 Library Management System

A simple full-stack web application using HTML/CSS/JavaScript + Node.js + Express + MySQL

🚀 Project Overview

This project is a basic Library Management System that allows users to:

➕ Add new books

📄 View all books

🔍 Search books by title

🔁 Borrow/Return books (Toggle status)

❌ Delete books

🔗 REST API backend with Node.js

🗄 Uses MySQL database

Project is fully functional and can be shown as a DBMS + Web Technology mini project.

🛠 Tech Stack
Frontend

HTML

CSS

Vanilla JavaScript

Backend

Node.js

Express.js

Database

MySQL

📂 Project Structure
library-management/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── schema.sql
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── index.html
    ├── styles.css
    └── scripts.js
    🗄 Database Setup (MySQL)
    schema.sql
    MySQL Workbench:
    CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  year INT,
  status ENUM('available', 'borrowed') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Backend Setup (Node.js + Express)
cd backend
npm install

Configure .env

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=library_db

Start server
npm run dev

Server runs at:http://localhost:3000

🔗 API Endpoints (Express REST API)

Method	     Endpoint	                      Description
GET	        /api/books	                    Get all books / search
POST	      /api/books	                    Add new book
PATCH	    / api/books/:id/toggle	          Borrow/Return toggle
DELETE	  /api/books/:id	                  Delete book

Features:

Add book form

Search bar

Dynamic table

Toggle & Delete buttons

All communication with backend happens via fetch() API.
🎥 How It Works

User enters book details → book is stored in MySQL

Search bar filters books in real time

Toggle button switches status from available ↔ borrowed

Delete button removes book permanently

💡 Future Enhancements

User login system

Admin panel

Pagination

Sorting
Library Management System – DBMS Mini Project


