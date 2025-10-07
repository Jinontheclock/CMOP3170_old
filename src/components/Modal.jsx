import React from "react";
import "./Modal.css";

function Modal({ newBook, onChange, onSubmit, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Book</h2>
        <form onSubmit={onSubmit} className="modal-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={newBook.title}
              onChange={onChange}
              className="inputs"
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={newBook.author}
              onChange={onChange}
              className="inputs"
              required
            />
          </div>

          <div className="form-group">
            <label>Publisher</label>
            <input
              type="text"
              name="publisher"
              placeholder="Publisher"
              value={newBook.publisher}
              onChange={onChange}
              className="inputs"
            />
          </div>

          <div className="form-group">
            <label>Publication Year</label>
            <input
              type="number"
              name="year"
              value={newBook.year}
              onChange={onChange}
              className="inputs"
            />
          </div>

          <div className="form-group">
            <label>Language</label>
            <input
              type="text"
              name="language"
              placeholder="Language"
              value={newBook.language}
              onChange={onChange}
              className="inputs"
            />
          </div>

          <div className="form-group">
            <label>Pages</label>
            <input
              type="number"
              name="pages"
              value={newBook.pages}
              onChange={onChange}
              className="inputs"
            />
          </div>


         <div className="form-group">
           <label>Cover URL</label>
           <input
             type="url"
             name="image"
             placeholder="https://example.com/cover.jpg"
             value={newBook.image || ""}
             onChange={onChange}
             className="inputs"
             required
           />
         </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;