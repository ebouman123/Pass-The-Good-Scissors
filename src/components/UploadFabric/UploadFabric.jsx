import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function UploadFabric() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const username = user.username;

  const [file, setFile] = useState(null); // State to hold the selected file
  const [nameInput, setNameInput] = useState(""); // State to hold the inputted file name

  // Define the folder where images will be uploaded
  const folderPath = `${username}/fabrics`;

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
      const formattedFabricString = fileName.replaceAll("/", "$");
      const response = await axios.get(
        `http://localhost:5001/api/fabric/check-fabric-exists?fabricName=${formattedFabricString}`
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
        "A fabric with this name already exists. Please choose a different name."
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

    // Upload the file to the presigned URL
    await axios.put(url, file, options);
    alert("File uploaded successfully!");

    // Dispatch an action to add the image to the Redux store
    dispatch({
      type: "ADD_FABRIC",
      payload: fileName, // Store the full path including the folder
    });

    setNameInput("");
  };

  return (
    <div>
      {/* Input for selecting a file */}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {/* Input for entering the image name */}
      <input
        type="text"
        value={nameInput}
        onChange={handleFileName}
        placeholder="Enter fabric name"
      />
      {/* Button to trigger the upload process */}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
