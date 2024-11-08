import { useEffect } from "react";
import { useTour } from "@reactour/tour";
import UploadFabricTutorial from "../UploadFabricTutorial/UploadFabricTutorial";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function DisplayFabricsTutorial() {
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const history = useHistory();

  useEffect(() => {
    setSteps([
      {
        selector: '[fabric-tour="step-1"]',
        content:
          "Here’s where you can easily add a new fabric to your library.",
      },
      {
        selector: '[fabric-tour="step-2"]',
        content:
          "Browse through all the fabrics you’ve saved in your collection.",
      },
      {
        selector: '[fabric-tour="step-3"]',
        content: "You can delete a fabric or add and view comments.",
      },
    ]);
    setCurrentStep(0);
    setIsOpen(true);
  }, []);

  const handleTourReset = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  return (
    <>
      <Box sx={{ justifyContent: "center", display: "flex", marginTop: 5 }}>
        <ButtonGroup>
          <Button
            sx={{ border: 1, borderColor: "black", borderRadius: 10 }}
            size="large"
            variant="contained"
            onClick={handleTourReset}
          >
            Open Tutorial
          </Button>
          <Button
            sx={{ border: 1, borderColor: "black", borderRadius: 10 }}
            variant="contained"
            onClick={() => history.push("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ marginLeft: 6, marginTop: 5, display: "flex" }}>
        <Box fabric-tour="step-1" sx={{ marginRight: 20 }}>
          <UploadFabricTutorial />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: 3 }}>
            Your Saved Fabrics
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={4}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid xs={12} sm={6} md={3} key="1">
                <Card sx={{ width: 385, borderRadius: 3 }} fabric-tour="step-2">
                  <CardMedia sx={{ height: 385 }} image="/assets/Fabric1.png" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Backyard Flamingo Hiding Cat
                    </Typography>
                  </CardContent>
                  <CardActions fabric-tour="step-3">
                    <Button
                      variant="outlined"
                      // Need to pass the fabric to state because of how Dialogs initialize
                      startIcon={<DeleteIcon />}
                      color="secondary"
                      sx={{ borderRadius: 10 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: 10 }}
                      startIcon={<MoreHorizIcon />}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid xs={12} sm={6} md={3} key="2">
                <Card sx={{ width: 385, borderRadius: 3 }}>
                  <CardMedia sx={{ height: 385 }} image="/assets/Fabric2.png" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lets Play Blue Tossed Cat Dolls
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      // Need to pass the fabric to state because of how Dialogs initialize
                      startIcon={<DeleteIcon />}
                      color="secondary"
                      sx={{ borderRadius: 10 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: 10 }}
                      startIcon={<MoreHorizIcon />}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid xs={12} sm={6} md={3} key="3">
                <Card sx={{ width: 385, borderRadius: 3 }}>
                  <CardMedia sx={{ height: 385 }} image="/assets/Fabric5.png" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Eerie Pumpkin and Catnip
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      // Need to pass the fabric to state because of how Dialogs initialize
                      startIcon={<DeleteIcon />}
                      color="secondary"
                      sx={{ borderRadius: 10 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: 10 }}
                      startIcon={<MoreHorizIcon />}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
