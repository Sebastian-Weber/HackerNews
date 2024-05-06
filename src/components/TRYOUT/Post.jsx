import React from 'react'

const Post = ({ posts, loading }) => {
    if (loading) {
        return (
            <h1>Loading.....</h1>
        )
    }
    return (
        <>
            <br/>
            {posts.map((data, index) => (
                <div className='list justify-center' key={index}>
                    <p className='text-left'>{data.title}</p>
                </div>
            ))}
        </>
    )
}

export default Post