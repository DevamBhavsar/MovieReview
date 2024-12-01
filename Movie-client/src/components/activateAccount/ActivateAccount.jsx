import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthControllerService } from "../../api-client";

const ActivateAccount = () => {
  const [activationCode, setActivationCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await AuthControllerService.confirm(activationCode);
      navigate("/login");
    } catch (error) {
      if (error.body?.errorMsg) {
        setError(error.body.errorMsg);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Activate Your Account
        </Typography>
        {email && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            An activation code has been sent to {email}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="activationCode"
            label="Activation Code"
            name="activationCode"
            autoFocus
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Activate Account
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ActivateAccount;
