import React from 'react'

const Pagination = ({ postsPerPage, length, handlePagination, currentPage }) => {
    let paginationNumber = []
    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumber.push(i);
    }
    return (
        <>
        <br/>
        <div className='pagination justify-center'>
            {/* renders a horizontal bar */}				
			<div className="flex flex-nowrap">
                <br/>
                    {
                        paginationNumber.map((data) => (
                            <div className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                            <a key={data} onClick={() => handlePagination(data)} className={currentPage === data ? 'active' : ''}>
                                {data}
                            </a>
                            </div>
                        ))
                    }
            </div>
        </div>
        <br/>
        </>
    )
}
export default Pagination