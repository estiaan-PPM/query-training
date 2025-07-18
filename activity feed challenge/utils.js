const BASE_URL = "https://library-api.uidotdev.workers.dev";

export async function getActivity(page) {
  const url = `${BASE_URL}/activity?pageSize=10&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable fetch data");
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

export function flattenActivities(pages) {
  return pages.flatMap((page) => page.activities);
}
