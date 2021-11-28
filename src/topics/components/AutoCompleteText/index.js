import React from 'react';
import { scroll } from './utils';
import './styles.css';

function AutoCompleteText({
  items,
  onChange,
  onFocus,
  defaultValue = '',
  renderItem,
  itemValue,
  ...rest
}) {
  const [value, setValue] = React.useState(defaultValue);
  const [suggestions, setSuggestions] = React.useState([]);
  const [pointer, setPointer] = React.useState(0);

  function onSelectSuggestion(suggestion) {
    setValue(itemValue(suggestion));
    reset();
    onChange(suggestion);
  }

  function reset() {
    setSuggestions([]);
    setPointer(0);
  }

  function renderSuggestions() {
    if (suggestions.length === 0) return null;

    return (
      <ul>
        {suggestions.map((s, idx) => {
          return (
            <li
              ref={(ele) => {
                if (ele) {
                  if (pointer === idx) {
                    scroll(ele);
                  }
                }
              }}
              key={itemValue(s)}
              onClick={() => onSelectSuggestion(s)}
              className={pointer === idx ? 'active' : ''}
              onMouseEnter={() => setPointer(idx)}
            >
              {renderItem(s, value)}
            </li>
          );
        })}
      </ul>
    );
  }

  function handleChange(event) {
    const { value } = event.target;
    setValue(value);
    reset();
    setSuggestions(filter(items, value, itemValue));
    onChange(value);
  }

  function handleFocus(event) {
    setSuggestions(filter(items, value, itemValue));
    onFocus(event);
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
    if ([38, 40].includes(e.keyCode)) {
      e.preventDefault();
    }

    if (e.keyCode === 38 && pointer > 0) {
      setPointer((state) => state - 1);
    } else if (e.keyCode === 40 && pointer < suggestions.length - 1) {
      setPointer((state) => state + 1);
    } else if (
      e.keyCode === 13 &&
      pointer >= 0 &&
      pointer < suggestions.length
    ) {
      onSelectSuggestion(suggestions[pointer]);
    }
  }

  return (
    <div className="AutoCompleteText" onBlur={handleBlur} tabIndex="1">
      <input
        {...rest}
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
  onChange: () => {},
  onFocus: () => {},
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
