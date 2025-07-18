import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getActivity, flattenActivities } from "./utils";
import { ActivityListItem, NoMoreActivities } from "./ActivityComponents";
import useInView from "./useInView";

function ActivityFeed() {
  const rootRef = React.useRef(null);

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    status,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ["activity"],
    queryFn: ({ pageParam }) => getActivity(pageParam),
    initialPageParam: 1,
    getNextPageParam: ({ currentPage, totalPages }) => {
      const nextPage = currentPage + 1;
      if (nextPage >= totalPages) {
        return undefined;
      }
      return nextPage;
    }
  });

  const { ref } = useInView({
    threshold: 0,
    root: rootRef.current,
    rootMargin: "40px",
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  });

  if (status === "pending") {
    return <div>...</div>;
  }

  if (status === "error") {
    return <div>Error fetching data 😔</div>;
  }

  const activities = flattenActivities(data.pages);
  const hasResults = activities.length > 0;

  return (
    <section className="latest-activity">
      <h2>Latest activity</h2>
      {hasResults ? (
        <ol ref={rootRef}>
          {activities.map((activity, i) => {
            return <ActivityListItem key={i} activity={activity} />;
          })}
          {hasNextPage ? (
            <li ref={ref} />
          ) : (
            <NoMoreActivities
              onBackToTop={() => {
                rootRef.current.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </ol>
      ) : null}
    </section>
  );
}

export default function App() {
  return (
    <>
      <header className="app-header">
        <h1>
          <span>Query Library</span>
        </h1>
      </header>
      <main className="dashboard">
        <ActivityFeed />
      </main>
    </>
  );
}