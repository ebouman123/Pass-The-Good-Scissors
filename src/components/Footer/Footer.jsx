import React from "react";
import "./Footer.css";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  const history = useHistory();

  return (
    <footer>
      <Button
        onClick={() => history.push("/about")}
        variant="contained"
        sx={{
          height: 43,
          m: 8,
          border: 0,
          boxShadow: 0,
          borderRadius: 10,
          backgroundColor: "#bf7296",
          textTransform: 'unset'
        }}
      >
        <Typography variant="body2">Learn more about Pass the Good Scissors</Typography>
      </Button>
      <Typography>&copy; Evan Bouman</Typography>
    </footer>
  );
}

export default Footer;
