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
	const [pointer, setPointer] = React.useState(-1);

	function handleChange({ target: { value } }) {
		setValue(value);
		setSuggestions(filter(items, value, itemValue));
		onChange(value);
	}

	function onSelectSuggestion(suggestion) {
		setValue(itemValue(suggestion));
		reset();
		onChange(suggestion);
	}

	function reset() {
		setSuggestions([]);
		setPointer(-1);
	}

	// const ref = React.useRef(null);

	function renderSuggestions() {
		if (suggestions.length === 0) return null;

		return (
			<ul
			// ref={ref}
			>
				{suggestions.map((s, idx) => {
					return (
						<li
							// ref={(ele) => {
							// 	if (ele && ref.current) {
							// 		if (pointer === idx) {
							// 			ref.current.scrollTop = ele.offsetTop;
							// 		}
							// 	}
							// }}
							key={itemValue(s)}
							onClick={() => onSelectSuggestion(s)}
							className={pointer === idx ? 'active' : ''}
							onMouseMove={() => setPointer(idx)}
						>
							{renderItem(s, value)}
						</li>
					);
				})}
			</ul>
		);
	}

	function handleFocus() {
		setSuggestions(filter(items, value, itemValue));
	}

	function handleBlur(e) {
		const currentTarget = e.currentTarget;

		setTimeout(() => {
			if (!currentTarget.contains(document.activeElement)) {
				reset();
			}
		}, 0);
	}

	function handleKeyDown(e) {
		if (e.keyCode === 38 && pointer > 0) {
			setPointer((state) => state - 1);
		} else if (e.keyCode === 40 && pointer < suggestions.length - 1) {
			setPointer((state) => state + 1);
		} else if (e.keyCode === 13 && pointer >= 0 && pointer < suggestions.length) {
			onSelectSuggestion(suggestions[pointer]);
		}
	}

	return (
		<div className="AutoCompleteText" onBlur={handleBlur} tabIndex="1">
			<input
				value={value}
				onChange={handleChange}
				onFocus={handleFocus}
				onKeyDown={handleKeyDown}
			/>
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
