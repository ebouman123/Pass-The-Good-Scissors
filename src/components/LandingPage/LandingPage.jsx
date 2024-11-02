import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <Box>
      <Box>
        <Typography variant="h4">
          Pass The Good Scissors! is a tool that helps you choose your fabric
          for your next quilting project.
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;
