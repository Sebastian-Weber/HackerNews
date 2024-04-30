import { useState } from "react";
import Header from "./components/Header.jsx";
import NewsList from "./components/NewsList.jsx";
import './App.css';

function App() {

	const [searchQuery, setSearchQuery] = useState('');
	const searchList = (formInput) => setSearchQuery(formInput);
	//const limitList = (selectValue) => setSearchQuery(selectValue);

  return (
		<div className="my-4 md:my-8 lg:my-12 mx-auto max-w-[960px] bg-orange-100">
			<Header searchList={searchList} />
			<NewsList searchQuery={searchQuery} />
		</div>
  )
}

export default App;
