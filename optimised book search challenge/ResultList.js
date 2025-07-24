import { createStarString } from "./utils";

function Book({ thumbnail, title, authors, averageRating }) {
  return (
    <li>
      <span className="book-cover">
        <img src={thumbnail} alt={title} />
      </span>
      <h3 className="book-title">{title}</h3>
      <small className="book-author">{authors.join(", ")}</small>
      <span className="book-rating">{createStarString(averageRating)}</span>
    </li>
  );
}

export default function ResultList({ searchTerm, data }) {
  return (
    <section className="search-results book-grid">
      <div>
        <h2>
          Search results for <strong>{searchTerm}</strong>
        </h2>
        <ul>
          {data.map((book) => {
            return (
              <Book
                key={book.id}
                thumbnail={book.thumbnail}
                title={book.title}
                authors={book.authors}
                averageRating={book.averageRating}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
