
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {


  return (
	<>
    {/* HackerNews Header */}	
    <div className="flex flex-nowrap bg-gray-800" >
			<div class="my-4">
				{/* <img class="py-4 pr-2 pl-6 size-full md:size-auto" src="./src/assets/images/react-logo.svg"></img> */}
			</div>
			<h1 className="mb-4 pl-5 my-4 text-4xl font-sans font-regular leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white">Hacker|</h1>
			<h1 className="mb-4 my-4 py-1 text-4xl font-mono font-semibold leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white">News</h1>
		</div>

	</>	
  )
}

export default Header;
	
    
    
    
