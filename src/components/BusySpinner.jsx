
import { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerCircular, 
	SpinnerCircularFixed, 
	SpinnerCircularSplit, 
	SpinnerDiamond, 
	SpinnerDotted, 
	SpinnerInfinity, 
	SpinnerRound, 
	SpinnerRoundFilled, 
	SpinnerRoundOutlined } from 'spinners-react';


function BusySpinner() {


	// Busy Spinner ON/OFF 
	// const [isBusy, setIsBusy] = useState(false);

	// useEffect(() => {
	// 	setIsBusy(true);
	// 	fetchData().then(() => setIsBusy(false));
	//   }, []);


  return (
	<>

		{/* Busy spinners in grid with 3 columns and 3 rows  */}
		<div className="grid grid-cols-3 grid-rows-3 gap-3 mx-auto max-w-[960px] bg-sky-200">
			<div ><SpinnerCircular /></div>
			<div ><SpinnerCircularFixed /></div>
			<div ><SpinnerCircularSplit /></div>
			<div className="col-start-3 row-start-2"><SpinnerRound /></div>
			<div className="col-start-2 row-start-2"><SpinnerRoundOutlined /></div>
			<div className="col-start-1 row-start-2"><SpinnerRoundFilled /></div>
			<div className="row-start-3"><SpinnerDotted /></div>
			<div className="row-start-3"><SpinnerInfinity /></div>
			<div className="row-start-3"><SpinnerDiamond /></div> 
		</div>

	</>	
  )
}

export default BusySpinner;
