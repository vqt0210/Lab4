import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Track search visibility

  
  useEffect(() => {
    if (searchTerm === '') {
      onSearch(''); 
    }
  }, [searchTerm, onSearch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (onSearch) {
        onSearch(searchTerm); 
      }
    }
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const closeSearchBar = () => {
    setIsSearchVisible(false); 
    setSearchTerm(''); 
  };

  return (
    <div className="top-navbar">
     
      {!isSearchVisible && <FontAwesomeIcon icon={faTv} className="icon" />}
      
      {!isSearchVisible && (
        <h2>
          Following | <span>For You</span>
        </h2>
      )}

      
      {!isSearchVisible && (
        <div className="search-icon" onClick={toggleSearchBar}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      )}

   
      {isSearchVisible && (
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyPress}
            placeholder="Search"
            className="search-input"
          />
          <FontAwesomeIcon
            icon={faTimes}
            className="close-icon"
            onClick={closeSearchBar} 
          />
        </div>
      )}
    </div>
  );
};

export default TopNavbar;