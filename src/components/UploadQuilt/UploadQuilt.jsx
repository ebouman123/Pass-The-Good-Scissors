import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function UploadQuilt() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const username = user.username;

  const [file, setFile] = useState(null); // State to hold the selected file
  const [nameInput, setNameInput] = useState(""); // State to hold the inputted file name

  // Define the folder where images will be uploaded
  const folderPath = `${username}/quilts`;

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file in state
  };

  // Handle name input and validate allowed characters
  const handleFileName = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9-_ ]*$/; // Regex for valid characters

    if (regex.test(value)) {
      setNameInput(value); // Update state if valid
    } else {
      alert(
        "Invalid character! Only letters, numbers, hyphens, underscores, and spaces are allowed."
      );
    }
  };

  // Check if an image with the same name already exists
  const checkImageExists = async (fileName) => {
    try {
      const formattedQuiltString = fileName.replaceAll("/", "$");
      const response = await axios.get(
        `http://localhost:5001/api/quilt/check-quilt-exists?quiltName=${formattedQuiltString}`
      );
      return response.data.exists; // Return existence status
    } catch (error) {
      console.error("Error checking image existence:", error);
      return false; // Assume it doesn't exist on error
    }
  };

  // Handle file upload process
  const handleUpload = async () => {
    if (!file) return; // Exit if no file is selected

    const fileName = `${folderPath}/${nameInput}`; // Include folder path in the file name
    const fileType = file.type; // Get the file type

    // Check if an image with the same name already exists
    const exists = await checkImageExists(fileName);
    if (exists) {
      alert(
        "A quilt with this name already exists. Please choose a different name."
      );
      return; // Exit if it exists
    }

    // Request a presigned URL for uploading the file
    const response = await axios.get(
      `http://localhost:5001/api/url/generate-presigned-url?fileName=${fileName}&fileType=${fileType}`
    );
    const { url } = response.data; // Extract the presigned URL

    const options = {
      headers: {
        "Content-Type": fileType, // Set the content type for the upload
      },
    };

    if (nameInput) {
      // Upload the file to the presigned URL
      await axios.put(url, file, options);
      alert("File uploaded successfully!");

      // Dispatch an action to add the image to the Redux store
      dispatch({
        type: "ADD_QUILT",
        payload: fileName, // Store the full path including the folder
      });
      setNameInput("");
    } else {
      alert("Please enter a name for the quilt!");
    }
  };

  // Hides the file input in a button
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box component="form" noValidate autoComplete="off">
      <List sx={{ p: 0 }}>
        <ListItemText>1. Choose your quilt</ListItemText>
        <ListItem sx={{ paddingLeft: 0, width: 250 }}>
          <Button
            component="label"
            sx={{ marginRight: 3 }}
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Select an Image
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
          {file && <p>File Chosen: {file.name}</p>}
        </ListItem>
        <ListItemText>2. Enter a name for your quilt</ListItemText>
        <ListItem sx={{ paddingLeft: 0 }}>
          <label htmlFor="imageNameInput">
            <TextField
              type="text"
              label="Quilt Name"
              value={nameInput}
              onChange={handleFileName}
              id="imageNameInput"
              placeholder="Enter quilt name"
              variant="outlined"
              size="small"
            />
          </label>
        </ListItem>
        <ListItemText>3. Upload your awesome quilt!</ListItemText>
        <ListItem sx={{ paddingLeft: 0 }}>
          <Button variant="contained" onClick={handleUpload}>
            Upload
          </Button>
        </ListItem>
      </List>
    </Box>
  );
}
