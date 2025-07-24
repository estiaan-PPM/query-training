import * as React from "react";
import { createStarString, getRatingString } from "./utils";

export default function BookDetails({
  title,
  authors,
  averageRating,
  description
}) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div>
      <h2 className="book-title">{title}</h2>
      <small className="book-author">{authors?.join(", ")}</small>
      <span className="book-rating">
        {createStarString(averageRating)} {getRatingString(averageRating)}
      </span>
      <div
        className={`book-synopsis ${expanded ? "expanded" : ""}`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <button onClick={() => setExpanded(!expanded)} className="link">
        {expanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}
