import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import UploadQuilt from "../UploadQuilt/UploadQuilt";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

export default function DisplayQuilts() {
  const dispatch = useDispatch();
  const history = useHistory();

  const quilts = useSelector((store) => store.quilts); // Get images from Redux store
  const [quiltUrls, setQuiltUrls] = useState([]); // State to store presigned image URLs

  // Fetch images when the component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_QUILTS" });
  }, [dispatch]);

  // Fetch presigned URLs whenever the image store changes
  useEffect(() => {
    const fetchPresignedUrls = async () => {
      // Create a comma-separated list of image names
      const quiltNames = quilts.map((quilt) => quilt.quiltName).join(",");
      if (quiltNames) {
        try {
            console.log('quiltNAmes', quiltNames)
          // Request presigned URLs for the quilts
          const response = await axios.get(
            `/api/url/generate-multiple-presigned-urls-quilts?quiltNames=${quiltNames}`
          );
          setQuiltUrls(response.data); // Update state with fetched URLs
        } catch (error) {
          console.error("Error fetching presigned URLs:", error);
        }
      }
    };
    if (quilts.length > 0) {
      fetchPresignedUrls(); // Only fetch if there are quilts
    }
  }, [quilts]);

  // Function to delete a quilt
  const deleteQuilt = async (quilt) => {
    try {
      // Send a request to delete the quilt from the server
      await axios.delete(
        `http://localhost:5001/api/url/delete-quilt?quiltName=${quilt.quiltName}`
      );
      // Update state to remove the deleted quilt URL
      setQuiltUrls((prevUrls) =>
        prevUrls.filter((url) => url.quiltName !== quilt.quiltName)
      );
      // Dispatch action to remove the fabric from the Redux store
      dispatch({ type: "DELETE_QUILT", payload: quilt.quiltName });
    } catch (error) {
      console.error("Error deleting quilt:", error);
    }
  };

  const handleEdit = (quiltName) => {
    history.push({ pathname: "/editQuilt", state: quiltName });
  };

  return (
    <Box>
      <UploadQuilt />
      <h1>Your Finished Quilts!</h1>
      {quiltUrls.length > 0 ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={4}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {quiltUrls.map((quilt) => {
              // Extract just the file name from the fabric name
              const fileName = quilt.quiltName.split("/").pop(); // Get the last part of the path
              return (
                <Grid xs={12} sm={6} md={3}>
                  <Card sx={{ width: 385 }} key={quilt.quiltName}>
                    <CardMedia
                      sx={{ height: 385 }}
                      image={quilt.url}
                      title={fileName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {fileName}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        onClick={() => deleteQuilt(quilt)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(quilt.quiltName)}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <p>No Quilts Uploaded - Upload Your Next Finished Quilt!</p>
      )}
    </Box>
  );
}
