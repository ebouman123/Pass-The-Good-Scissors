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
      <Button onClick={() => history.push('/about')} variant="contained" sx={{m: 8, backgroundColor: '#bf7296'}}>
        Learn more about Pass The Good Scissors
      </Button>
      <Typography>&copy; Evan Bouman</Typography>
    </footer>
  );
}

export default Footer;
