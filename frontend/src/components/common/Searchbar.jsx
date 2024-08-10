import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
    return (
    <InputGroup >
        <FormControl
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="search-bar"
        />
        <InputGroup.Text className="search-icon">
            <FaSearch />
        </InputGroup.Text>
    </InputGroup>
    );
};

export default Searchbar;