import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthControllerService } from "../../api-client";
import TokenService from "../../api-client/token/tokenService";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LogIn() {
  const navigate = useNavigate();
  const [authRequest, setAuthRequest] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState([]);
  const [rememberMe, setRememberMe] = useState(false);
  const tokenService = new TokenService();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg([]);
    console.log("Login attempt:", authRequest);

    try {
      const response = await AuthControllerService.login(authRequest);
      tokenService.token = response.token;
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response?.data) {
        if (error.response.data.validationErrors) {
          setErrorMsg(error.response.data.validationErrors);
        } else {
          setErrorMsg([error.response.data.errorMsg]);
        }
      } else {
        setErrorMsg(["An unexpected error occurred"]);
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        {errorMsg.length > 0 && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {errorMsg.map((msg) => (
              <p key={msg}>{msg}</p>
            ))}
          </Alert>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={authRequest.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={authRequest.password}
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link href="/signup" variant="body2">
              Don`&apos;`t have an account yet? Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
