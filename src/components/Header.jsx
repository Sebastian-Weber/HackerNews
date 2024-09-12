// Logos
import LogoHackernews from '/src/assets/logos/logo-hackernews.svg'

import { useRef } from "react";
function Header(props) {

	let inputRef = useRef(null);
	//let selectRef = useRef(null);

	const handleShow = (e) => {
		e.preventDefault();
		props.filterList('tags=show_hn');
	}
	const handleAsk = (e) => {
		e.preventDefault();
		props.filterList('tags=ask_hn');
	}
	const handleNew = (e) => {
		e.preventDefault();
		props.filterList('');
	}

	function handleSubmit(event) {
		event.preventDefault();
		props.searchList('query=' + inputRef.current.value);
		inputRef.current.value = "";
	}

	return (
		<>

		{/* Header */}	
		<div className="p-2 bg-gray-800 sticky top-0 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

			<div className="flex flex-row mx-4 my-4 items-center">
				{/* Logo */}	
					<div className="mb-4 my-4 size-12 bg-gray-100">
						{/* <img class="my-4 pt-4 pr-2 pl-4 size-full md:size-auto" src="./src/assets/react.svg"></img> */}
						<img src={LogoHackernews}></img>
					</div>

				{/* Heading */}
					<h2 className="pl-2 mb-4 my-4 font-sans font-normal leading-none tracking-tight cursor-default select-none text-gray-200 text-4xl md:text-5xl lg:text-6xl dark:text-white">Hacker</h2>
					<h2 className="pl-1 -mt-2 font-sans font-normal leading-none tracking-tight cursor-default select-none text-gray-200 text-4xl md:text-5xl lg:text-6xl dark:text-white">|</h2>
					<h2 className="pl-1 mb-4 my-4 font-sans font-semibold leading-none tracking-tight cursor-default select-none text-gray-200 text-4xl md:text-5xl lg:text-6xl dark:text-white">News</h2>
			</div>
		{/* Header nav bar */}	
		<div className="flex flex-wrap my-2 mx-2 justify-between ">
			<div className="flex flex-row justify-start">
				<div className="flex flex-wrap px-2">
					<h5 className="flex flex-row text-1xl font-normal tracking-tight text-gray-200 dark:text-white">
						<a className="px-2 cursor-pointer" onClick={handleNew}>| most recent |</a>
					</h5>
					<h5 className="flex flex-row text-1xl font-normal tracking-tight text-gray-200 dark:text-white">
						<a className="px-2 cursor-pointer" onClick={handleAsk}>| ask HN |</a>
						</h5>
					<h5 className="flex flex-row text-1xl font-normal tracking-tight text-gray-200 dark:text-white">
						<a className="px-2 cursor-pointer" onClick={handleShow}>| archive |</a>
					</h5>
				</div>
			</div>
			<div className="flex flex-row justify-end">
				<form onSubmit={handleSubmit}>
					<div className="px-4 mt-0">
						<input class="w-28 md:min-w-36 lg:min-w-44 px-1 placeholder-gray-900 focus:ring-" type="text" placeholder="&nbsp;Search ..." ref={inputRef}/>
					</div>
				</form>
			</div>
		
		</div>
		</div>

		<br/>
	
		</>	
	)
}

export default Header;
