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
		{/* ReactNews Header */}	
		<div className="flex flex-nowrap bg-gray-800" >
			<div class="items-center" >
				<img class="my-4 pt-4 pr-2 pl-4 size-full md:size-auto" src="./src/assets/react.svg"></img>
			</div>
	
			<h1 className="mb-4 my-4 text-4xl font-sans font-regular leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white">React|</h1>
			<h1 className="mb-4 my-4 pt-1 text-4xl font-mono font-semibold leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white">News</h1>
			<br/>
			<div>
				<form onSubmit={handleSubmit}>
					<div className="flex gap-2">
						<input type="text" ref={inputRef} />
						<a className="mb-4 my-4 text-4xl font-sans font-regular leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white cursor-pointer" onClick={handleNew}>new |</a>
						<a className="mb-4 my-4 text-4xl font-sans font-regular leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white cursor-pointer" onClick={handleAsk}>ask |</a>
						<a className="mb-4 my-4 text-4xl font-sans font-regular leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white cursor-pointer" onClick={handleShow}>show</a>
					</div>
				</form>
			</div>
		</div>


		</>	
	)
}

export default Header;
