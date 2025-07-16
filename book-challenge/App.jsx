import { useQuery } from "@tanstack/react-query";

async function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "The Hobbit",
        authors: ["J.R.R. Tolkien"],
        thumbnail: "https://ui.dev/images/courses/query/hobbit.jpg"
      });
    }, 1000);
  });
}

function useBook() {    //create own hook
  return useQuery({
    queryKey: ["book"],
    queryFn: getData,   //receive promise from async function
  });
}

function Book() {

  const {data, status} = useBook(); //call hook

  if(status === "pending") {    //add loading state
    return <Loading />;
  }

  if(status === "error") {  //add error state
    return <Error />;
  }

  
  return (
    <main className="book-detail">
      <div>
        <span className="book-cover">
          <img src={data.thumbnail} alt={data.title} />
        </span>
      </div>
      <div>
        <h2 className="book-title">{data.title}</h2>
        <small className="book-author">{data.authors.join(", ")}</small>
      </div>
    </main>
  );
}

function Loading() {
  return <main>Loading...</main>;
}

function Error() {
  return <main>Woops there was an error...</main>;
}

export default function App() {
  return (
    <div>
      <header className="app-header">
        <h1>
          <span>Query Library</span>
        </h1>
      </header>
      <Book />
    </div>
  );
}
