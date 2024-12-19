import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SavedList = () => {
  const { id } = useParams();
  const [list, setList] = useState(null);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem(id));
    if (savedList) {
      setList(savedList);
    }
  }, [id]);

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <div className="saved-list">
      <h1>{list.name}</h1>
      <ul>
        {list.movies.map((movie) => (
          <li key={movie.imdbID}>
            <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">
              {movie.Title} ({movie.Year})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedList;
