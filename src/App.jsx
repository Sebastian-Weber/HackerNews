import './App.css';
import { useState } from "react";
import Header from "./components/Header.jsx";
import NewsList from "./components/NewsList.jsx";
import Pagination from './components/Pagination.jsx';
import Tryout from './components/TRYOUT/Tryout.jsx';

function App() {

	const [searchQuery, setSearchQuery] = useState('');

	const searchList = (formInput) => setSearchQuery(formInput);
	const filterList = (tagname) => setSearchQuery(tagname)

	//const limitList = (selectValue) => setSearchQuery(selectValue);


  return (
		<>
			<div className="my-0 md:my-0 lg:my-0 mx-auto max-w-[960px]">
				<Header searchList={searchList} filterList={filterList} />
				<NewsList searchQuery={searchQuery} />
				{/* <Pagination/> */}
				{/* <Tryout/> */}
			</div>
		</>
  )
}

export default App;
