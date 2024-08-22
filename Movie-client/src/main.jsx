import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import MovieFormCard from "./components/test/test";
import { ThemeProvider, createTheme } from "@mui/material";
import DosisFont from "../Fonts/Dosis/Dosis-VariableFont_wght.ttf";
import LogIn from "./components/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#238737",
    },
    secondary: {
      main: "#4078c0",
    },
  },
  typography: { fontFamily: "Dosis, Arial, sans-serif" },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Dosis';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Dosis'), url(${DosisFont}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

function ThemedApp() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      ToggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<App colorMode={colorMode} mode={mode} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/tests"
            element={
              <ProtectedRoute>
                <MovieFormCard colorMode={colorMode} mode={mode} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemedApp />
  </React.StrictMode>
);
