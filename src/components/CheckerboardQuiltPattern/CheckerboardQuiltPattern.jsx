import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Square from "../Square/Square";

const CheckerboardQuiltPattern = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const fabrics = useSelector((store) => store.fabrics);

  const defaultSquareSize = 120; // Default size of each checkerboard square

  // State variables for rows, columns, selected fabrics, and square configuration
  const [rows, setRows] = useState(3); // Initial number of rows
  const [cols, setCols] = useState(3); // Initial number of columns

  const [squares, setSquares] = useState(Array(rows * cols).fill(null)); // Initialize squares
  const [isNextSquareWhite, setIsNextSquareWhite] = useState(false); // Toggle for next square color
  const [selectedFabric, setSelectedFabric] = useState(null); // Currently selected fabric

  const [fabricUrls, setFabricUrls] = useState([]); // URLs of fabrics for the fabric selection

  // Fetch fabrics when the component mounts
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
  const handleFabricClick = (url) => {
    setSelectedFabric(url); // Set the selected fabric
    setIsNextSquareWhite(false); // Reset the color toggle
  };

  // Handle click on a square
  const handleSquareClick = (index) => {
    const newSquares = [...squares]; // Copy current squares
    if (isNextSquareWhite) {
      newSquares[index] = null; // Clear the square if the next square should be white (set to null)
    } else if (selectedFabric) {
      newSquares[index] = selectedFabric; // Set the clicked square to the selected fabric
    }
    setSquares(newSquares); // Update squares state
  };

  // Reset all squares to null
  const resetSquares = () => {
    setSquares(Array(rows * cols).fill(null)); // Reset squares array
  };

  // Update squares when rows or columns change
  useEffect(() => {
    setSquares(Array(rows * cols).fill(null)); // Reinitialize squares
  }, [rows, cols]);


  // Using Canvas to basically draw a copy of the finished collection of SVGs so that I can export it as an image
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // Set the canvas width * height to match the pattern size
    canvas.width = cols * defaultSquareSize;
    canvas.height = rows * defaultSquareSize;

    // Using forEach to iterate through the array of squares and draw each one
    squares.forEach((fabricUrl, index) => {
      const x = (index % cols) * defaultSquareSize;
      const y = Math.floor(index / cols) * defaultSquareSize;

      if (fabricUrl) {
        const img = new Image();
        img.src = fabricUrl;
        img.onload = () => {
          context.drawImage(img, x, y, defaultSquareSize, defaultSquareSize);
        };
      } else {
        context.fillStyle = "white";
        context.fillRect(x, y, defaultSquareSize, defaultSquareSize);
      }
    });
  };

  // Export canvas to image
  const exportToImage = () => {
    drawCanvas();
    // Access the canvas
    const canvas = canvasRef.current;
    // Converting the canvas to a png
    const imageUrl = canvas.toDataURL();
    console.log('imageUrl', imageUrl)
    // Creates a link element "<a></a>"
    const link = document.createElement("a");
    // link.href sets the href to the png we created
    link.href = imageUrl;
    // Indicates that this link is to be downloaded
    // link.download = "checkerboard_quilt_pattern.png";
    // // "Clicks" the link
    // link.click();
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "600px",
          borderRight: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <h2>Select a Fabric</h2>
        {/* Display fabric options for selection in a grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "10px",
          }}
        >
          {fabricUrls.map((fabric, index) => {
            // Extract just the file name from the fabric name
            const fileName = fabric.fabricName.split("/").pop(); // Get the last part of the path

            return (
              <div
                key={index}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={fabric.url}
                  alt={fileName}
                  width={200}
                  height={200}
                  onClick={() => handleFabricClick(fabric.url)} // Handle fabric click
                  style={{
                    border:
                      selectedFabric === fabric.url ? "2px solid blue" : "none", // Highlight selected fabric
                  }}
                />
                <p style={{ textAlign: "center" }}>{fileName}</p>{" "}
              </div>
            );
          })}
        </div>

        {/* Input fields to choose number of rows and columns */}
        <div style={{ marginTop: "20px" }}>
          <label>
            Rows:
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))} // Update rows state
              min="1"
            />
          </label>
          <label style={{ marginLeft: "10px" }}>
            Columns:
            <input
              type="number"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))} // Update columns state
              min="1"
            />
          </label>
        </div>
        <button onClick={resetSquares} style={{ marginTop: "20px" }}>
          Reset All Squares
        </button>
        <button
          onClick={() => setIsNextSquareWhite(true)} // Set toggle for next square to white
          style={{ marginTop: "10px" }}
          title="Click to make the next square you click white"
        >
          Clear Individual Squares
        </button>
        <button onClick={exportToImage} style={{ marginTop: "10px" }}>
          Export as Image
        </button>
      </div>

      <div style={{ flexGrow: 1, padding: "10px" }}>
        <h1>Checkerboard Quilt Pattern</h1>
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
        <canvas ref={canvasRef} />{" "}
      </div>
    </div>
  );
};

export default CheckerboardQuiltPattern;
