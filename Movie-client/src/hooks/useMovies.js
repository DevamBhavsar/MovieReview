import { useCallback, useEffect, useState } from "react";
import { MovieControllerService } from "../api-client";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await MovieControllerService.getMovies();
      setMovies(response);
      setError(null);
    } catch (err) {
      setError("Failed to fetch movies");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, isLoading, error, refetch: fetchMovies };
};

export default useMovies;
