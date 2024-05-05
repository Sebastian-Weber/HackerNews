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
						<div className="p-6 my-3 mx-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

						{/* Generate heading with link for entry */}
							<div key={entry.objectID} className="news-item">
							<h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
							<a
								href={entry.url}
								target="_blank"
								className="news-link"
								key={entry.objectID}
								onClick={() => getCommentCount(entry.objectID)}
							>
								{entry.title}
							</a>
							</h5>
							<br/>
							<p className="font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis a minus quae aspernatur, commodi sunt suscipit iure laboriosam ab minima saepe aut necessitatibus autem ullam illum recusandae ut ducimus eum.</p>
							<br/>
							{/* Generate button bar */}
							<div className="flex flex-nowrap justify-items-start">

								{/* Read more button */}
								<div className="mr-2">
									<a href={entry.url}
									target="_blank"
									className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-400 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800" 
									key={entry.objectID}
									onClick={() => getCommentCount(entry.objectID)}>
									Read more
									<div className="flex flex-nowrap justify-between">
									<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
									</svg>
									</div>
									</a>
								</div> 

								{/* Comments button */}
								<div className="mr-2">
									<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-400 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
									Comments {entry.num_comments}
									<div className="flex flex-nowrap justify-between">
										<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
										<path stroke="currentColor" d="M0,1H16V12H5.711L2,15.711V12H0ZM15,11V2H1v9H3v2.289L5.289,11Z" />
										</svg>
									</div>
									</a>
								</div>

								{/* More from this author button */}
								<div className="mr-2">
								<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-400 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
								{entry.author}
									<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
										<path stroke="currentColor" d="M10.391,9.4a6.693,6.693,0,0,1,1.918,1.027,6.785,6.785,0,0,1,1.453,1.527,6.964,6.964,0,0,1,.918,1.9A7.2,7.2,0,0,1,15,16H14a6.127,6.127,0,0,0-.457-2.379,5.752,5.752,0,0,0-3.164-3.164,6.349,6.349,0,0,0-3.988-.246,6.029,6.029,0,0,0-1.441.6,5.86,5.86,0,0,0-2.141,2.141,6.029,6.029,0,0,0-.6,1.441A6.089,6.089,0,0,0,2,16H1a7.009,7.009,0,0,1,1.258-4.039,6.865,6.865,0,0,1,1.457-1.516,7.09,7.09,0,0,1,1.91-1.039,4.913,4.913,0,0,1-1.094-.8,4.964,4.964,0,0,1-.824-1.043A5.121,5.121,0,0,1,3.184,6.34a5.027,5.027,0,0,1,.207-3.289A5,5,0,0,1,6.051.391a5.059,5.059,0,0,1,3.9,0,5,5,0,0,1,2.66,2.66,5.015,5.015,0,0,1,.207,3.285,5.066,5.066,0,0,1-.523,1.219,5.172,5.172,0,0,1-.82,1.043A4.837,4.837,0,0,1,10.391,9.4ZM4,5a3.851,3.851,0,0,0,.316,1.555A4.052,4.052,0,0,0,6.445,8.684a3.978,3.978,0,0,0,3.109,0,4.052,4.052,0,0,0,2.129-2.129A3.851,3.851,0,0,0,12,5a3.851,3.851,0,0,0-.316-1.555A4.052,4.052,0,0,0,9.555,1.316a3.978,3.978,0,0,0-3.109,0A4.052,4.052,0,0,0,4.316,3.445,3.851,3.851,0,0,0,4,5Z"/>
									</svg>
									</a>
								</div>

								{/* Tags button */}
								{/* <a className="inline-flex items-center mx-4 px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
								Tags: {entry._tags}
								</a> */}

								</div>
								<br/>

								{/* Card footer*/}
								<div className="flex flex-nowrap justify-between">

								{/* Created at */}
								<div className="flex flex-nowrap justify-between">
									<div className="font-normal text-gray-600 dark:text-gray-400">
									Published at: {entry.created_at}
									</div>
									{/* <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
									<path stroke="currentColor" d="M12.727,6.008a3.492,3.492,0,0,1,2.324,1.1,3.573,3.573,0,0,1,.7,1.09,3.484,3.484,0,0,1-.023,2.668,3.528,3.528,0,0,1-1.859,1.859A3.376,3.376,0,0,1,12.5,13H10V12h2.5a2.449,2.449,0,0,0,.973-.2A2.489,2.489,0,0,0,14.8,10.473a2.52,2.52,0,0,0,0-1.945A2.489,2.489,0,0,0,13.473,7.2a2.509,2.509,0,0,0-1.25-.18,2.332,2.332,0,0,0-.27.047,3.335,3.335,0,0,0-.383-1.215,3.578,3.578,0,0,0-.766-.969A3.511,3.511,0,0,0,9.75,4.234,3.374,3.374,0,0,0,8.5,4a3.409,3.409,0,0,0-1.055.164A3.5,3.5,0,0,0,5.234,6.273,2.885,2.885,0,0,0,4,6a2.915,2.915,0,0,0-1.168.234,3.023,3.023,0,0,0-1.6,1.6,3.018,3.018,0,0,0,0,2.332,3.033,3.033,0,0,0,1.6,1.6A2.915,2.915,0,0,0,4,12H7v1H4a3.851,3.851,0,0,1-1.555-.316A4.052,4.052,0,0,1,.316,10.555a3.978,3.978,0,0,1,0-3.109A4.052,4.052,0,0,1,2.445,5.316,3.917,3.917,0,0,1,4.727,5.07a4.6,4.6,0,0,1,.727-.859,4.652,4.652,0,0,1,.9-.652,4.45,4.45,0,0,1,1.031-.414,4.4,4.4,0,0,1,2.488.074,4.618,4.618,0,0,1,1.219.613,4.458,4.458,0,0,1,1.637,2.176Zm-2.578,4.844L9,9.711V15H8V9.711L6.852,10.852l-.7-.7L8.5,7.8l2.352,2.352Z"/>
									</svg> */}
								</div>

								{/* Last Update */}
								<div className="flex flex-nowrap justify-between">
									<a className="font-normal text-gray-600 dark:text-gray-400">
									Last update: {entry.updated_at}
									</a>
									{/* <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"  width="16" height="16" fill="none" viewBox="0 0 16 16">
									<path stroke="currentColor" d="M8,4V8.289l2.852,2.859-.7.7L7,8.711V4Zm7.375.883A7.992,7.992,0,0,1,8,16a7.852,7.852,0,0,1-2.625-.445,7.956,7.956,0,0,1-2.258-1.219,8.1,8.1,0,0,1-1.742-1.859A7.735,7.735,0,0,1,.3,10.133l.961-.266a6.827,6.827,0,0,0,.965,2.078A7.1,7.1,0,0,0,3.766,13.57a7,7,0,0,0,1.977,1.055,7,7,0,0,0,4.113.125A7.037,7.037,0,0,0,14.75,9.859a7.025,7.025,0,0,0,0-3.715A7.029,7.029,0,0,0,9.855,1.25a6.973,6.973,0,0,0-3.824.035A7.05,7.05,0,0,0,2.77,3.355,6.866,6.866,0,0,0,1.68,5H4V6H0V2H1V4.141q.133-.25.289-.488t.328-.465A8,8,0,0,1,3.336,1.5,8.106,8.106,0,0,1,5.547.383,7.9,7.9,0,0,1,8,0a8.034,8.034,0,0,1,7.375,4.883Z"/>
									</svg> */}
								</div>

								</div>

							<br/>
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
