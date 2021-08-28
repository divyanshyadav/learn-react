/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

/* 
    What is debouncing?
    Debouncing a function ensures that it doesn't get called too frequently
*/

function debounce(fn, timeout) {
	let timer;

	return function (...args) {
		clearTimeout(timer);

		timer = setTimeout(() => {
			fn.apply(this, args);
		}, timeout);
	};
}

const STATUS = {
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

const POKEMON_SEARCH_API = 'https://pokeapi.co/api/v2/pokemon';

function PokemonSearch() {
	const [pokemon, setPokemon] = React.useState('');
	const { status, data, startFetch } = useFetch(
		`${POKEMON_SEARCH_API}/${pokemon}`,
		{
			debounceTime: 400
		}
	);

	const renderPokemon = () => {
		const {
			species: { name } = {},
			sprites: { front_default, back_default } = {},
			types,
			weight
		} = data;

		if (!name) return;

		return (
			<div>
				<img src={front_default} alt={`${name}-front`} height="200" />
				<img src={back_default} alt={`${name}-back`} height="200" />
				<div>
					<div>
						<strong>Name:</strong> {name}
					</div>
					<div>
						<strong>Type:</strong> {types.map((t) => t.type.name).join(', ')}
					</div>
					<div>
						<strong>Weight:</strong> {weight}
					</div>
				</div>
			</div>
		);
	};

	const getContent = () => {
		switch (status) {
			case STATUS.IDEAL:
				return <div>Ideal</div>;
			case STATUS.PENDING:
				return <div>Loading...</div>;
			case STATUS.RESOLVED:
				return renderPokemon();
			case STATUS.REJECTED:
				return <div>{`Not found`}</div>;
			default:
				return <div>Unknown Status</div>;
		}
	};

	const handleOnChange = (event) => {
		startFetch();
		setPokemon(event.target.value);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="eg. bulbasaur, charizard"
				value={pokemon}
				onChange={handleOnChange}
			/>
			<input
				type="text"
				placeholder={'any pokemon name!'}
				value={pokemon}
				onChange={handleOnChange}
			/>
			{getContent()}
		</div>
	);
}

export default PokemonSearch;
