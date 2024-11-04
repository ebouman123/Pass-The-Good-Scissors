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
          Simplify Your Quilting Journey:
          <Typography variant="h5">
            Say goodbye to guesswork! With "Pass the Good Scissors," planning
            your next quilt has never been easier.
          </Typography>
        </Typography>
      </Box>
      <Box>
        <Box sx={{ border: 3 }}>
          <Typography variant="h6">
            Visualize Your Quilt:
            <Typography variant="subtitle1">
              Upload your favorite fabric images and easily arrange them on a
              dynamic grid to see how they work together
            </Typography>
          </Typography>
          <img src="Manage Fabrics.png" height="800" />
        </Box>
        <Box sx={{ border: 3 }}>
          <Typography variant="h6">
            Design with Confidence:
            <Typography variant="subtitle1">
              Experiment with different fabric combinations to create the
              perfect quilt design before you start cutting
            </Typography>
          </Typography>
          <img src="Planning Tool.png" height="800" />
        </Box>
        <Box sx={{ border: 3 }}>
          <Typography variant="h6">
            Download Your Creations:
            <Typography variant="subtitle1">
              Once you’ve crafted your ideal pattern, download an image of your
              design to guide your project
            </Typography>
          </Typography>
          <img src="Example Export.png" height="800" />
        </Box>
      </Box>
    </Box>
  );
}

export default LandingPage;
