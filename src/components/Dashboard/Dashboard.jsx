import React from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";

function Dashboard() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <Box sx={{ p: 0, m: 3 }}>
      <Box>
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Welcome, {user.username}!
        </Typography>
        <List
          sx={{ backgroundColor: "#e8eaf5", width: 320 }}
          subheader={
            <ListSubheader sx={{ fontSize: 23, color: "#000000" }}>
              Start Here!
            </ListSubheader>
          }
          component="nav"
        >
          <ListItem>
            <ListItemButton onClick={() => history.push("/quiltsTutorial")}>
              <ListItemText primary="Finished Quilts Tutorial" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => history.push("/fabricsTutorial")}>
              <ListItemText primary="Manage Fabrics Tutorial" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Planning Tool Tutorial" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
