import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Square from "../Square/Square";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

export default function PlanningTool() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const fabrics = useSelector((store) => store.fabrics);

  const defaultSquareSize = 120; // Default size of each checkerboard square

  // State variables for rows, columns, selected fabrics, and square configuration
  const [rows, setRows] = useState(6); // Initial number of rows
  const [cols, setCols] = useState(6); // Initial number of columns

  const [squares, setSquares] = useState(Array(rows * cols).fill(null)); // Initialize squares
  const [isNextSquareWhite, setIsNextSquareWhite] = useState(false); // Toggle for next square color
  const [selectedFabric, setSelectedFabric] = useState(null); // Currently selected fabric
  const [selectedFabricName, setSelectedFabricName] = useState(""); // Save selected fabric name
  const [fabricUrls, setFabricUrls] = useState([]); // URLs of fabrics for the fabric selection
  const [fabricUsage, setFabricUsage] = useState(Array(rows * cols).fill(null)); // Track fabric names used

  useEffect(() => {
    dispatch({ type: "FETCH_FABRICS" });
  }, [dispatch]);

  // Fetch presigned URLs for fabrics whenever the fabrics store updates
  useEffect(() => {
    const fetchPresignedUrls = async () => {
      const fabricNames = fabrics.map((fabric) => fabric.fabricName).join(","); // Get fabric names
      if (fabricNames) {
        try {
          const response = await axios.get(
            `http://localhost:5001/api/url/generate-multiple-presigned-urls?fabricNames=${fabricNames}`
          );
          setFabricUrls(response.data); // Update state with fetched URLs
        } catch (error) {
          console.error("Error fetching presigned URLs:", error);
        }
      }
    };
    if (fabrics.length > 0) {
      fetchPresignedUrls(); // Only fetch if fabrics are available
    }
  }, [fabrics]);

  // Handle fabric selection
  const handleFabricClick = (url, alt) => {
    setSelectedFabric(url); // Set the selected fabric URL
    setSelectedFabricName(alt); // Save the fabric name for the fabric list
    setIsNextSquareWhite(false); // Reset the color toggle
  };

  // Handle click on a square
  const handleSquareClick = (index) => {
    const newSquares = [...squares]; // Copy current squares
    const newFabricUsage = [...fabricUsage]; // Copy current fabric usage

    if (isNextSquareWhite) {
      newSquares[index] = null; // Clear the square if the next square should be white
      newFabricUsage[index] = null; // Clear the fabric usage for that square
    } else if (selectedFabric) {
      newSquares[index] = selectedFabric; // Set the clicked square to the selected fabric
      newFabricUsage[index] = selectedFabricName; // Set the fabric name (alt text) for that square
    }

    setSquares(newSquares); // Update squares state
    setFabricUsage(newFabricUsage); // Update fabric usage state
  };

  // Reset all squares to null
  const resetSquares = () => {
    setSquares(Array(rows * cols).fill(null)); // Reset squares array
    setFabricUsage(Array(rows * cols).fill(null)); // Reset fabric usage as well
  };

  // Update squares when rows or columns change
  useEffect(() => {
    setSquares(Array(rows * cols).fill(null)); // Reinitialize squares
    setFabricUsage(Array(rows * cols).fill(null)); // Reset fabric usage when rows/cols change
  }, [rows, cols]);

  // Function to get fabric names used on the canvas
  const getUsedFabrics = () => {
    return [...new Set(fabricUsage.filter((name) => name !== null))]; // Unique fabric names
  };

  // Using Canvas to draw a copy of the finished collection of SVGs so that I can export it as an image
  const drawCanvas = () => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      // Attempt to increase the resolution of the images
      const scale = window.devicePixelRatio || 1;
      // Add a bit for the fabric list on the right
      canvas.width = (cols * defaultSquareSize + 250) * scale;
      canvas.height = rows * defaultSquareSize * scale;
      context.scale(scale, scale);

      // Fill the background with white for the fabric list
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);

      const imagePromises = squares.map((fabricUrl, index) => {
        return new Promise((imgResolve) => {
          const x = (index % cols) * defaultSquareSize;
          const y = Math.floor(index / cols) * defaultSquareSize;

          if (fabricUrl) {
            // Create an <img> element with the fabric url
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = fabricUrl;
            img.onload = () => {
              context.drawImage(
                img,
                x,
                y,
                defaultSquareSize,
                defaultSquareSize
              );
              imgResolve();
            };
          } else {
            // Accounts for any unfilled squares
            context.fillStyle = "white";
            context.fillRect(x, y, defaultSquareSize, defaultSquareSize);
            imgResolve();
          }
        });
      });

      // Wait for all images to load and draw
      Promise.all(imagePromises).then(() => {
        const usedFabrics = getUsedFabrics();
        context.fillStyle = "black";
        context.font = "12px Arial";

        // Draw fabric names as a list
        const textX = cols * defaultSquareSize + 10; // X position for the text
        const startY = 20; // Starting Y position for text
        const lineHeight = 20; // Space between lines
        context.fillText("Fabrics Used:", textX, startY); // Title for the list
        usedFabrics.forEach((name, index) => {
          context.fillText(
            `• ${name}`,
            textX,
            startY + lineHeight * (index + 1)
          ); // Draw each fabric name with a bullet point
        });

        resolve();
      });
    });
  };

  // Export canvas to image
  const exportToImage = async () => {
    await drawCanvas();
    // Access the canvas
    const canvas = canvasRef.current;
    // Converting the canvas to a png
    const imageUrl = canvas.toDataURL();
    // Creates a link element "<a></a>"
    const link = document.createElement("a");
    // link.href sets the href to the png we created
    link.href = imageUrl;
    // Indicates that this link is to be downloaded
    link.download = "Super_Cool_Quilt.png";
    // "Clicks" the link
    link.click();
  };

  return (
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
            overflow: 'hidden'
         }}
        >
          {/* Display fabric options for selection in a grid */}
          {fabricUrls.length > 0 ? (
            <Grid
              container
              spacing={3}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              sx={{
                overflow: "auto",
                maxHeight: 600,
                paddingLeft: 3,
                paddingTop: 3,
              }}
            >
              {fabricUrls.map((fabric) => {
                // Extract just the file name from the fabric name
                const fileName = fabric.fabricName.split("/").pop(); // Get the last part of the path

                return (
                  <Grid key={fabric.url}>
                    <Card
                      sx={{
                        marginBottom: 1,
                        width: 200,
                        height: 200,
                        "&:hover": { cursor: "pointer" },
                        boxShadow: 0,
                        border:
                          selectedFabric === fabric.url
                            ? "2px solid blue"
                            : "2px solid #dedede",
                      }}
                      onClick={() => handleFabricClick(fabric.url, fileName)} // Pass alt text as well
                    >
                      <CardMedia
                        sx={{ height: 150 }}
                        image={fabric.url}
                        title={fileName}
                        alt={fileName}
                      />
                      <CardContent sx={{ maxHeight: 50 }}>
                        <Typography
                          noWrap={true}
                          gutterBottom
                          variant="body"
                          component="div"
                        >
                          {fileName}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Box>
              <Typography>Add some fabrics, idiot</Typography>
            </Box>
          )}

          {/* Input fields to choose number of rows and columns */}
          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "space-between",
              borderTop: 1,
            }}
          >
            <TextField
              type="number"
              label="Rows"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))} // Update rows state
              min="1"
            />
            <TextField
              type="number"
              label="Columns"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))} // Update columns state
              min="1"
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
            <Button onClick={resetSquares} variant="outlined">
              Reset All Squares
            </Button>
            <Button
              onClick={() => setIsNextSquareWhite(true)} // Set toggle for next square to white
              variant="outlined"
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
            <Button onClick={exportToImage} variant="contained">
              Export as Image
            </Button>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1, paddingLeft: 30 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, ${defaultSquareSize}px)`, // Create a grid based on selected columns
              gap: "0",
            }}
          >
            {/* Sends the fabricUrl through as a prop to the Square component. A blank square will = null, 
            but a square that was clicked with a fabric will = that fabric url. Square then uses that fabricUrl to set
            the square to that. "i" helps us index which square we are clicking in the grid. */}
            {squares.map((fabricUrl, i) => (
              <Square
                key={i}
                size={defaultSquareSize}
                fabricUrl={fabricUrl} // Pass the fabric URL to the square
                onClick={() => handleSquareClick(i)} // Handle square click
              />
            ))}
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </Box>
      </Box>
    </Box>
  );
}
