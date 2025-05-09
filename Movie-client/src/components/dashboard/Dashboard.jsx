import { Button, Container, Stack } from "@mui/material";
import PropTypes from "prop-types";
import Header from "../header/Header";

function DashBoard({ mode, toggleColorMode }) {
  return (
    <>
      <Header mode={mode} toggleColorMode={toggleColorMode} />
      <Container maxWidth="md" sx={{ mt: "15" }}>
        <Stack
          spacing={2}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Button variant="contained" fullWidth>
            Create Design
          </Button>
          <Button variant="contained" fullWidth>
            Load Design
          </Button>
          <Button variant="contained" fullWidth>
            Set Default Values
          </Button>
        </Stack>
      </Container>
    </>
  );
}

DashBoard.propTypes = {
  mode: PropTypes.string.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default DashBoard;
