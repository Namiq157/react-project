import React from 'react';

const SelectedMovies = ({ movies, onRemove }) => {
  return (
    <div className="selected-movies">
      <h2>Seçilmiş Filmlər</h2>
      {movies.length === 0 ? (
        <p>Heç bir film seçilməyib.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID} className="movie-item">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : null}  // Poster olub olmadığını yoxlanılır
                alt={movie.Title}
                className="movie-poster"
              />
              {!movie.Poster || movie.Poster === "N/A" ? (
                <p>No Poster Available</p>
              ) : null}
              <span>{movie.Title} ({movie.Year})</span>
              <button onClick={() => onRemove(movie.imdbID)}>Sil</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedMovies;
