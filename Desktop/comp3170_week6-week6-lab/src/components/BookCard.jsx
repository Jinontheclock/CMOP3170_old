import React from "react";
import "./BookCard.css";

function BookCard({ isbn13, title, subtitle, price, image, url, selected, onSelect }) {
  return (
      <div
      className={`book-card${selected ? " selected" : ""}`}
      onClick={() => onSelect && onSelect(isbn13)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onSelect) onSelect(isbn13);
      }}
    >

      {image ? (
        <img src={image} alt={title} className="book-image" />
      ) : (
        <div className="placeholder">Add New Book</div>
      )}

      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        {subtitle && <h3 className="book-subtitle">{subtitle}</h3>}
        {price && <p className="book-price">{price}</p>}
      </div>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="learn-more"
          onClick={(e) => e.stopPropagation()}
        >
          Learn More
        </a>
      )}

    </div>
  );

}

export default BookCard;