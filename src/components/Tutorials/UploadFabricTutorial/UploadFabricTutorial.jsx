import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function UploadFabricTutorial() {
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
        <ListItemText>1. Choose your fabric</ListItemText>
        <ListItem sx={{ paddingLeft: 0, width: 250 }}>
          <Button
            component="label"
            sx={{ marginRight: 3 }}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Select an Image
            <VisuallyHiddenInput />
          </Button>
        </ListItem>
        <ListItemText>2. Enter a name for your fabric</ListItemText>
        <ListItem sx={{ paddingLeft: 0 }}>
          <label htmlFor="imageNameInput">
            <TextField
              type="text"
              label="Fabric Name"
              id="imageNameInput"
              placeholder="Enter fabric name"
              variant="outlined"
              size="small"
            />
          </label>
        </ListItem>
        <ListItemText>3. Upload your fabric!</ListItemText>
        <ListItem sx={{ paddingLeft: 0 }}>
          <Button variant="contained" >
            Upload
          </Button>
        </ListItem>
      </List>
    </Box>
  );
}
