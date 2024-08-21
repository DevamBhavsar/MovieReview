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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

export default function MovieFormCard({ mode, colorMode }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedRows, setEditedRows] = useState({});
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
    fetchMovies();
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

  const columns = [
    { width: 120, label: "IMDB ID", dataKey: "imdbId" },
    { width: 200, label: "Title", dataKey: "title" },
    { width: 120, label: "Release Date", dataKey: "releaseDate" },
    { width: 120, label: "Trailer Link", dataKey: "trailerLink" },
    { width: 120, label: "Poster", dataKey: "poster" },
    { width: 120, label: "Genres", dataKey: "genres" },
    { width: 120, label: "Backdrop", dataKey: "backdrop" },
  ];

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead: React.forwardRef((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </TableCell>
        ))}
        <TableCell variant="head" align="center">
          Actions
        </TableCell>
      </TableRow>
    );
  }

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
      await updateMovie(updatedMovie);
      setMovies(movies.map((m) => (m.imdbId === imdbId ? updatedMovie : m)));
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

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
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
  }

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
}
