
import { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerCircular, 
	SpinnerCircularFixed, 
	SpinnerCircularSplit, 
	SpinnerDiamond, 
	SpinnerDotted, 
	SpinnerInfinity, 
	SpinnerRound, 
	SpinnerRoundFilled, 
	SpinnerRoundOutlined } from 'spinners-react';


function HackerNewsAdvanced() {


	const [newsEntries, setNewsEntries] = useState([]);
	const [error, setError] = useState([]);

	useEffect(() => {

		const getNewsItems = async (endpoint) => {

			try {
				const response = await axios.get('http://hn.algolia.com/api/v1/search?query=react&tags=story');

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


	// Open AI Image generator that turns text prompts into images and saves them in an array
	// const response = openai.images.generate({
	// 		model: "dall-e-3",
	// 		prompt: "{entry.title}",
	// 		n: 1,
	// 		size: "1024x1024",
	// 	  });
	// 	  image_url = response.data[0].url;

	// 	  console.log()

	const newsListe = (
		<div className="grid grid-cols-3 grid-rows-3 gap-3 p-4 mx-auto max-w-[1024px] bg-sky-100">
			{newsEntries.map(entry => (
				<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<img src="./src/assets/images/Logic-puzzle.png"></img>
					<br/>
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
					<p className="mb-3 font-reular text-gray-700 dark:text-white">{entry.title}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa saepe autem quam quasi tempore. Architecto hic consequuntur, quasi nobis porro reiciendis nisi repellendus, eos voluptate sunt quas autem laudantium vel. ... </p>
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
	)


	// Busy Spinner ON/OFF 
	// const [isBusy, setIsBusy] = useState(false);

	// useEffect(() => {
	// 	setIsBusy(true);
	// 	fetchData().then(() => setIsBusy(false));
	//   }, []);


	// HackerNews error message
	const errorMessage = (
		<div className="p-8 text-center">{error.message}</div>
  )

  return (
	<>

    {/* Separator */}	
    <div className="flex flex-nowrap bg-orange-400" >
			<h1 className="mb-4 pl-5 my-4 text-4xl font-sans font-regular leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">Sebastian's Sandbox</h1>
	</div>

		{/* HackerNews Columns Grid */}
		<div className="mx-auto max-w-[960px]">
		{/* HackerNews Header */}	
    	<div className="flex flex-nowrap bg-gray-800" >
			<div class="items-center">
				<img class="py-4 pr-2 pl-4 size-full md:size-auto" src="./src/assets/images/react-logo.svg"></img>
			</div>
			<h1 className="mb-4 my-4 text-4xl font-sans font-regular leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white">Hacker|</h1>
			<h1 className="mb-4 my-4 py-1 text-4xl font-mono font-semibold leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white">News Sandbox</h1>
		</div>
			{!error.message ? newsListe : errorMessage}
		</div>

		{/* grid layout with 3 columns and 3 rows */}
		<div className="grid grid-cols-3 grid-rows-3 gap-3 mx-auto max-w-[960px] bg-sky-200"> 

			{/* card 1 layout starts here*/}
			<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<a href="#">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				</a>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
				<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
					Read more
					<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
					</svg>
				</a>
			</div>
			{/* card 2 layout starts here*/}
			<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<a href="#">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				</a>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
				<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Read more
					<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
					</svg>
				</a>
			</div>
			{/* card 3 layout starts here*/}
			<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<a href="#">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				</a>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
				<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Read more
					<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
					</svg>
				</a>
			</div>
			{/* card 4 layout starts here*/}
			<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<img src="./src/assets/images/Deep-beneath-London.png"></img>
				<br/>
				<a href="#">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				</a>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
				<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Read more
					<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
					</svg>
				</a>
			</div>
			{/* card 5 layout starts here*/}
			<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<img src="./src/assets/images/AI-boyfriend-6.png"></img>
				<br/>
				<a href="#">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				</a>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
				<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Read more
					<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
					</svg>
				</a>
			</div>
			{/* card 6 layout starts here*/}
			<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<img src="./src/assets/images/logic-puzzle.png"></img>
				<br/>
				<a href="#">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				</a>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
				<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Read more
					<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
					</svg>
				</a>
			</div>
			{/* card 7 layout starts here*/}
			<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<img src="./src/assets/images/bacteria-to-live-in-plastic.png"></img>
				<br/>
				<a href="#">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				</a>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
				<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Read more
					<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
					</svg>
				</a>
			</div>
			{/* card 8 layout starts here*/}
			<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<img src="./src/assets/images/Nsa-guy-who-tried-and-failed.jpg"></img>
				<br/>
				<a href="#">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				</a>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
				<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Read more
					<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
					</svg>
				</a>
			</div>
			{/* card 9 layout starts here*/}
			<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<img src="./src/assets/images/Americans-might-lose-internet-access.jpg"></img>
				<br/>
				<a href="#">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				</a>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
				<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Read more
					<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
					</svg>
				</a>
			</div>
		</div>

	</>	
  )
}

export default HackerNewsAdvanced;
