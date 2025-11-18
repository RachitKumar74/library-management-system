// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Helper to map DB rows
const mapBook = (row) => ({
  id: row.id,
  title: row.title,
  author: row.author,
  year: row.year,
  status: row.status,
});

// Get all books (optional search)
app.get('/api/books', async (req, res) => {
  const q = (req.query.q || '').trim();
  try {
    const [rows] = q
      ? await pool.query('SELECT * FROM books WHERE title LIKE ?', [`%${q}%`])
      : await pool.query('SELECT * FROM books ORDER BY created_at DESC');

    res.json(rows.map(mapBook));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new book
app.post('/api/books', async (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Missing fields' });

  try {
    const [result] = await pool.query(
      'INSERT INTO books (title, author, year, status) VALUES (?, ?, ?, "available")',
      [title, author, year || null]
    );
    res.status(201).json({ id: result.insertId, title, author, year, status: 'available' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Toggle borrow/return
app.patch('/api/books/:id/toggle', async (req, res) => {
  const { id } = req.params;
  try {
    const [[book]] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const newStatus = book.status === 'available' ? 'borrowed' : 'available';
    await pool.query('UPDATE books SET status = ? WHERE id = ?', [newStatus, id]);

    res.json({ ...book, status: newStatus });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM books WHERE id = ?', [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Book not found' });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
