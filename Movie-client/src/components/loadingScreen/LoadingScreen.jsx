import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" style={{ marginTop: 16 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
