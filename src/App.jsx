import React, { useState } from "react";
import BookCard from "./components/BookCard";
import Modal from "./components/Modal";
import booksData from "../data/books.json";
import "./App.css";

function App() {
    const [books, setBooks] = useState(
    (booksData || []).map(b => ({ ...b, selected: false }))
  );

 const handleSelect = (clickedId) => {
   setBooks(prev => {
     const clicked = prev.find(b => b.isbn13 === clickedId);
     const willSelect = !(clicked?.selected);
     return prev.map(b =>
       b.isbn13 === clickedId ? { ...b, selected: willSelect } : { ...b, selected: false }
     );
   });
 };

 const handleDelete = () => {
   setBooks(prev => prev.filter(b => !b.selected));
 };
 const hasSelected = books.some(b => b.selected);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialNewBook = {
    title: "",
    author: "",
    publisher: "",
    year: "",
    language: "",
    pages: "",
  };
  const [newBook, setNewBook] = useState(initialNewBook);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      const bookToAdd = {
      isbn13: `user-${Date.now()}`,
      title: newBook.title.trim(),
      author: (newBook.author || "").trim(),
      publisher: (newBook.publisher || "").trim(),
      year: newBook.year ? Number(newBook.year) : "",
      language: (newBook.language || "").trim(),
      pages: newBook.pages ? Number(newBook.pages) : "",
      image: (newBook.image || "").trim(),
      selected: false,
    };

    setBooks((prev) => [bookToAdd, ...prev]);
    setNewBook(initialNewBook);
    closeModal();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Book Catalog</h1>
      </header>

      <main>
        <div className="main">

          <div className="new" onClick={openModal}>
            <BookCard />
            <button
              style={{
                backgroundColor: "#f4f4f4ff",
                marginTop: "15px",
                width: "100%",
                padding: "12px 0",
                color: "black",
                fontWeight: "700",
                fontSize: "1rem", 
                border: "none", 
                borderRadius: "4px", 
                cursor: "pointer",
              }}
              disabled={!hasSelected}
              onClick={(e) => {
                e.stopPropagation(); 
                if (hasSelected) handleDelete();
              }}
            >
              Delete
            </button>
            <button>Update button not working</button>

          </div>

          <div className="content">
            {books.map((book) => (
              <BookCard
                key={book.isbn13}
                isbn13={book.isbn13}
                title={book.title}
                subtitle={book.subtitle}
                price={book.price}
                image={book.image}
                url={book.url}
                selected={book.selected}
                onSelect={handleSelect}
              />
            ))}
          </div>
          
        </div>

      </main>

      <footer className="footer">&#169; Hajin Lee, 2025</footer>

      {isModalOpen && (
        <Modal
          newBook={newBook}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;