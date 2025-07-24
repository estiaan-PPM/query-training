import * as React from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Results from "./Results";

const BASE_URL = "https://library-api.uidotdev.workers.dev";

async function getData(query, signal) {
  const url = `${BASE_URL}/books/search?q=${query}`;
  const response = await fetch(url, {signal});

  if (!response.ok) {
    throw new Error("Unable fetch data");
  }

  const data = await response.json();
  return data.books;
}

function useBookSearch(searchTerm) {
  return useQuery({
    queryKey: ["search", { searchTerm }],
    queryFn: ({signal}) => getData(searchTerm, signal),
    enabled: searchTerm !== ""
  });
}

export default function App() {
  const [value, setValue] = React.useState("");
  // const searchTerm = useDebounce(value, 300);
  const { data, status, isLoading } = useBookSearch(value);

  return (
    <div>
      <header className="app-header">
        <h1>
          <span>Query Library</span>
        </h1>
        <div className="search-wrapper">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="search-input"
            type="text"
            name="search"
            id="search"
            autoComplete="off"
            autoCorrect="off"
            placeholder="Search books"
          />
          {isLoading && <Loader />}
        </div>
      </header>
      <main>
        <Results status={status} data={data} searchTerm={value} />
      </main>
    </div>
  );
}
