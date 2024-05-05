import React from 'react'

const Pagination = ({ postsPerPage, length, handlePagination, currentPage }) => {
    let paginationNumber = []
    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumber.push(i);
    }
    return (
		<>
			<div className='pagination'>
				<div className="p-2 bg-sky-200" >
				{
					paginationNumber.map((data) => (
						<button key={data} onClick={() => handlePagination(data)} className={currentPage === data ? 'active' : ''}>
							{data}
						</button>
					))
				}
				</div>
			</div>
		</>
    )
}
export default Pagination