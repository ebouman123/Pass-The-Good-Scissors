import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import UploadQuilt from "../UploadQuilt/UploadQuilt";

import Button from "@mui/material/Button";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DisplayQuilts() {
  const dispatch = useDispatch();
  const history = useHistory();

  const quilts = useSelector((store) => store.quilts); // Get images from Redux store
  const [quiltUrls, setQuiltUrls] = useState([]); // State to store presigned image URLs

  const [open, setOpen] = useState(false);
  const [quiltToDelete, setQuiltToDelete] = useState("");

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

  // Opens the dialog and sets fabricToDelete state
  const handleClickOpen = (quilt) => {
    setOpen(true);
    setQuiltToDelete(quilt);
  };

  // Closes the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to delete a quilt
  const deleteQuilt = async (quilt) => {
    setOpen(false);
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
    <Box sx={{ marginLeft: 6, marginTop: 5, display: "flex", height: "100vh" }}>
      <Box sx={{ paddingRight: 10 }}>
        <UploadQuilt />
      </Box>
      <Box sx={{ paddingLeft: 10 }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Your Finished Quilts
        </Typography>
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
                  <Grid xs={12} sm={6} md={3} key={quilt.quiltName}>
                    <Card sx={{ width: 385, borderRadius: 3 }}>
                      <CardMedia
                        sx={{ height: 385, cursor: 'pointer' }}
                        image={quilt.url}
                        title={fileName}
                        onClick={() => handleEdit(quilt.quiltName)}
                      />
                      <CardContent>
                        <Typography noWrap={true} gutterBottom variant="h5" component="div">
                          {fileName}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="outlined"
                          // Need to pass the quilt to state because of how Dialogs initialize
                          onClick={() => handleClickOpen(quilt)}
                          startIcon={<DeleteIcon />}
                          color="secondary"
                          sx={{borderRadius: 10}}
                        >
                          Delete
                        </Button>
                        <Dialog
                          open={open}
                          maxWidth='sm'
                          fullWidth={true}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Permanently Delete This Quilt?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              This action cannot be undone.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => deleteQuilt(quiltToDelete)}
                              startIcon={<DeleteIcon />}
                              color="secondary"
                            >
                              Delete
                            </Button>
                            <Button onClick={handleClose} variant="contained">
                              Cancel
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Button
                          variant="contained"
                          onClick={() => handleEdit(quilt.quiltName)}
                          startIcon={<MoreHorizIcon />}
                          sx={{borderRadius: 10}}
                        >
                          View
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
    </Box>
  );
}
