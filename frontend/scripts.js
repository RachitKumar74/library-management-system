const API_URL = "http://localhost:3000/api/books";

const form = document.getElementById("addBookForm");
const searchInput = document.getElementById("search");
const tableBody = document.getElementById("booksTableBody");

async function fetchBooks(query = "") {
  const res = await fetch(`${API_URL}?q=${query}`);
  const books = await res.json();
  renderBooks(books);
}

function renderBooks(books) {
  tableBody.innerHTML = "";
  books.forEach((book, i) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year || ""}</td>
      <td><span class="status ${book.status}">${book.status}</span></td>
      <td>
        <button class="toggle-btn" onclick="toggleStatus(${book.id})">Toggle</button>
        <button class="delete-btn" onclick="deleteBook(${book.id})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

async function toggleStatus(id) {
  await fetch(`${API_URL}/${id}/toggle`, { method: "PATCH" });
  fetchBooks(searchInput.value);
}

async function deleteBook(id) {
  const confirmDelete = confirm("Are you sure you want to delete this book?");
  if (!confirmDelete) return;

  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchBooks(searchInput.value);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    year: document.getElementById("year").value
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  form.reset();
  fetchBooks();
});

searchInput.addEventListener("input", (e) => {
  fetchBooks(e.target.value);
});

fetchBooks();
