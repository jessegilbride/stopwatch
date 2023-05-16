import { useState, useRef } from 'react';

export default function Stopwatch() {
	const [startTime, setStartTime] = useState(null);
	const [now, setNow] = useState(null);
	const [stopped, setStopped] = useState(null);
	const [holdTime, setHoldTime] = useState(0);

	let secondsPassed = 0;

	// interval to be set or cleared
	let interval;

	// get a reference to the start button to enable/disable it
	const startButtonRef = useRef(null);

	function doCount() {
		setNow(Date.now());
	}

	function handleStart() {
		setStopped(false);
		// disable the start button
		startButtonRef.current.disabled = true;
		// Start counting
		setStartTime(Date.now());
		setNow(Date.now());

		interval = setInterval(doCount, 10);
	}

	function handleStop() {
		setHoldTime(secondsPassed);
		clearInterval(interval);
		setStopped(true);
	}

	function handleReset() {
		setStartTime(null);
		setNow(null);
		setHoldTime(0);
		secondsPassed = 0;
		// enable the start button
		startButtonRef.current.disabled = false;
	}

	// updates to secondsPassed
	if (startTime != null && now != null && stopped === false) {
		secondsPassed = (now - startTime) / 1000;
	} else if (stopped === true) {
		secondsPassed = holdTime;
	}

	return (
		<>
			<h2 className="counter">{secondsPassed.toFixed(3)}</h2>
			<div className="button-container">
				<button
					onClick={handleStart}
					className="startButton"
					ref={startButtonRef}
				>
					Start
				</button>
				<button onClick={handleStop}>Stop</button>
				<button onClick={handleReset}>Reset</button>
			</div>
		</>
	);
}
