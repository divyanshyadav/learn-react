import React from 'react';
import './styles.css';

function filter(items, value) {
	let suggestions = [];

	if (value) {
		const regex = new RegExp(`^${value.toLowerCase()}`);
		suggestions = items.sort().filter((item) => regex.test(item.toLowerCase()));
	}

	return suggestions;
}

function AutoCompleteText({ items, onChange, initialValue = '' }) {
	const [value, setValue] = React.useState(initialValue);
	const [suggestions, setSuggestions] = React.useState([]);

	function handleChange({ target: { value } }) {
		setValue(value);
		setSuggestions(filter(items, value));
		onChange(value);
	}

	function onSelectSuggestion(suggestion) {
		setValue(suggestion);
		setSuggestions([]);
		onChange(suggestion);
	}

	function handleFocus() {
		setSuggestions(filter(items, value));
	}

	function renderSuggestions() {
		return (
			<ul>
				{suggestions.map((s) => (
					<li key={s} onClick={() => onSelectSuggestion(s)}>
						{s}
					</li>
				))}
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

AutoCompleteText.defaultProps = {
	items: ['Abc', 'abf'],
	onChange: () => {}
};

export default AutoCompleteText;
