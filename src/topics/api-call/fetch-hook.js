import React from 'react';

export const STATUS = {
	IDEAL: 'ideal',
	PENDING: 'pending',
	RESOLVED: 'resolved',
	REJECTED: 'rejected'
};

const useFetch = (url, { debounceTime = 0, ...rest } = {}) => {
	const [status, setStatus] = React.useState(STATUS.IDEAL);
	const [data, setData] = React.useState({});
	const [error, setError] = React.useState('');
	const [startFetch, setStartFetch] = React.useState(false);
	const debounceOnFetch = React.useCallback(
		debounce(getDetails, debounceTime),
		[]
	);

	function getDetails(url, options) {
		setStatus(STATUS.PENDING);
		fetch(url, options)
			.then((response) => response.json())
			.then((result) => {
				setData(result);
				setStatus(STATUS.RESOLVED);
			})
			.catch((error) => {
				setError(error.message);
				setStatus(STATUS.REJECTED);
			});
	}

	React.useEffect(() => {
		if (startFetch) {
			debounceOnFetch(url, rest);
		}
	}, [url]);

	return { status, data, error, startFetch: () => setStartFetch(true) };
};

// ------------------utils----------------------

/* 
    What is debouncing?
    Debouncing a function ensures that it doesn't get called too frequently
*/
function debounce(fn, timeout) {
	let timer;
	var controller;
	return function (...args) {
		if (controller) controller.abort();
		controller = new AbortController();
		clearTimeout(timer);

		timer = setTimeout(() => {
			let signal = controller.signal;

			fn(args[0], { signal, ...args[1] });
		}, timeout);
	};
}

export default useFetch;
