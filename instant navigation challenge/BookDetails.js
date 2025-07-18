import * as React from "react";
import { createStarString, getRatingString } from "./utils";

export default function BookDetails({
  thumbnail,
  title,
  averageRating,
  description,
  authors
}) {
  const [showMore, setShowMore] = React.useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <main className="book-detail">
      <div>
        <span className="book-cover">
          <img src={thumbnail} alt={title} />
        </span>
      </div>
      <div>
        <h2 className="book-title">{title}</h2>
        <small className="book-author">{authors?.join(", ")}</small>
        <span className="book-rating">
          {createStarString(averageRating)} {getRatingString(averageRating)}
        </span>
        <div
          className={`book-synopsis ${showMore ? "expanded" : ""}`}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <button className="link" onClick={toggleShowMore}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </main>
  );
}
