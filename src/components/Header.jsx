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
		<div className="p-2 bg-gray-800 sticky top-0">

			<div className="flex row pl-2">
				{/* Logo */}	
				<div class="items-center" >
					<img class="my-4 pt-4 pr-2 pl-4 size-full md:size-auto" src="./src/assets/react.svg"></img>
				</div>
				{/* Heading */}
					<h1 className="mb-4 my-4 text-4xl font-sans font-regular leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white">Hacker|</h1>
					<h1 className="mb-4 my-4 pt-1 text-4xl font-mono font-semibold leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white">News</h1>
			</div>
		{/* Header nav bar */}	
		<div className="my-2 mx-2 flex justify-between row">
			<div className="flex row justify-start">
				<div className="flex px-2">
					<h5 className="text-1xl font-normal tracking-tight text-gray-200 dark:text-white">
						<a className="px-2 cursor-pointer" onClick={handleNew}>| most recent |</a>
					</h5>
					<h5 className="text-1xl font-normal tracking-tight text-gray-200 dark:text-white">
						<a className="px-2 cursor-pointer" onClick={handleAsk}>| ask HN |</a>
						</h5>
					<h5 className="text-1xl font-normal tracking-tight text-gray-200 dark:text-white">
						<a className="px-2 cursor-pointer" onClick={handleShow}>| archive |</a>
					</h5>
				</div>
			</div>
			<div className="flex row justify-end">
				<form onSubmit={handleSubmit}>
					<div className="flex px-4">
						<input type="text" placeholder="&nbsp;Search ..." ref={inputRef}/>
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
