import React from 'react';
import './styles.css';

function AutoCompleteText({
	items,
	onChange,
	initialValue = '',
	renderItem,
	itemValue
}) {
	const [value, setValue] = React.useState(initialValue);
	const [suggestions, setSuggestions] = React.useState([]);

	function handleChange({ target: { value } }) {
		setValue(value);
		setSuggestions(filter(items, value, itemValue));
		onChange(value);
	}

	function onSelectSuggestion(suggestion) {
		setValue(itemValue(suggestion));
		setSuggestions([]);
		onChange(suggestion);
	}

	function handleFocus() {
		setSuggestions(filter(items, value, itemValue));
	}

	function renderSuggestions() {
		return (
			<ul>
				{suggestions.map((s) => {
					return (
						<li key={s} onClick={() => onSelectSuggestion(s)} tabIndex="0">
							{renderItem(s, value)}
						</li>
					);
				})}
			</ul>
		);
	}

	return (
		<div className="AutoCompleteText" onFocus={handleFocus}>
			<input value={value} onChange={handleChange} />
			{renderSuggestions()}
		</div>
	);
}

function filter(items, value, itemValue) {
	let suggestions = [];

	if (value) {
		const regex = new RegExp(`^${value}`, 'i');
		suggestions = items.sort().filter((item) => regex.test(itemValue(item)));
	}

	return suggestions;
}

AutoCompleteText.defaultProps = {
	items: [],
	onChange: (value) => {},
	renderItem: (item, value) => {
		return (
			<div>
				<strong>{value}</strong>
				{item.slice(value.length)}
			</div>
		);
	},
	itemValue: (item) => item
};

export default AutoCompleteText;
