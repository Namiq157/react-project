const MovieList = ({ movies, onAdd }) => {
    return (
      <div className="movie-list">
        <h2>Tapılan Filmlər</h2>
        {movies.length === 0 ? (
          <p>Heç bir film tapılmadı.</p>
        ) : (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID} className="movie-item">
                <img
                  src={movie.Poster !== "N/A" && movie.Poster ? movie.Poster : null}
                  alt={movie.Title}
                  className="movie-poster"
                />
                {movie.Poster === "N/A" || !movie.Poster ? (
                  <p>No Poster Available</p>
                ) : null}
  
                <span>{movie.Title} ({movie.Year})</span>
                <button onClick={() => onAdd(movie)}>Əlavə et</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default MovieList;
  