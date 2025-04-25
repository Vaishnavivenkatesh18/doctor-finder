import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ searchTerm, onSearchChange, doctors }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

const handleInputChange = (e) => {
    const value = e.target.value;
    onSearchChange(value);
    
    if (value.trim() === '') {
        setSuggestions([]);
        setIsOpen(false);
        return;
    }
    
    const filtered = doctors
        .filter(doctor => doctor.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3)
        .map(doctor => doctor.name);
    
    setSuggestions(filtered);
    setIsOpen(filtered.length > 0);
};

const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setIsOpen(false);
};

const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        setIsOpen(false);
    }
};

return (
    <div className="search-container" ref={searchRef}>
    <input
        type="text"
        className="search-input"
        placeholder="Search doctors by name..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        data-testid="autocomplete-input"
    />
    {isOpen && (
        <ul className="suggestion-list">
        {suggestions.map((suggestion, index) => (
            <li
            key={index}
            className="suggestion-item"
            onClick={() => handleSuggestionClick(suggestion)}
            data-testid="suggestion-item"
            >
            {suggestion}
            </li>
        ))}
        </ul>
    )}
    </div>
    );
};

export default SearchBar;