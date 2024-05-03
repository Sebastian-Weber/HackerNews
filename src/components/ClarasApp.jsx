import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { SpinnerCircular } from 'spinners-react';

function ClarasApp() {

//  Variable for news entries
  const [newsEntries, setNewsEntries] = useState([]);

  // Variable for Error message
  const [error, setError] = useState(null);

  // Variable for loading BusySpinner
  const [loading, setLoading] = useState(true);

  // Variable for Menu items
  const [menuItems] = useState([
    { name: "HackerNews", url: "http://hn.algolia.com/api/v1/search?tags=front_page" },
    { name: "new |", url: "http://hn.algolia.com/api/v1/search?tags=story" },
    { name: "past |", url: "http://hn.algolia.com/api/v1/search?tags=ask_hn" }
  ]);

  // Variable for selected menu
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0].name);

  // variable for Pagination current page
  const [currentPage, setCurrentPage] = useState(1);

   // variable for Pagination items oer page
  const [itemsPerPage] = useState(30);

  // UseEffect for loading BusySpinner while fetching Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulating a delay of 3 seconds before fetching data
        await new Promise(resolve => setTimeout(resolve, 3000));
        const response = await axios.get(menuItems.find(item => item.name === selectedMenu).url);
        setNewsEntries(response.data.hits);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedMenu, menuItems]);


  // Pagination
  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
    setCurrentPage(1);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsEntries.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(newsEntries.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const getCommentCount = async (objectID) => {
    try {
      const response = await axios.get(`https://hn.algolia.com/api/v1/items/${objectID}`);
      const commentCount = response.data.children.length;
      console.log(`ObjectID: ${objectID}, Comment Count: ${commentCount}`);
    } catch (error) {
      console.error("Error fetching comment count:", error);
    }
  };

  const newsList = (
    <div className="list-container">

      {/* Generate card layout for entry */}
      {currentItems.map(entry => (
         <div className="p-6 my-3 mx-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          {/* Generate heading with link for entry */}
            <div key={entry.objectID} className="news-item">
            <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              <a
                href={entry.url}
                target="_blank"
                className="news-link"
                key={entry.objectID}
                onClick={() => getCommentCount(entry.objectID)}
              >
                {entry.title}
              </a>
            </h5>
            <br/>
              <p className="font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis a minus quae aspernatur, commodi sunt suscipit iure laboriosam ab minima saepe aut necessitatibus autem ullam illum recusandae ut ducimus eum.</p>
              
              <br/>
              {/* Generate button bar */}
              <div className="flex flex-nowrap justify-between">

                {/* Read more button */}
                  <a href={entry.url}
                  target="_blank"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800" 
                  key={entry.objectID}
                  onClick={() => getCommentCount(entry.objectID)}>Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                  </a>

                  {/* Comments button */}
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                    Comments {entry.num_comments}
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" d="M0-15H16V-4H5.711L2-.289V-4H0ZM15-5v-9H1v9H3v2.289L5.289-5Z"/>
                      </svg>
                    </a>

                  {/* More from this author button */}
                  <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                  {entry.author}
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" d="M10.391,9.4a6.693,6.693,0,0,1,1.918,1.027,6.785,6.785,0,0,1,1.453,1.527,6.964,6.964,0,0,1,.918,1.9A7.2,7.2,0,0,1,15,16H14a6.127,6.127,0,0,0-.457-2.379,5.752,5.752,0,0,0-3.164-3.164,6.349,6.349,0,0,0-3.988-.246,6.029,6.029,0,0,0-1.441.6,5.86,5.86,0,0,0-2.141,2.141,6.029,6.029,0,0,0-.6,1.441A6.089,6.089,0,0,0,2,16H1a7.009,7.009,0,0,1,1.258-4.039,6.865,6.865,0,0,1,1.457-1.516,7.09,7.09,0,0,1,1.91-1.039,4.913,4.913,0,0,1-1.094-.8,4.964,4.964,0,0,1-.824-1.043A5.121,5.121,0,0,1,3.184,6.34a5.027,5.027,0,0,1,.207-3.289A5,5,0,0,1,6.051.391a5.059,5.059,0,0,1,3.9,0,5,5,0,0,1,2.66,2.66,5.015,5.015,0,0,1,.207,3.285,5.066,5.066,0,0,1-.523,1.219,5.172,5.172,0,0,1-.82,1.043A4.837,4.837,0,0,1,10.391,9.4ZM4,5a3.851,3.851,0,0,0,.316,1.555A4.052,4.052,0,0,0,6.445,8.684a3.978,3.978,0,0,0,3.109,0,4.052,4.052,0,0,0,2.129-2.129A3.851,3.851,0,0,0,12,5a3.851,3.851,0,0,0-.316-1.555A4.052,4.052,0,0,0,9.555,1.316a3.978,3.978,0,0,0-3.109,0A4.052,4.052,0,0,0,4.316,3.445,3.851,3.851,0,0,0,4,5Z"/>
                      </svg>
                    </a>

                  {/* Tags button */}
                  <a className="inline-flex items-center mx-4 px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                  Tags: {entry._tags}
                  </a>

                </div>
                <br/>

                 {/* generate card footer*/}
                <div className="flex flex-nowrap justify-between">

                  {/* Created at */}
                  <a className="font-normal text-gray-400 dark:text-gray-400">
                  Published at: {entry.created_at}
                  </a>

                  {/* Last Update */}
                  <a className="font-normal text-gray-400 dark:text-gray-400">
                  Last update: {entry.updated_at}
                  </a>
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                     <path stroke="currentColor" d="M12.727,6.008a3.492,3.492,0,0,1,2.324,1.1,3.573,3.573,0,0,1,.7,1.09,3.484,3.484,0,0,1-.023,2.668,3.528,3.528,0,0,1-1.859,1.859A3.376,3.376,0,0,1,12.5,13H10V12h2.5a2.449,2.449,0,0,0,.973-.2A2.489,2.489,0,0,0,14.8,10.473a2.52,2.52,0,0,0,0-1.945A2.489,2.489,0,0,0,13.473,7.2a2.509,2.509,0,0,0-1.25-.18,2.332,2.332,0,0,0-.27.047,3.335,3.335,0,0,0-.383-1.215,3.578,3.578,0,0,0-.766-.969A3.511,3.511,0,0,0,9.75,4.234,3.374,3.374,0,0,0,8.5,4a3.409,3.409,0,0,0-1.055.164A3.5,3.5,0,0,0,5.234,6.273,2.885,2.885,0,0,0,4,6a2.915,2.915,0,0,0-1.168.234,3.023,3.023,0,0,0-1.6,1.6,3.018,3.018,0,0,0,0,2.332,3.033,3.033,0,0,0,1.6,1.6A2.915,2.915,0,0,0,4,12H7v1H4a3.851,3.851,0,0,1-1.555-.316A4.052,4.052,0,0,1,.316,10.555a3.978,3.978,0,0,1,0-3.109A4.052,4.052,0,0,1,2.445,5.316,3.917,3.917,0,0,1,4.727,5.07a4.6,4.6,0,0,1,.727-.859,4.652,4.652,0,0,1,.9-.652,4.45,4.45,0,0,1,1.031-.414,4.4,4.4,0,0,1,2.488.074,4.618,4.618,0,0,1,1.219.613,4.458,4.458,0,0,1,1.637,2.176Zm-2.578,4.844L9,9.711V15H8V9.711L6.852,10.852l-.7-.7L8.5,7.8l2.352,2.352Z"/>
                  </svg>

                </div>

              <br/>
          </div>
        </div>
      ))}
    </div>
  );

  const errorMessage = (
    <div className="error-message">{error}</div>
  );

  return (
	<>

    {/* Separator */}	
    <div className="flex flex-nowrap bg-orange-400" >
			<div class="my-4">
			</div>
			<h1 className="mb-4 pl-5 my-4 text-4xl font-sans font-regular leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">Clara's App</h1>
		</div>

    <div className="app-container">
      {!loading && (
        <nav className="header">
          {menuItems.map(item => (
            <a
              key={item.name}
              className={`menu-item ${selectedMenu === item.name ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.name)} 
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}
      <div className="content">
        {loading ? (
          <div className="loading-container">
            <SpinnerCircular color="#3E2A2A" thickness={100} size={60} />
          </div>
        ) : (
          <>
            {!error ? newsList : errorMessage}
            <div className="pagination" >
              {pageNumbers.map(number => (
                <div key={number} className="page-number" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => paginate(number)}>
                  {number}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>

    </>
  );
}
export default ClarasApp;