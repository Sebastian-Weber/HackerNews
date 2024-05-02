import React, { useState, useEffect } from 'react';
import { SpinnerCircular, 
	SpinnerCircularFixed, 
	SpinnerCircularSplit, 
	SpinnerDiamond, 
	SpinnerDotted, 
	SpinnerInfinity, 
	SpinnerRound, 
	SpinnerRoundFilled, 
	SpinnerRoundOutlined } from 'spinners-react';


function MyBusySpinner() {
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    setIsBusy(true);
    fetchData().then(() => setIsBusy(false));
  }, []);

  return (
    <div>
      {isBusy && <SpinnerDotted type="Circles" color="#61dafb" height={80} width={80} />}
      {/* other components */}
    </div>
  );
}

function fetchData() {
  // simulate async data fetching
  return new Promise((resolve) => setTimeout(resolve, 2000));
}