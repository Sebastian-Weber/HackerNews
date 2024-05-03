
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {


  return (
	<>
    {/* ReactNews Header */}	
    	<div className="flex flex-nowrap bg-gray-800" >
			<div class="items-center" >
				<img class="py-4 pr-2 pl-4 size-full md:size-auto" src="./src/assets/images/react-logo.svg"></img>
			</div>

			<h1 className="mb-4 my-4 text-4xl font-sans font-regular leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white">React|</h1>
			<h1 className="mb-4 my-4 pt-1 text-4xl font-mono font-semibold leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white">News</h1>
		</div>

	</>	
  )
}

export default Header;
	
    
    
    
