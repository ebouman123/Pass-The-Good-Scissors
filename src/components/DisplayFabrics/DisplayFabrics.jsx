import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import UploadFabric from "../UploadFabric/UploadFabric";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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

export default function DisplayFabrics() {
  const dispatch = useDispatch();
  const history = useHistory();

  const fabrics = useSelector((store) => store.fabrics); // Get images from Redux store
  const [fabricUrls, setFabricUrls] = useState([]); // State to store presigned image URLs

  const [open, setOpen] = useState(false);
  const [fabricToDelete, setFabricToDelete] = useState("");

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
            `/api/url/generate-multiple-presigned-urls?fabricNames=${fabricNames}`
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

  // Opens the dialog and sets fabricToDelete state
  const handleClickOpen = (fabric) => {
    setOpen(true);
    setFabricToDelete(fabric);
  };

  // Closes the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to delete an fabric
  const deleteFabric = async (fabric) => {
    setOpen(false);
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
  };

  return (
    <Box sx={{ marginLeft: 6, marginTop: 5, display: "flex", height: '100vh' }}>
      <Box sx={{ paddingRight: 10 }}>
        <UploadFabric />
      </Box>
      <Box sx={{ paddingLeft: 10 }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Your Saved Fabrics
        </Typography>
        {fabricUrls.length > 0 ? (
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={4}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              {fabricUrls.map((fabric) => {
                // Extract just the file name from the fabric name
                const fileName = fabric.fabricName.split("/").pop(); // Get the last part of the path
                return (
                  <Grid xs={12} sm={6} md={3} key={fabric.fabricName}>
                    <Card sx={{ width: 385, borderRadius: 3 }}>
                      <CardMedia
                        sx={{ height: 385, cursor: 'pointer' }}
                        image={fabric.url}
                        title={fileName}
                        onClick={() => handleEdit(fabric.fabricName)}
                      />
                      <CardContent>
                        <Typography noWrap={true} gutterBottom variant="h5" component="div">
                          {fileName}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="outlined"
                          // Need to pass the fabric to state because of how Dialogs initialize
                          onClick={() => handleClickOpen(fabric)}
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
                            {"Permanently Delete This Fabric?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              This action cannot be undone.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => deleteFabric(fabricToDelete)}
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
                          onClick={() => handleEdit(fabric.fabricName)}
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
          <p>No Fabrics Uploaded - Try Uploading One!</p>
        )}
      </Box>
    </Box>
  );
}
