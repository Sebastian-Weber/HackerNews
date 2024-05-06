import { useEffect, useState } from 'react'
import Pagination from './Pagination.jsx';
import Post from './Post.jsx';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {

        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        // const response = await fetch("https://hn.algolia.com/api/v1/");
        
        const data = await response.json();
        setPosts(data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  }, [])

  const indexOfLastPost = currentPage * postsPerPge;
  const indexOfFirstPost = indexOfLastPost - postsPerPge;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <>
        <Post posts={currentPosts} loading={loading} />
        <Pagination length={posts.length} postsPerPage={postsPerPge} handlePagination={handlePagination} currentPage={currentPage} />
      </>

  )
}

export default App