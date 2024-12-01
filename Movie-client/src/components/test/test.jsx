import MovieIcon from "@mui/icons-material/Movie";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { MovieControllerService } from "../../api-client";
import TokenService from "../../api-client/token/tokenService";
import Header from "../header/Header";
import LoadingScreen from "../loadingScreen/LoadingScreen";
const VirtuosoTableComponents = {
  Scroller: React.forwardRef(function Scroller(props, ref) {
    return <TableContainer component={Paper} {...props} ref={ref} />;
  }),
  VirtuosoTable: function VirtuosoTable(props) {
    return (
      <table
        {...props}
        style={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    );
  },
  TableHead,
  TableRow,
  TableBody: React.forwardRef(function VirtuosoTableBody(props, ref) {
    return <TableBody {...props} ref={ref} />;
  }),
};
const tokenService = new TokenService();
VirtuosoTableComponents.Scroller.displayName = "VirtuosoScroller";
VirtuosoTableComponents.VirtuosoTable.displayName = "VirtuosoTable";
VirtuosoTableComponents.TableBody.displayName = "VirtuosoTableBody";

// Define the columns array before it's used

const columns = [
  { width: 120, label: "IMDB ID", dataKey: "imdbId" },
  { width: 200, label: "Title", dataKey: "title" },
  { width: 120, label: "Release Date", dataKey: "releaseDate" },
  { width: 120, label: "Trailer Link", dataKey: "trailerLink" },
  { width: 120, label: "Poster", dataKey: "poster" },
  { width: 120, label: "Genres", dataKey: "genres" },
  { width: 120, label: "Backdrop", dataKey: "backdrop" },
];

const MovieFormCard = ({ mode, colorMode }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedRows, setEditedRows] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await MovieControllerService.getAllMovies();
        setMovies(response);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch movies");
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await tokenService.isTokenValid();
      console.log("IS valid : ", isValid);
      setIsLoggedIn(isValid);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
      const response = await MovieControllerService.updateMovie(
        selectedMovie.imdbId,
        selectedMovie
      );
      setSelectedMovie(response);
      alert("Movie updated successfully!");
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Failed to update movie.");
    }
  };

  const renderInputFields = () => {
    if (!selectedMovie) return null;

    return Object.entries(selectedMovie).map(([key, value]) => {
      const fieldValue =
        typeof value === "object" && value !== null
          ? JSON.stringify(value)
          : value;
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
          <TextField
            name={key}
            label={key}
            value={fieldValue || ""}
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
        </Grid>
      );
    });
  };

  const fixedHeaderContent = () => (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? "right" : "left"}
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
      <TableCell variant="head" align="center">
        Actions
      </TableCell>
    </TableRow>
  );

  const handleCellEdit = (imdbId, dataKey, value) => {
    setEditedRows((prev) => ({
      ...prev,
      [imdbId]: {
        ...prev[imdbId],
        [dataKey]: value,
      },
    }));
  };

  const handleSaveRow = async (imdbId) => {
    const updatedMovie = {
      ...movies.find((m) => m.imdbId === imdbId),
      ...editedRows[imdbId],
    };
    try {
      const response = await MovieControllerService.updateMovie(
        imdbId,
        updatedMovie
      );
      setMovies(movies.map((m) => (m.imdbId === imdbId ? response : m)));
      setEditedRows((prev) => {
        const { [imdbId]: _, ...rest } = prev;
        return rest;
      });
      alert("Movie updated successfully!");
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Failed to update movie.");
    }
  };

  const rowContent = (_index, row) => (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? "right" : "left"}
        >
          <TextField
            value={
              editedRows[row.imdbId]?.[column.dataKey] ?? row[column.dataKey]
            }
            onChange={(e) =>
              handleCellEdit(row.imdbId, column.dataKey, e.target.value)
            }
            fullWidth
          />
        </TableCell>
      ))}
      <TableCell align="center">
        <Button onClick={() => handleSaveRow(row.imdbId)}>Save</Button>
      </TableCell>
    </React.Fragment>
  );

  return (
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
              {renderInputFields()}
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
        <Paper style={{ height: 400, width: "100%", marginTop: 20 }}>
          <TableVirtuoso
            data={movies}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </Container>
    </>
  );
};

MovieFormCard.propTypes = {
  mode: PropTypes.string.isRequired,
  colorMode: PropTypes.object.isRequired,
};

export default MovieFormCard;
