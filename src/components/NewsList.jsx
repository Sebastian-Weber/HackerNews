import { useEffect, useState } from "react";
import { SpinnerCircular } from 'spinners-react';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import NewsEntryTailwindCSS from "./NewsEntryTailwindCSS.jsx";
const apiFragment = 'https://hn.algolia.com/api/v1/';

function NewsList({ searchQuery }) {
    const [newsEntries, setNewsEntries] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const getNewsItems = async (endpoint) => {
        try {
            setLoading(true);
            const response = await axios.get(apiFragment + endpoint);
            setNewsEntries(response.data.hits);
            setPaginationData({
                page: response.data.page,
                entriesPerPage: response.data.hitsPerPage,
                maxPages: response.data.nbPages,
                items: response.data.hits.map((i, k) => k)
            });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const endpoint = searchQuery
            ? `search?${searchQuery}&hitsPerPage=10&page=${currentPage}`
            : `search_by_date?tags=story&hitsPerPage=10&page=${currentPage}`;
        getNewsItems(endpoint);
    }, [searchQuery, currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const displayList = (
        <div className="list-container">
            {loading ? (
                <div className="flex items-center justify-around min-h-[400px]">
                    <SpinnerCircular color="#3E2A2A" thickness={100} size={60} />
                </div>
            ) : (
                <>
                    {newsEntries.map(item => (
                        <NewsEntryTailwindCSS {...item} key={item.objectID} />
                    ))}
                </>
            )}
        </div>
    );

    const displayError = (
        <div className="p-8 text-center">{error?.message}</div>
    );

    return (
        <>
            {!error ? displayList : displayError}
            {!loading && !error && (
			<footer className="sticky bottom-0">
          		<div className="p-4">
                <ReactPaginate
				containerClassName="pagination"
					className="flex flex-row justify-center items-center"
                    previousLabel={
						<div className="flex flex-row justify-center items-center w-10 h-10 text-gray-500 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						  <svg
							xmlns="http://www.w3.org/2000/svg"
							height="18px"
							viewBox="0 -960 960 960"
							width="18px"
							fill="#e2e8f0"
						  >
							<path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
						  </svg>
						</div>
					  }
                    nextLabel={
						<div className="flex flex-row justify-center items-center w-10 h-10 text-gray-500 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						  <svg
							xmlns="http://www.w3.org/2000/svg"
							height="18px"
							viewBox="0 -960 960 960"
							width="18px"
							fill="#e2e8f0"
						  >
							<path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
						  </svg>
						</div>
					  }
					  breakClassName="flex flex-row justify-center items-center w-10 h-10 text-gray-500 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    breakLabel={'...'}
                    pageCount={paginationData.maxPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    activeClassName="flex flex-row justify-center items-center w-10 h-10 text-gray-500 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
					pageClassName={
						"flex flex-row justify-center items-center w-10 h-10 text-gray-500 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
					  }
                />
				</div>
				</footer>
            )}
        </>
    );
}

export default NewsList;

