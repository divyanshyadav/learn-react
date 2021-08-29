import React from 'react';

export default function Pokemon({
	species: { name } = {},
	sprites: { front_default, back_default } = {},
	types,
	weight
} = {}) {
	if (!name) return null;

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
}
