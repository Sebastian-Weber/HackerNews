import { useEffect, useState } from "react";
import { SpinnerCircular } from 'spinners-react';
import NewsEntry from "./NewsEntry.jsx";
import Pagination from "./Pagination.jsx";
import axios from "axios";

const apiFragment = 'https://hn.algolia.com/api/v1/';

function NewsList({searchQuery}) {

	const [newsEntries, setNewsEntries] = useState([]);
	const [paginationData, setPaginationData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState([]);

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
		}
		catch (error) {
			setError(error);
		}
		finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (!searchQuery) getNewsItems('search_by_date?tags=story&hitsPerPage=20').then();
		if (searchQuery !== '') getNewsItems(`search?${searchQuery}&hitsPerPage=20`).then();
	}, [searchQuery]);

	const displayList = (
		<div className="list-container">
			{loading ? (
				<div className="flex items-center justify-around min-h-[400px]">
					<SpinnerCircular color="#3E2A2A" thickness={100} size={60} />
				</div>
			) : (
				<>
					<div className="">
						{newsEntries.map(entry => (
							<div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
								<h5>
									<a href={entry.url}
										target="_blank"
										className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
										key={entry.objectID}>
										{entry.title}
									</a>
								</h5>
								<br/>
								<p className="mb-3 font-semibold text-gray-600 dark:text-white">By {entry.author}</p>
								<br/>
								<p className="mb-3 font-reular text-gray-700 dark:text-white">{entry.title}.</p>
								<br/>
								<p className="mb-3 font-reular text-gray-700 dark:text-white">{entry.story}.</p>
								<br/>
								<p className="mb-3 font-semibold text-gray-600 dark:text-white">Published at: {entry.created_at}</p>
								<p className="mb-3 font-semibold text-gray-600 dark:text-white">Last update: {entry.updated_at}</p>
								<p className="mb-3 font-semibold text-gray-600 dark:text-white">Tags: {entry._tags}</p>
								<p className="mb-3 font-semibold text-gray-600 dark:text-white">Tags:</p>
								{/* <br/> */}
								<div className="flex flex-nowrap">
								<a href={entry.url} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
									Read more
									<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
									</svg>
								</a>
								</div>
								<br/>
								<div className="flex flex-nowrap">
									<a className="inline-flex items-center mx-4 px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
										Comments {entry.num_comments}
									</a>
									<a className="inline-flex items-center mx-4 px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
									{entry._tags}
									</a>
								</div>
							</div>
						))}
					</div>
				</>
			)}

		</div>
	);

	const displayError = (
		<div className="p-8 text-center">{error.message}</div>
	);

	return (
		<>
			{!error.message ? displayList : displayError}
		</>
	)

}

export default NewsList;
