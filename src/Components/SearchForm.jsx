import React, { useState } from 'react';

const SearchForm = ({ setMovies }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim() === '') return;

    fetch(`http://www.omdbapi.com/?s=${query}&apikey=8eab7f20`)
      .then((response) => {
        if (!response.ok) {
          setMovies([]);
          console.log("Error fetching the movie data.");
          return Promise.reject("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
          console.log("No movies found.");
        }
      })
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Enter movie name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
