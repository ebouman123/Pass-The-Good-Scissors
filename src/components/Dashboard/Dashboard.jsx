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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Dashboard() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <Box
      sx={{
        p: 0,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 5,
        display: "flex",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <Box>
        <List
          sx={{ backgroundColor: "#e8eaf5", width: "33vh" }}
          subheader={
            <ListSubheader sx={{ fontSize: 20, p: 0, color: "#000000" }}>
              New User? Start Here!
            </ListSubheader>
          }
          component="nav"
        >
          <ListItem sx={{ height: 70 }}>
            <ListItemButton onClick={() => history.push("/fabricsTutorial")}>
              <ListItemText primary="Manage Fabrics Tutorial" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => history.push("/planningTutorial")}>
              <ListItemText primary="Planning Tool Tutorial" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => history.push("/quiltsTutorial")}>
              <ListItemText primary="Finished Quilts Tutorial" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Card
          sx={{
            marginRight: 4,
            marginTop: 15,
            "&:hover": { cursor: "pointer" },
            height: 550,
          }}
          onClick={() => history.push("/fabrics")}
        >
          <CardMedia
            sx={{ height: 450, width: "40vh" }}
            image="/assets/Fabric-Bolts.jpg"
            alt="Image of Bolts of Fabric"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Manage Fabrics
            </Typography>
            <ArrowForwardIcon />
          </CardContent>
        </Card>
        <Card
          sx={{
            marginLeft: 4,
            marginTop: 15,
            "&:hover": { cursor: "pointer" },
            height: 550,
          }}
          onClick={() => history.push("/planning")}
        >
          <CardMedia
            sx={{ height: 450, width: "40vh" }}
            image="/assets/Tools.jpg"
            alt="Image of Quilting Tools"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Planning Tool
            </Typography>
            <ArrowForwardIcon />
          </CardContent>
        </Card>
      </Box>
      <Box>
        <List
          sx={{ backgroundColor: "#e8eaf5", width: "33vh" }}
          subheader={
            <ListSubheader sx={{ fontSize: 20, p: 0, color: "#000000" }}>
              Shop for Fabric or Patterns!
            </ListSubheader>
          }
          component="nav"
        >
          <ListItem
            sx={{ height: 70 }}
            button
            component="a"
            href="https://www.alderwood-studio.com/"
            target="_blank"
          >
            <ListItemText primary="Alderwood Studio" />
          </ListItem>
          <Divider />
          <ListItem
            sx={{ height: 70 }}
            button
            component="a"
            href="https://www.connectingthreads.com/"
            target="_blank"
          >
            <ListItemText primary="Connecting Threads" />
          </ListItem>
          <Divider />
          <ListItem
            sx={{ height: 70 }}
            button
            component="a"
            href="https://elizabethhartman.com/"
            target="_blank"
          >
            <ListItemText primary="Elizabeth Hartman" />
          </ListItem>
          <Divider />
          <ListItem
            sx={{ height: 70 }}
            button
            component="a"
            href="https://www.fatquartershop.com/"
            target="_blank"
          >
            <ListItemText primary="Fat Quarter Shop" />
          </ListItem>
          <Divider />
          <ListItem
            sx={{ height: 70 }}
            button
            component="a"
            href="https://www.hawthornesupplyco.com/"
            target="_blank"
          >
            <ListItemText primary="Hawthorne Supply Co." />
          </ListItem>
          <Divider />
          <ListItem
            sx={{ height: 70 }}
            button
            component="a"
            href="https://www.hancocks-paducah.com/"
            target="_blank"
          >
            <ListItemText primary="Hancock's of Paducah" />
          </ListItem>
          <Divider />
          <ListItem
            sx={{ height: 70 }}
            button
            component="a"
            href="https://www.missouriquiltco.com/"
            target="_blank"
          >
            <ListItemText primary="Missouri Star Quilt Co." />
          </ListItem>
          <Divider />
          <ListItem
            sx={{ height: 70 }}
            button
            component="a"
            href="https://www.sarahjeanmakes.com/shop"
            target="_blank"
          >
            <ListItemText primary="Sarah Jean Makes" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
