import StoryText from "./StoryText.jsx";

function NewsEntry(props) {

	let d = new Date(props.created_at);
	const year = d.getFullYear()
	const month = `${d.getMonth() + 1}`.padStart(2, "0")
	const day = `${d.getDate()}`.padStart(2, "0")
	const hours = `${d.getHours()}`.padStart(2, "0")
	const minutes = `${d.getMinutes()}`.padStart(2, "0")
	const stringDate = [day, month, year].join(".") + ' - ' + [hours, minutes].join(":");

	const title = (
		<span>{props.title}</span>
	);

	const title_link = (
		<a href={props.url} target="_blank" className="block hover:underline">{props.title}</a>
	);

	return (
		<>

			{/* Renders card layout for news entry */}
			<div className="p-3 px-6 my-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

				{/* renders a horizontal bar */}
				<div className="flex flex-nowrap justify-start">

					{/* renders a publishing date */}
					<div className="pt-3 flex flex-nowrap justify-between">
						<p className="inline-flex items-center py-2 text-sm font-medium text-center text-gray-400">
							{stringDate}
						</p>
					</div>

					{/* renders an ID */}
					<div className="pt-3 flex flex-nowrap justify-between">
						<p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-400">
						ID:&nbsp;{props.story_id}
						</p>
					</div>

					</div>

				{/* Renders a heading and makes it a link */}
				<h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
					{props.url ? title_link : title}
				</h2>
				<br/>

				{/* Renders a paragraph with lorem ipsum  */}
				<p className="font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis a minus quae aspernatur, commodi sunt suscipit iure laboriosam ab minima saepe aut necessitatibus autem ullam illum recusandae ut ducimus eum.</p>

				{/* Renders a paragraph with story text  */}
				<p>{props.story_text && <StoryText html={props.story_text}/>}</p>
				<br/>

				{/* renders a horizontal bar */}
				<div className="flex flex-nowrap justify-start">

					{/* renders an author button */}
					<div className="mr-2">
						<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-400 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
						{props.author}
							<div className="flex flex-nowrap justify-between">
								<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
									<path stroke="currentColor" d="M10.391,9.4a6.693,6.693,0,0,1,1.918,1.027,6.785,6.785,0,0,1,1.453,1.527,6.964,6.964,0,0,1,.918,1.9A7.2,7.2,0,0,1,15,16H14a6.127,6.127,0,0,0-.457-2.379,5.752,5.752,0,0,0-3.164-3.164,6.349,6.349,0,0,0-3.988-.246,6.029,6.029,0,0,0-1.441.6,5.86,5.86,0,0,0-2.141,2.141,6.029,6.029,0,0,0-.6,1.441A6.089,6.089,0,0,0,2,16H1a7.009,7.009,0,0,1,1.258-4.039,6.865,6.865,0,0,1,1.457-1.516,7.09,7.09,0,0,1,1.91-1.039,4.913,4.913,0,0,1-1.094-.8,4.964,4.964,0,0,1-.824-1.043A5.121,5.121,0,0,1,3.184,6.34a5.027,5.027,0,0,1,.207-3.289A5,5,0,0,1,6.051.391a5.059,5.059,0,0,1,3.9,0,5,5,0,0,1,2.66,2.66,5.015,5.015,0,0,1,.207,3.285,5.066,5.066,0,0,1-.523,1.219,5.172,5.172,0,0,1-.82,1.043A4.837,4.837,0,0,1,10.391,9.4ZM4,5a3.851,3.851,0,0,0,.316,1.555A4.052,4.052,0,0,0,6.445,8.684a3.978,3.978,0,0,0,3.109,0,4.052,4.052,0,0,0,2.129-2.129A3.851,3.851,0,0,0,12,5a3.851,3.851,0,0,0-.316-1.555A4.052,4.052,0,0,0,9.555,1.316a3.978,3.978,0,0,0-3.109,0A4.052,4.052,0,0,0,4.316,3.445,3.851,3.851,0,0,0,4,5Z"/>
								</svg>
							</div>
						</a>
					</div>

					{/* renders a comments button */}
					<div className="mr-2">
						<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-400 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
						{props.num_comments}
							<div className="flex flex-nowrap justify-between">
								<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
									<path stroke="currentColor" d="M0,1H16V12H5.711L2,15.711V12H0ZM15,11V2H1v9H3v2.289L5.289,11Z" />
								</svg>
							</div>
						</a>
					</div>

				</div>
				<br/>

			</div>	
		</>
	)
}

export default NewsEntry;