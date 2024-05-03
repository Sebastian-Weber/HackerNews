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
		<div className="bg-amber-500 p-1">Hello HackerNews ...
			<form onSubmit={handleSubmit}>
				<div className="flex gap-2">
					<input type="text" ref={inputRef} />
					<div>
						<a className="cursor-pointer" onClick={handleNew}>new</a>&nbsp;|&nbsp;
						<a className="cursor-pointer" onClick={handleAsk}>ask</a>&nbsp;|&nbsp;
						<a className="cursor-pointer" onClick={handleShow}>show</a>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Header;
