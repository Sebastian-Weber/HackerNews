import { useEffect, useState } from "react";
import { SpinnerCircular } from 'spinners-react';
import NewsEntry from "./NewsEntry.jsx";
import Pagination from "./Pagination.jsx";
import axios from "axios";

// The base URL for the Hacker News API
const apiFragment = 'https://hn.algolia.com/api/v1/';

// The main NewsList component that fetches and displays news items
function NewsList({searchQuery}) {

  // State variables for managing the news items and loading state
  const [newsEntries, setNewsEntries] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  // The function that fetches news items from the API
  const getNewsItems = async (endpoint) => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const response = await axios.get(apiFragment + endpoint); // Make the API request
      setNewsEntries(response.data.hits); // Set the news entries with the response data
      setPaginationData({ // Set the pagination data with the response data
        page: response.data.page,
        entriesPerPage: response.data.hitsPerPage,
        maxPages: response.data.nbPages,
        items: response.data.hits.map((i, k) => k)
      });
    }
    catch (error) {
      setError(error); // Set the error state if there was an error during the request
    }
    finally {
      setLoading(false); // Set loading to false regardless of whether the request succeeded or failed
    }
  }

  // Call the getNewsItems function when the component mounts or when the searchQuery prop changes
  useEffect(() => {
    if (!searchQuery) getNewsItems('search_by_date?tags=story&hitsPerPage=20').then();
    if (searchQuery !== '') getNewsItems(`search?${searchQuery}&hitsPerPage=20`).then();
  }, [searchQuery]);

  // The variable that displays the list of news entries
  const displayList = (
    <div className="list-container">
      {loading ? (
        <div className="flex items-center justify-around min-h-[400px]">
          <SpinnerCircular color="#3E2A2A" thickness={100} size={60} />
        </div>
      ) : (
        <>
          {newsEntries.map(item => (
            <NewsEntry {...item} key={item.objectID}/>
          ))}
        </>
      )}
    </div>
  );

  // The variable that displays an error message if there was an error during the request
  const displayError = (
    <div className="p-8 text-center">{error.message}</div>
  );

  // Render either the list of news entries or the error message
  return (
    <>
      {!error.message ? displayList : displayError}
    </>
  )

}

export default NewsList;