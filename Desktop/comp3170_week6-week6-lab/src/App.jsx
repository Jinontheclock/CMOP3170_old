import React, { useState } from "react";
import BookCard from "./components/BookCard";
import Modal from "./components/Modal";
import booksData from "../data/books.json";
import "./App.css";

function App() {
    const [books, setBooks] = useState(
    (booksData || []).map(b => ({ ...b, selected: false }))
  );

  const [selectedPublisher, setSelectedPublisher] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

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

  const publishers = ["All", ...new Set(books.map(b => b.publisher).filter(Boolean))];
  const languages = ["All", ...new Set(books.map(b => b.language).filter(Boolean))];

  const filteredBooks = books.filter(book => {
    const matchPublisher = selectedPublisher === "All" || book.publisher === selectedPublisher;
    const matchLanguage = selectedLanguage === "All" || book.language === selectedLanguage;
    return matchPublisher && matchLanguage;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const initialNewBook = {
    title: "",
    author: "",
    publisher: "",
    year: "",
    language: "",
    pages: "",
  };
  const [newBook, setNewBook] = useState(initialNewBook);

  const openModal = () => {
    setIsEditMode(false);
    setNewBook(initialNewBook);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setNewBook(initialNewBook);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleEdit = () => {
    const selectedBook = books.find(b => b.selected);
    if (selectedBook) {
      setIsEditMode(true);
      setNewBook({
        isbn13: selectedBook.isbn13,
        title: selectedBook.title || "",
        author: selectedBook.author || "",
        publisher: selectedBook.publisher || "",
        year: selectedBook.year || "",
        language: selectedBook.language || "",
        pages: selectedBook.pages || "",
        image: selectedBook.image || "",
      });
      setIsModalOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      const updatedBook = {
        isbn13: newBook.isbn13,
        title: newBook.title.trim(),
        author: (newBook.author || "").trim(),
        publisher: (newBook.publisher || "").trim(),
        year: newBook.year ? Number(newBook.year) : "",
        language: (newBook.language || "").trim(),
        pages: newBook.pages ? Number(newBook.pages) : "",
        image: (newBook.image || "").trim(),
        selected: false,
      };
      
      setBooks((prev) => prev.map(b => 
        b.isbn13 === updatedBook.isbn13 ? updatedBook : b
      ));
    } else {
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
    }
    
    closeModal();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Book Catalog</h1>
      </header>

      <div className="filters">
        <div className="filter-group">
          <label className="filter-label">
            Publisher
          </label>
          <select 
            className="filter-select"
            value={selectedPublisher} 
            onChange={(e) => setSelectedPublisher(e.target.value)}
          >
            {publishers.map(pub => (
              <option key={pub} value={pub}>{pub}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            Language
          </label>
          <select 
            className="filter-select"
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      <main>
        <div className="main">

          <div className="new" onClick={openModal}>
            <BookCard />
            <div className="button-container">
            <button
                className="action-button"
              disabled={!hasSelected}
              onClick={(e) => {
                e.stopPropagation(); 
                if (hasSelected) handleDelete();
              }}
            >
              Delete
            </button>
              <button
                className="action-button"
                disabled={!hasSelected}
                onClick={(e) => {
                  e.stopPropagation(); 
                  if (hasSelected) handleEdit();
                }}
              >
                Edit
              </button>
            </div>

          </div>

          <div className="content">
            {filteredBooks.map((book) => (
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
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
}

export default App;