import React, { useMemo } from 'react';
import AutoCompleteText from '../components/AutoCompleteText';
import useFetch, { STATUS } from './fetch-hook';

export default function CountryAutoComplete() {
	const { data, status } = useFetch('https://restcountries.eu/rest/v2/');

	const countries = useMemo(() => {
		let items = [];
		if (status === STATUS.RESOLVED) {
			items = data;
		}

		return items;
	}, [status, data]);

	return (
		<AutoCompleteText
			items={countries}
			itemValue={(item) => item.name}
			renderItem={(item, value) => {
				return (
					<div>
						<img src={item.flag} alt="flag" height={20} />{' '}
						<strong>{item.name.slice(0, value.length)}</strong>
						{item.name.slice(value.length)}
					</div>
				);
			}}
		/>
	);
}
