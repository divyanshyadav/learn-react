import { useMemo, useReducer, useEffect } from 'react';

export const STATUS = {
	IDEAL: 'ideal',
	PENDING: 'pending',
	RESOLVED: 'resolved',
	REJECTED: 'rejected'
};

const initialState = {
	status: STATUS.IDEAL,
	data: null,
	error: '',
	startFetching: false
};

const types = {
	SET_STATUS: 'UPDATE_STATUS',
	SET_ERROR: 'SET_ERROR',
	SET_DATA: 'SET_DATA',
	SET_START_FETCHING: 'SET_START_FETCHING'
};

const actions = {
	setStatus: (status) => ({ type: types.SET_STATUS, status }),
	setError: (error) => ({ type: types.SET_ERROR, error }),
	setData: (data) => ({ type: types.SET_DATA, data }),
	setStartFetching: (flag) => ({ type: types.SET_START_FETCHING, flag })
};

function reducer(state, action) {
	switch (action.type) {
		case types.SET_STATUS:
			return { ...state, status: action.status };
		case types.SET_ERROR:
			return { ...state, error: action.error };
		case types.SET_DATA:
			return { ...state, data: action.data };
		case types.SET_START_FETCHING:
			return { ...state, startFetching: action.flag };
		default:
			return state;
	}
}

const useFetch = (url, { debounceTime = 0, ...config } = {}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const customFetch = useMemo(() => debounce(callApi, debounceTime), [
		debounceTime
	]);

	function callApi(url, options) {
		dispatch(actions.setStatus(STATUS.PENDING));
		fetch(url, options)
			.then((response) => response.json())
			.then((result) => {
				dispatch(actions.setData(result));
				dispatch(actions.setStatus(STATUS.RESOLVED));
			})
			.catch((error) => {
				dispatch(actions.setError(error.message));
				dispatch(actions.setStatus(STATUS.REJECTED));
			});
	}

	useEffect(() => {
		if (state.startFetching) {
			customFetch(url, config);
		}
	}, [url]);

	return {
		...state,
		startFetching: () => dispatch(actions.setStartFetching(true))
	};
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
