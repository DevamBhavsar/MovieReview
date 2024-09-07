import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { MovieControllerService } from "./api-client/services/MovieControllerService";
import TokenService from "./api-client/token/tokenService";
import "./App.css";
import ActivateAccount from "./components/activateAccount/ActivateAccount";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import NotFound from "./components/notFound/NotFound";
import Reviews from "./components/reviews/Reviews";
import Trailer from "./components/trailer/Trailer";
function App({ mode, toggleColorMode }) {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const tokenService = useMemo(() => new TokenService(), []);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await tokenService.isTokenValid();
      setIsLoggedIn(isValid);
    };
    checkAuth();
  }, [tokenService]);

  const handleLogout = () => {
    tokenService.token = null;
    setIsLoggedIn(false);
    navigate("/login");
  };

  const getMovies = useCallback(async () => {
    console.log("Initiating API call to: /movies");
    try {
      const response = await MovieControllerService.getAllMovies();
      console.log("Raw response:", response);
      if (response && Array.isArray(response)) {
        console.log("Movies data received:", response);
        setMovies(response);
      } else if (response === undefined) {
        console.warn("Empty response received from server");
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const getMovieData = async (movieId) => {
    try {
      const response = await MovieControllerService.getMovieByImdbId(movieId);
      setMovie(response);
      setReviews(response.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Header mode={mode} toggleColorMode={toggleColorMode} />
      <nav>
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/tests">Movie Form</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
        <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
        <Route
          path="/Reviews/:movieId"
          element={
            <Reviews
              getMovieData={getMovieData}
              movie={movie}
              reviews={reviews}
              setReviews={setReviews}
            />
          }
        />
        <Route path="/activate-account" element={<ActivateAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

App.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default App;
