import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Footer from "../Footer/Footer";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import { FitScreen } from "@mui/icons-material";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: "url(/assets/Background2.png)",
      }}
    >
      <Box
        sx={{
          paddingTop: 40,
          paddingBottom: 80,
          display: "flex",
          flexDirection: "column",
          color: "#ffffff",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" fontWeight="400" sx={{ textAlign: "center" }}>
          Simplify Your Quilting Journey
        </Typography>
        <Typography
          variant="h4"
          sx={{ paddingTop: 10, paddingBottom: 10, textAlign: "center" }}
        >
          With Pass the Good Scissors, planning your next quilt has never been
          easier.
        </Typography>
        <Box
          component="button"
          onClick={() => history.push("/login")}
          sx={{
            cursor: "pointer",
            width: 330,
            height: 85,
            justifyContent: "center",
            border: 0,
            backgroundColor: "#bf7296",
          }}
        >
          <Typography variant="subtitle1" color="#ffffff">
            Log in or Register to get started
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card
          sx={{
            width: 1 / 3,
            m: 10,
            height: "20vh",
            backgroundColor: "#fff4f9",
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Visualize Your Quilt:
              <Typography variant="h6" sx={{ paddingTop: 5 }}>
                Upload your favorite fabric images and easily arrange them on a
                dynamic grid to see how they work together
              </Typography>
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: 1 / 3,
            m: 10,
            height: "20vh",
            backgroundColor: "#fff4f9",
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Design with Confidence:
              <Typography variant="h6" sx={{ paddingTop: 5 }}>
                Experiment with different fabric combinations to create the
                perfect quilt design before you start cutting
              </Typography>
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: 1 / 3,
            m: 10,
            height: "20vh",
            backgroundColor: "#fff4f9",
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Download Your Creations:
              <Typography variant="h6" sx={{ paddingTop: 5 }}>
                Once you’ve crafted your ideal pattern, download an image of
                your design to guide your project
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Box>
  );
}

export default LandingPage;
