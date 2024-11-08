import { useState } from "react";
import { useTour } from "@reactour/tour";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import Square from "../../Square/Square";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function PlanningToolTutorial() {
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const history = useHistory();

  useEffect(() => {
    setSteps([
      {
        selector: '[planning-tour="step-1"]',
        content:
          "First, select a fabric from your library of saved fabrics by clicking one. Then, click the square on the grid that you would like to be filled by the fabric.",
      },
      {
        selector: '[planning-tour="step-2"]',
        content:
          "If you need to reset the entire grid, press the Reset button.",
      },
      {
        selector: '[planning-tour="step-3"]',
        content:
          "You can clear a specific square on the grid by clicking this button, then clicking the square.",
      },
      {
        selector: '[planning-tour="step-4"]',
        content:
          "You can use these inputs to change the number of rows and columns of the grid. Please note, this will reset any progress you have made on your grid.",
      },
      {
        selector: '[planning-tour="step-5"]',
        content:
          "Finally, click Export to download your finished grid as an image, along with a list of the fabrics used. Happy quilting! ",
      },
    ]);
    setCurrentStep(0);
    setIsOpen(true);
  }, []);

  const handleTourReset = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  const defaultSquareSize = 120;
  const rows = 6;
  const cols = 6;

  const [squares, setSquares] = useState(Array(rows * cols).fill(null));

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
      <Box
        sx={{ paddingLeft: 6, paddingRight: 6, paddingTop: 5, height: "100vh" }}
      >
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              width: 476,
              height: 840,
              border: 1,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Grid
              container
              spacing={3}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              sx={{
                overflow: "auto",
                height: 600,
                backgroundColor: "#fafafa",
                paddingLeft: 3,
                paddingTop: 3,
              }}
            >
              <Grid key="1">
                <Card
                  sx={{
                    marginBottom: 0,
                    width: 200,
                    height: 200,
                    "&:hover": { cursor: "pointer" },
                    boxShadow: 0,
                    border: "2px solid #dedede",
                  }}
                  planning-tour="step-1"
                >
                  <CardMedia sx={{ height: 150 }} image="/assets/Fabric1.png" />
                  <CardContent sx={{ maxHeight: 50 }}>
                    <Typography
                      noWrap={true}
                      gutterBottom
                      variant="body"
                      component="div"
                    >
                      Backyard Flamingo Hiding Cat
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid key="2">
                <Card
                  sx={{
                    marginBottom: 0,
                    width: 200,
                    height: 200,
                    "&:hover": { cursor: "pointer" },
                    boxShadow: 0,
                    border: "2px solid #dedede",
                  }}
                >
                  <CardMedia sx={{ height: 150 }} image="/assets/Fabric2.png" />
                  <CardContent sx={{ maxHeight: 50 }}>
                    <Typography
                      noWrap={true}
                      gutterBottom
                      variant="body"
                      component="div"
                    >
                      Lets Play Blue Tossed Cat Dolls
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid key="3">
                <Card
                  sx={{
                    marginBottom: 1,
                    width: 200,
                    height: 200,
                    "&:hover": { cursor: "pointer" },
                    boxShadow: 0,
                    border: "2px solid #dedede",
                  }}
                >
                  <CardMedia sx={{ height: 150 }} image="/assets/Fabric5.png" />
                  <CardContent sx={{ maxHeight: 50 }}>
                    <Typography
                      noWrap={true}
                      gutterBottom
                      variant="body"
                      component="div"
                    >
                      Eerie Pumpkin and Catnip
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box
              planning-tour="step-4"
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                borderTop: 1,
              }}
            >
              <TextField type="number" label="Rows" min="1" disabled={true} />
              <TextField
                type="number"
                label="Columns"
                min="1"
                disabled={true}
              />
            </Box>
            <Box
              sx={{
                paddingLeft: 3,
                paddingRight: 3,
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                variant="outlined"
                style={{ marginTop: "10px", borderRadius: 10 }}
                planning-tour="step-2"
              >
                Reset All Squares
              </Button>
              <Button
                style={{ marginTop: "10px", borderRadius: 10 }}
                variant="outlined"
                planning-tour="step-3"
              >
                Clear Individual Squares
              </Button>
            </Box>
            <Box
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                style={{ marginTop: "10px", borderRadius: 10 }}
                planning-tour="step-5"
              >
                Export as Image
              </Button>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, paddingLeft: 30 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, ${defaultSquareSize}px)`,
                gap: "0",
              }}
            >
              {squares.map((fabricUrl, i) => (
                <Square
                  key={i}
                  size={defaultSquareSize}
                  fabricUrl={fabricUrl}
                />
              ))}
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
}
