import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

	const [newsEntries, setNewsEntries] = useState([]);
	const [error, setError] = useState([]);

	useEffect(() => {

		const getNewsItems = async (endpoint) => {

			try {
				const response = await axios.get('https://hn.algolia.com/api/v1/search_by_date?tags=story');

				//console.log(response.data.hits);
				setNewsEntries(response.data.hits);

			}
			catch (error) {
				//console.error(error.message);
				setError(error);
			}
		}


		getNewsItems();

	}, []);

	const newsListe = (
		<div className="list-container">

			{newsEntries.map(entry => (
				<a href={entry.url}
					 target="_blank"
					 className="block p-2 odd:bg-white/70 hover:underline"
					 key={entry.objectID}>
					 {entry.title}
				</a>
			))}

		</div>
	)

	const errorMessage = (
		<div className="p-8 text-center">{error.message}</div>
  )

  return (
		<div className="my-4 md:my-8 lg:my-12 mx-auto max-w-[960px] bg-orange-100">
			<div className="bg-amber-500 p-1">Hello HackerNews ...</div>
			{!error.message ? newsListe : errorMessage}
		</div>
  )
}

export default App;
