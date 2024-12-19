import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchForm from './Components/SearchForm';
import MovieList from './Components/MovieList';
import SelectedMovies from './Components/SelectedMovies';
import SavedList from './Components/SavedList';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [listId, setListId] = useState(null);

  useEffect(() => {
    const defaultMovies= [
      { imdbID: 'tt0111161', Title: 'The Shawshank Redemption', Year: '1994', Poster: 'https://img.omdbapi.com/?apikey=8eab7f20&i=tt0111161' },
      { imdbID: 'tt0068646', Title: 'The Godfather', Year: '1972', Poster: 'https://img.omdbapi.com/?apikey=8eab7f20&i=tt0068646' },
      { imdbID: 'tt0071562', Title: 'The Godfather: Part II', Year: '1974', Poster: 'https://img.omdbapi.com/?apikey=8eab7f20&i=tt0071562' },
      { imdbID: 'tt0468569', Title: 'The Dark Knight', Year: '2008', Poster: 'https://img.omdbapi.com/?apikey=8eab7f20&i=tt0468569' },
      { imdbID: 'tt0050083', Title: '12 Angry Men', Year: '1957', Poster: 'https://img.omdbapi.com/?apikey=8eab7f20&i=tt0050083' },
      { imdbID: 'tt0108052', Title: 'Schindler\'s List', Year: '1993', Poster: 'https://img.omdbapi.com/?apikey=8eab7f20&i=tt0108052' },
      { imdbID: 'tt0167260', Title: 'The Lord of the Rings: The Return of the King', Year: '2003', Poster: 'https://img.omdbapi.com/?apikey=8eab7f20&i=tt0167260' },
      { imdbID: 'tt0137523', Title: 'Fight Club', Year: '1999', Poster: 'https://img.omdbapi.com/?apikey=8eab7f20&i=tt0137523' },
      { imdbID: 'tt0109830', Title: 'Forrest Gump', Year: '1994', Poster: 'https://img.omdbapi.com/?apikey=8eab7f20&i=tt0109830' },
      { imdbID: 'tt1375666', Title: 'Inception', Year: '2010', Poster: 'https://img.omdbapi.com/?apikey=8eab7f20&i=tt1375666' }
    ];
    setMovies(defaultMovies);
  }, []);

  const handleAddMovie = (movie) => {
    if (!selectedMovies.some((m) => m.imdbID === movie.imdbID)) {
      setSelectedMovies((prevMovies) => [...prevMovies, movie]);
    }
  };

  const handleRemoveMovie = (id) => {
    setSelectedMovies((prevMovies) => prevMovies.filter((movie) => movie.imdbID !== id));
  };

  const handleSaveList = () => {
    if (selectedMovies.length === 0) {
      return alert('Siyahıda heç bir film yoxdur!');
    }
  
    const newListId = Date.now();
    
    // Save the list with its movies to localStorage
    localStorage.setItem(newListId, JSON.stringify({ name: 'Mənim Filmlərim', movies: selectedMovies }));
  
    setListId(newListId);
  };
  

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <h1>Film Siyahısı Tərtibçisi</h1>
              <SearchForm setMovies={setMovies} />
              <div className="main-content">
                <MovieList movies={movies} onAdd={handleAddMovie} />
                <SelectedMovies movies={selectedMovies} onRemove={handleRemoveMovie} />
              </div>
              {listId ? (
                <div className="saved-link">
                  <p>
                    Siyahınız yaradıldı: <a href={`/list/${listId}`}>Siyahıya keçid</a>
                  </p>
                </div>
              ) : (
                <button onClick={handleSaveList} className="save-button">
                  Siyahını yadda saxla
                </button>
              )}
            </div>
          }
        />
        <Route path="/list/:id" element={<SavedList />} />
      </Routes>
    </Router>
  );
};

export default App;
