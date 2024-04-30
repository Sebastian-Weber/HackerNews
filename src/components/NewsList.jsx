import { useEffect, useState } from "react";
import axios from "axios";
const apiFragment = 'https://hn.algolia.com/api/v1/';


function NewsList({ searchQuery }) {

	const [newsEntries, setNewsEntries] = useState([]);
	const [pageData, setPageData] = useState({});
	const [error, setError] = useState([]);

	const getNewsItems = async (endpoint) => {
		try {
			const response = await axios.get(apiFragment + endpoint);
			console.log(response.data);
			setNewsEntries(response.data.hits);
			setPageData({
				page: response.data.page,
				entriesPerPage: response.data.hitsPerPage,
				maxPages: response.data.nbPages
			});
		}
		catch (error) {
			//console.error(error.message);
			setError(error);
		}
	}

	useEffect(() => {

		if (searchQuery !== '') {
			getNewsItems(`search?query=${searchQuery}&hitsPerPage=20`);
		}

		else {
			getNewsItems('search_by_date?tags=story&hitsPerPage=20');
		}

	}, [searchQuery]);

	const regularOutput = (
		<div className="list-container">
			{newsEntries.map(item => (
				<a href={item.url}
					 target="_blank"
					 className="block p-2 odd:bg-white/60 hover:underline"
					 key={item.objectID}>
					 {item.updated_at} --- {item.title}
				</a>
			))}
		</div>
	)

	const errorMessage = <div className="p-8 text-center">{error.message}</div>;

	return (
		<>
			<div className="list-container">
				{!error.message ? regularOutput : errorMessage}
			</div>
		</>
	)

}

export default NewsList;
