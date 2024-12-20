import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UploadQuiltTutorial from "../UploadQuiltTutorial/UploadQuiltTutorial";
import { useTour } from "@reactour/tour";

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

export default function DisplayQuiltsTutorial() {
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const history = useHistory();

  useEffect(() => {
    setSteps([
      {
        selector: '[quilt-tour="step-1"]',
        content:
          "Here’s where you can upload pictures of your finished quilts.",
      },
      {
        selector: '[quilt-tour="step-2"]',
        content:
          "Browse through all the quilts you’ve saved in your collection.",
      },
      {
        selector: '[quilt-tour="step-3"]',
        content: "You can delete a quilt or add and view comments.",
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
        <Box quilt-tour="step-1" sx={{ marginRight: 15 }}>
          <UploadQuiltTutorial />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: 3 }}>
            Your Finished Quilts!
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
                <Card sx={{ width: 385, borderRadius: 3 }} quilt-tour="step-2">
                  <CardMedia
                    sx={{ height: 385 }}
                    image="/assets/Quilt1.jpeg"
                    title="Star Quilt"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Star Quilt
                    </Typography>
                  </CardContent>
                  <CardActions quilt-tour="step-3">
                    <Button
                      variant="outlined"
                      // Need to pass the quilt to state because of how Dialogs initialize
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
                  <CardMedia
                    sx={{ height: 385 }}
                    image="/assets/Quilt2.jpeg"
                    title="Diamond Quilt"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Diamond Quilt
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      // Need to pass the quilt to state because of how Dialogs initialize
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
