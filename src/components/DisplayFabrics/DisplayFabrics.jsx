import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import "./DisplayFabrics.css";
import UploadFabric from "../UploadFabric/UploadFabric";

export default function DisplayFabrics() {
  const dispatch = useDispatch();
  const history = useHistory();

  const fabrics = useSelector((store) => store.fabrics); // Get images from Redux store
  const [fabricUrls, setFabricUrls] = useState([]); // State to store presigned image URLs

  // Fetch images when the component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_FABRICS" });
  }, [dispatch]);

  // Fetch presigned URLs whenever the image store changes
  useEffect(() => {
    const fetchPresignedUrls = async () => {
      // Create a comma-separated list of image names
      const fabricNames = fabrics.map((fabric) => fabric.fabricName).join(",");
      if (fabricNames) {
        try {
          // Request presigned URLs for the fabrics
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
      fetchPresignedUrls(); // Only fetch if there are fabrics
    }
  }, [fabrics]);

  // Function to delete an fabric
  const deleteFabric = async (fabric) => {
    try {
      // Send a request to delete the fabric from the server
      await axios.delete(
        `http://localhost:5001/api/url/delete-fabric?fabricName=${fabric.fabricName}`
      );
      // Update state to remove the deleted fabric URL
      setFabricUrls((prevUrls) =>
        prevUrls.filter((url) => url.fabricName !== fabric.fabricName)
      );
      // Dispatch action to remove the fabric from the Redux store
      dispatch({ type: "DELETE_FABRIC", payload: fabric.fabricName });
    } catch (error) {
      console.error("Error deleting fabric:", error);
    }
  };

  const handleEdit = (fabricName) => {
    history.push({ pathname: "/edit", state: fabricName });
}

  return (
    <div>
      <UploadFabric />
      <h1>Your Saved Fabrics</h1>
      {fabricUrls.length > 0 ? (
        <div className="gallery">
          {fabricUrls.map((fabric) => {
            // Extract just the file name from the fabric name
            const fileName = fabric.fabricName.split("/").pop(); // Get the last part of the path

            return (
              <div className="gallery-item" key={fabric.fabricName}>
                <h2>{fileName}</h2>
                <img
                  src={fabric.url}
                  alt={fileName}
                  className="gallery-fabric"
                />
                <button onClick={() => handleEdit(fabric.fabricName)}>Edit</button>
                <button onClick={() => deleteFabric(fabric)}>Delete</button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No Fabrics Uploaded - Try Uploading One!</p>
      )}
    </div>
  );
}
