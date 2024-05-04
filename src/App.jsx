import React from 'react';
import './App.css';
import BusySpinner from './components/BusySpinner';
import HackerNews from './components/HackerNews';
import HackerNewsSandbox from './components/HackerNewsSandbox';
import Header from './components/Header';
import ClarasApp from './components/ClarasApp';
import Tryout from './components/Tryout.jsx';


function App() {
  return (
    <>
      <div className="my-4 md:my-8 lg:my-12 mx-auto max-w-[960px] bg-sky-100">
        <div className="p-1">
          <Header />
          {/* <HackerNews /> */}
          <ClarasApp />
          {/* <HackerNewsSandbox /> */}
          {/* <BusySpinner /> */}
          <Tryout />
        </div>
      </div>
    </>
  );
}

export default App;

