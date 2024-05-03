import React from 'react';
import './App.css';
import BusySpinner from './components/BusySpinner';
import HackerNews from './components/HackerNews';
import HackerNewsSandbox from './components/HackerNewsSandbox';
import Header from './components/Header';
import Pagination from './components/Pagination';
import ClarasApp from './components/ClarasApp';

function App() {
  return (
    <>
      <div className="my-4 md:my-8 lg:my-12 mx-auto max-w-[960px] bg-orange-100">
        <div className="bg-amber-500 p-1">Thomas Hello HackerNews ...</div>
        <div className="p-1">
          <Header />
          {/* <HackerNews /> */}
          <ClarasApp />
          <HackerNewsSandbox />
          {/* <BusySpinner /> */}
          {/* <Pagination /> */}
        </div>
      </div>
    </>
  );
}

export default App;

