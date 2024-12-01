import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  MovieControllerService,
  ReviewControllerService,
} from "../../api-client";
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, movie, reviews = [], setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await MovieControllerService.getMovieByImdbId(movieId);
        getMovieData(response);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [movieId, getMovieData]);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      await ReviewControllerService.createReview({
        body: rev.value,
        movie: { imdbId: movieId },
      });

      const updatedReviews = Array.isArray(reviews)
        ? [...reviews, { body: rev.value }]
        : [{ body: rev.value }];

      rev.value = "";

      setReviews(updatedReviews);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={movie?.poster}
            alt=""
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ReviewForm
            handleSubmit={addReview}
            revText={revText}
            labelText="Write a Review?"
          />
          <Divider sx={{ my: 2 }} />
          {reviews?.map((r) => (
            <Box key={r.id}>
              <Typography>{r.body}</Typography>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

Reviews.propTypes = {
  getMovieData: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    poster: PropTypes.string,
  }),
  reviews: PropTypes.array,
  setReviews: PropTypes.func.isRequired,
};

export default Reviews;
