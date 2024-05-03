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
					{newsEntries.map(item => (
						<NewsEntry {...item} key={item.objectID}/>
					))}

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
