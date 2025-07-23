export const BASE_URL = "https://library-api.uidotdev.workers.dev";

export async function getFeaturedBooks() {
  const url = `${BASE_URL}/books/featured`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch data");
  }

  const data = await response.json();
  return data;
}

export async function getBook(bookId) {
  const url = `${BASE_URL}/books/${bookId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch data");
  }

  const data = await response.json();
  return data;
}

export async function getLatestReview() {
  const url = `${BASE_URL}/reviews/latest`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch data");
  }

  const data = await response.json();
  return data;
}

export async function getReviewsForBook(bookId) {
  const url = `${BASE_URL}/reviews/${bookId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch data");
  }

  const data = await response.json();
  return data;
}

export async function getMyBooks() {
  const url = `${BASE_URL}/books/my-books`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch data");
  }

  const data = await response.json();
  return data;
}

export async function getBookSearchResult(query, page) {
  const url = `${BASE_URL}/books/search?q=${encodeURI(query)}&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch data");
  }

  const data = await response.json();
  return data;
}

export async function getActivity(page) {
  const url = `${BASE_URL}/activity?pageSize=10&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch data");
  }

  const data = await response.json();
  return data;
}

export async function checkoutBook(bookId) {
  const url = `${BASE_URL}/checkout/${bookId}`;
  const response = await fetch(url, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Unable to checkout book");
  }

  const data = await response.json();
  return data;
}

export async function returnBook(bookId) {
  const url = `${BASE_URL}/return/${bookId}`;
  const response = await fetch(url, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Unable to return book");
  }

  const data = await response.json();
  return data;
}

export async function postReviewData({ title, text, rating, bookId }) {
  const url = `${BASE_URL}/reviews/${bookId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, text, rating }),
  });

  if (!response.ok) {
    throw new Error("Unable to post review");
  }

  const data = await response.json();
  return data;
}

export async function updateReview({ title, text, rating, reviewId }) {
  const url = `${BASE_URL}/reviews/${reviewId}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, text, rating }),
  });

  if (!response.ok) {
    throw new Error("Unable to edit review");
  }

  const data = await response.json();
  return data;
}

export function createStarString(number) {
  if (typeof number !== "number") {
    return "No reviews";
  }

  const filledStars = Array.from({ length: Math.floor(number) }).map(() => "★");
  const emptyStars = Array.from({ length: 5 - filledStars.length }).map(
    () => "☆"
  );

  return filledStars.concat(emptyStars).join("");
}

export function getRatingString(number) {
  if (typeof number !== "number") {
    return "";
  }

  return `(${number} / 5)`;
}

export function timeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}

export function flattenActivities(list) {
  return list.reduce((acc, c) => acc.concat(c.activities), []);
}
