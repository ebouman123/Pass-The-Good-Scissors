import React from "react";
import { useSelector } from "react-redux";
import DisplayQuilts from "../DisplayQuilts/DisplayQuilts";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

function Dashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <Box sx={{p: 0, m: 3}}>
      <Typography variant="h5" sx={{marginBottom: 3}}>🐈 Welcome, {user.username}! 🐈</Typography>
      <DisplayQuilts />
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
