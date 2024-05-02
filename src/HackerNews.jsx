import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HackerNews() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://hn.algolia.com/api/v1/search?tags=story');
        setArticles(response.data.hits);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  return (
    <div>
      {selectedArticle ? (
        <ArticleDetail article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Top Stories from Hacker News</h1>
          <div className="grid gap-4">
            {articles.map(article => (
              <div key={article.objectID} className="bg-white p-4 shadow rounded" onClick={() => handleArticleClick(article)}>
                <h2 className="text-xl font-semibold hover:underline">{article.title}</h2>
                <p className="text-gray-600">Author: {article.author}</p>
                <p className="text-gray-600">Published: {new Date(article.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ArticleDetail({ article, onClose }) {
  return (
    <div>
      <h1>{article.title}</h1>
      <p>Author: {article.author}</p>
      <p>Points: {article.points}</p>
      <p>Published: {new Date(article.created_at).toLocaleString()}</p>
      <p>{article.story_text}</p>
      <p><a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
      <button onClick={onClose}>Back to List</button>
    </div>
  );
}

export default HackerNews;
