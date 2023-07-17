import React, { useState } from 'react';
import './CustomSelect.css';

const CustomSelect = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleOptionClick = (option) => {
    if (option === 'Clear') {
      setSelectedOptions([]);
      setSearchQuery('');
      if (onChange) {
        onChange([]);
      }
    } else {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }

      if (onChange) {
        onChange([...selectedOptions, option]);
      }
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchQuery('');
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortOptions = (data, order) => {
    const sortedOptions = [...data];
    sortedOptions.sort((a, b) => {
      if (order === 'asc') {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    });
    return sortedOptions;
  };

  const filteredOptions = options
    .filter((option) => option.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const sortedOptions = sortOptions(filteredOptions, sortOrder);

  return (
    <div className="custom-select">
      <div className={`select-input ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        <div className="selected-options">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <span key={option} className="selected-option">
                {option}
              </span>
            ))
          ) : (
            <span className="placeholder">Select an option</span>
          )}
        </div>
        <div className={`dropdown-icon ${isOpen ? 'open' : ''}`}>&#9660;</div>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <div className="sort-order" onClick={handleSortOrderChange}>
            Sort Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </div>
          {sortedOptions.map((option) => (
            <div
              key={option}
              className={`dropdown-option ${selectedOptions.includes(option) ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
