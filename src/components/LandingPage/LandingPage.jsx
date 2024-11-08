import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Footer from "../Footer/Footer";

function LandingPage() {
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
        <Typography
          variant="h1"
          sx={{ textAlign: "center", fontFamily: "Shrikhand" }}
        >
          Pass the Good Scissors!
        </Typography>
        <Typography
          variant="h4"
          sx={{ paddingTop: 15, paddingBottom: 17, textAlign: "center" }}
        >
          Helping You Simplify Your Next Quilting Journey
        </Typography>
        <Button
          onClick={() => history.push("/login")}
          variant="contained"
          sx={{
            width: 330,
            height: 82,
            border: 0,
            boxShadow: 0,
            borderRadius: 10,
            backgroundColor: "#bf7296",
            textTransform: "unset",
          }}
        >
          <Typography variant="h6" color="#ffffff">
            Log in or Register to get started
          </Typography>
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: 'space-evenly' }}>
        <Card
          sx={{
            width: 1 / 4,
            marginLeft: 10,
            marginRight: 5,
            height: "25vh",
            backgroundColor: "#fcedf4",
            border: 0,
            boxShadow: 0,
            borderRadius: 10
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ textAlign: "center", paddingTop: 3 }}>
              Visualize Your Quilt
              <Typography variant="h5" sx={{ paddingTop: 5 }}>
                Upload your favorite fabric images and easily arrange them on a
                dynamic grid to see how they work together
              </Typography>
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: 1 / 4,
            marginLeft: 5,
            marginRight: 5,
            height: "25vh",
            backgroundColor: "#fff4f9",
            border: 0,
            boxShadow: 0,
            borderRadius: 10
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ textAlign: "center", paddingTop: 3 }}>
              Design with Confidence
              <Typography variant="h5" sx={{ paddingTop: 5 }}>
                Experiment with different fabric combinations to create the
                perfect quilt design before you start cutting
              </Typography>
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: 1 / 4,
            marginLeft: 5,
            marginRight: 10,
            height: "25vh",
            backgroundColor: "#fff4f9",
            border: 0,
            boxShadow: 0,
            borderRadius: 10
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ textAlign: "center", paddingTop: 3 }}>
              Download Your Creations
              <Typography variant="h5" sx={{ paddingTop: 5 }}>
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
