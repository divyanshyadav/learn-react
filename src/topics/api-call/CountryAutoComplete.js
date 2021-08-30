import React, { useMemo } from 'react';
import AutoCompleteText from '../components/AutoCompleteText';
import useFetch, { STATUS } from './fetch-hook';

export default function CountryAutoComplete() {
	const { data, status } = useFetch('https://restcountries.eu/rest/v2/');

	const countries = useMemo(() => {
		let items = [];
		if (status === STATUS.RESOLVED) {
			items = data.map((item) => item.name);
		}

		return items;
	}, [status, data]);

	return <AutoCompleteText items={countries} />;
}
