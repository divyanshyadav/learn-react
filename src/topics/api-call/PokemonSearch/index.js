/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useFetch, { STATUS } from '../fetch-hook';
import Pokemon from './Pokemon';

function PokemonSearch() {
	const [pokemon, setPokemon] = React.useState('');
	const { status, data, error } = useFetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon}`,
		{
			debounceWait: 400
		}
	);

	const getContent = () => {
		switch (status) {
			case STATUS.IDEAL:
				return <div>Ideal</div>;
			case STATUS.PENDING:
				return <div>Loading...</div>;
			case STATUS.RESOLVED:
				return <Pokemon {...data} />;
			case STATUS.REJECTED:
				return <div>{error.message}</div>;
			default:
				return null;
		}
	};

	const handleOnChange = (event) => {
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
			{getContent()}
		</div>
	);
}

export default PokemonSearch;
