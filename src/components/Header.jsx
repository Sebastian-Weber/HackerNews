import { useRef } from "react";
function Header(props) {

	let inputRef = useRef(null);
	//let selectRef = useRef(null);

	function handleSubmit(event) {
		event.preventDefault();
		props.searchList(inputRef.current.value);
	}

	return (
		<div className="bg-amber-500 p-1">Hello HackerNews ...
			<form onSubmit={handleSubmit}>
				<div className="flex gap-2">
					<input type="text" ref={inputRef} />
				</div>

			</form>
		</div>
	)
}

export default Header;
