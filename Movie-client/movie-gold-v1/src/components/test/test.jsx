import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MovieIcon from "@mui/icons-material/Movie";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { getAllMovies, updateMovie, isLoggedIn } from "../../api/api";
import Header from "../header/Header";

export default function MovieFormCard({ mode, colorMode }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
        setMovies(data);
        if (data.length > 0) {
          setSelectedMovie(data[0]);
        }
        console.log("Fetched movies:", data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    if (isLoggedIn()) {
      fetchMovies();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleMovieSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedMovie(movies.find((movie) => movie.imdbId === selectedId));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedMovie((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateMovie(selectedMovie);
      alert("Movie updated successfully!");
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Failed to update movie.");
    }
  };

  const renderInputFields = () => {
    if (!selectedMovie) return null;

    const entries = Object.entries(selectedMovie).map(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        return (
          <TextField
            key={key}
            name={key}
            label={key}
            value={value.timestamp || ""}
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
        );
      } else if (Array.isArray(value)) {
        return (
          <TextField
            key={key}
            name={key}
            label={key}
            value={value.join(", ")}
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
        );
      } else {
        return (
          <TextField
            key={key}
            name={key}
            label={key}
            value={value || ""}
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
        );
      }
    });

    return entries;
  };

  return (
    <>
      {isLoggedIn() ? (
        <>
          <Header mode={mode} toggleColorMode={colorMode.ToggleColorMode} />
          <Container component="main" maxWidth="lg" sx={{ mt: 15 }}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <MovieIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Movie Information
              </Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel id="movie-select-label">Select Movie</InputLabel>
                <Select
                  labelId="movie-select-label"
                  value={selectedMovie?.imdbId || ""}
                  onChange={handleMovieSelect}
                  fullWidth
                  disabled={movies.length === 0}
                >
                  {movies.map((movie) => (
                    <MenuItem key={movie.imdbId} value={movie.imdbId}>
                      {movie.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  {renderInputFields()?.map((field, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      {field}
                    </Grid>
                  ))}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!selectedMovie}
                >
                  Save Movie
                </Button>
              </Box>
            </Box>
          </Container>
        </>
      ) : (
        <Typography variant="h6" align="center">
          Please log in to view this page.
        </Typography>
      )}
    </>
  );
}
