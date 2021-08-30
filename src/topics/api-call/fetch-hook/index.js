import { useMemo, useReducer, useEffect } from 'react';
import fetch from './fetch';
import debounce from './debounce';

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

const useFetch = (url, { debounceWait = 0, ...options } = {}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const debouncedFetch = useMemo(() => debounce(callApi, debounceWait), [
		debounceWait
	]);

	useEffect(() => {
		if (state.startFetching) {
			debouncedFetch(url, options);
		}
	}, [url, state.startFetching, debouncedFetch, JSON.stringify(options)]);

	function callApi(url, options) {
		dispatch(actions.setStatus(STATUS.PENDING));
		fetch(url, options)
			.then((result) => {
				dispatch(actions.setData(result));
				dispatch(actions.setStatus(STATUS.RESOLVED));
			})
			.catch((error) => {
				if (error.name === 'AbortError') {
					return;
				}
				dispatch(actions.setError(error));
				dispatch(actions.setStatus(STATUS.REJECTED));
			});
	}

	return {
		...state,
		startFetching: () => dispatch(actions.setStartFetching(true))
	};
};

export default useFetch;
