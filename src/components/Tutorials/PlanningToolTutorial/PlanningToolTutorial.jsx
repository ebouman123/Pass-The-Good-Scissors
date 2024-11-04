import { useState } from "react";
import { useTour } from "@reactour/tour";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import Square from "../../Square/Square";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

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
        content: "If you need to reset the entire grid, press the Reset button.",
      },
      {
        selector: '[planning-tour="step-3"]',
        content: "You can clear a specific square on the grid by clicking this button, then clicking the square.",
      },
      {
        selector: '[planning-tour="step-4"]',
        content: "You can use these inputs to change the number of rows and columns of the grid. Please note, this will reset any progress you have made on your grid.",
      },
      {
        selector: '[planning-tour="step-5"]',
        content: "Finally, click Export to download your finished grid as an image, along with a list of the fabrics used. Happy quilting! ",
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
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <ButtonGroup>
          <Button
            sx={{ border: 1, borderColor: "black" }}
            size="large"
            variant="contained"
            onClick={handleTourReset}
          >
            Open Tutorial
          </Button>
          <Button
            sx={{ border: 1, borderColor: "black" }}
            variant="contained"
            onClick={() => history.push("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ marginLeft: 3 }}>
        <Typography variant="h4">Plan Your Quilt!</Typography>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              width: "600px",
              borderRight: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <Typography variant="h5">Select a Fabric</Typography>
            <Grid
              container
              spacing={4}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              sx={{ overflow: "auto", maxHeight: 800 }}
            >
              <Grid key="1">
                <Card
                  sx={{
                    width: 200,
                    height: 200,
                  }}
                  planning-tour="step-1"
                >
                  <CardMedia
                    sx={{ height: 150 }}
                    image="public/assets/Fabric1.png"
                  />
                  <CardContent sx={{ maxHeight: 50 }}>
                    <Typography
                      noWrap={true}
                      gutterBottom
                      variant="body"
                      component="div"
                    >
                      Meow
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid key="2">
                <Card
                  sx={{
                    width: 200,
                    height: 200,
                  }}
                >
                  <CardMedia
                    sx={{ height: 150 }}
                    image="public/assets/Fabric2.png"
                  />
                  <CardContent sx={{ maxHeight: 50 }}>
                    <Typography
                      noWrap={true}
                      gutterBottom
                      variant="body"
                      component="div"
                    >
                      Meow 2
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid key="3">
                <Card
                  sx={{
                    width: 200,
                    height: 200,
                  }}
                >
                  <CardMedia
                    sx={{ height: 150 }}
                    image="public/assets/Fabric5.png"
                  />
                  <CardContent sx={{ maxHeight: 50 }}>
                    <Typography
                      noWrap={true}
                      gutterBottom
                      variant="body"
                      component="div"
                    >
                      Meow 3
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <div style={{ marginTop: "20px" }} planning-tour="step-4">
              <label>
                Rows:
                <input type="number" min="1" disabled={true} />
              </label>
              <label style={{ marginLeft: "10px" }}>
                Columns:
                <input type="number" min="1" disabled={true} />
              </label>
            </div>
            <Button variant="outlined" style={{ marginTop: "10px" }} planning-tour="step-2">
              Reset All Squares
            </Button>
            <Button style={{ marginTop: "10px" }} variant="outlined" planning-tour="step-3">
              Clear Individual Squares
            </Button>
            <Button variant="contained" style={{ marginTop: "10px" }} planning-tour="step-5">
              Export as Image
            </Button>
          </Box>

          <div style={{ flexGrow: 1, padding: "10px" }}>
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
          </div>
        </Box>
      </Box>
    </>
  );
}
