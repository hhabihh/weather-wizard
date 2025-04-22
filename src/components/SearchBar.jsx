import React, { useState } from "react";
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) onSearch(city);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input 
                autoFocus
                type="text" 
                placeholder="Enter City" 
                value={city} 
                onChange={(e) => setCity(e.target.value)}/>
            <button type="submit">Search</button>
        </form>
    );
}