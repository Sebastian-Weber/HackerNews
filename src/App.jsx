import React from 'react';
import './App.css';
import HackerNews from './HackerNews';

function App() {
  return (
    <div className="my-4 md:my-8 lg:my-12 mx-auto max-w-[960px] bg-orange-100">
      <div className="bg-amber-500 p-1">Hello HackerNews ...</div>
      <div className="p-1">
        <HackerNews />
      </div>
    </div>
  );
}

export default App;
