import { useState } from "react";
import Header from "./components/Header.jsx";
import NewsList from "./components/NewsList.jsx";
import './App.css';

function App() {

	const [searchQuery, setSearchQuery] = useState('');

	const searchList = (formInput) => setSearchQuery(formInput);
	const filterList = (tagname) => setSearchQuery(tagname)

	//const limitList = (selectValue) => setSearchQuery(selectValue);


  return (
		<>
			<div className="my-4 md:my-8 lg:my-12 mx-auto max-w-[960px]">
				<Header searchList={searchList} filterList={filterList} />
				<NewsList searchQuery={searchQuery} />
			</div>
		</>
  )
}

export default App;
