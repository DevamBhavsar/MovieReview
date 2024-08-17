import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import NotFound from "./components/notFound/NotFound";
import { isLoggedIn } from "./api/api";

function App({ mode, colorMode }) {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const { exp } = JSON.parse(jsonPayload);
    return Date.now() >= exp * 1000;
  };

  const getMovies = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      console.log("Token in main component:", token);
      if (token) {
        const response = await api.get("/api/v1/movies");
        setMovies(response.data);
      } else {
        localStorage.removeItem("jwtToken");
        console.log("No token found, redirecting to login");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        console.log("Unauthorized access, redirecting to login");
        navigate("/login");
      }
    }
  };

  const getMovieData = async (movieId) => {
    try {
      if (isLoggedIn()) {
        const response = await api.get(`/api/v1/movies/${movieId}`);
        const singleMovie = response.data;
        setMovie(singleMovie);
        setReviews(singleMovie.reviews);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header mode={mode} toggleColorMode={colorMode.ToggleColorMode} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
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
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
