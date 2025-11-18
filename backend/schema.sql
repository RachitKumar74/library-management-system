-- Create database
CREATE DATABASE IF NOT EXISTS library_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE library_db;

-- Books table
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  year INT,
  status ENUM('available', 'borrowed') NOT NULL DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO books (title, author, year, status) VALUES
('Clean Code', 'Robert C. Martin', 2008, 'available'),
('You Don’t Know JS', 'Kyle Simpson', 2015, 'borrowed'),
('The Pragmatic Programmer', 'Andrew Hunt & David Thomas', 1999, 'available');
