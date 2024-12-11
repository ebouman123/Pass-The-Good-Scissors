import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function EditFabric() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  // DisplayFabrics sets the state with the chosen fabric name, then we reference it here
  const fabricName = location.state;
  // Take off the prefixes to get rid of the S3 folders
  const formattedFabricName = fabricName.split("/").pop();

  const chosenFabric = useSelector((store) => store.chosenFabric);
  const currentFabric = chosenFabric[0];

  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");

  const [linkInput, setLinkInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

  // Holds the presigned URL from S3
  const [fabricUrl, setFabricUrl] = useState([]);

  useEffect(() => {
    dispatch({
      type: "FETCH_CHOSEN_FABRIC",
      payload: fabricName,
    });
  }, []);

  // Waits for chosenFabric to pull, then sets the comment and link to the DB values
  useEffect(() => {
    if (chosenFabric.length > 0) {
      setComment(currentFabric.fabricComment);
      setLink(currentFabric.fabricLink);
    }
  }, [chosenFabric]);

  // Fetches the presigned URL from S3 for the chosen fabric image
  useEffect(() => {
    const fetchPresignedUrl = () => {
      if (fabricName) {
        const formattedFabricString = fabricName.replaceAll("/", "$");
        axios
          .get(
            `/api/url/generate-presigned-url-fabric/${formattedFabricString}`
          )
          .then((response) => {
            setFabricUrl(response.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };

    if (fabricName.length > 0) {
      fetchPresignedUrl();
    }
  }, [fabricName]);

  const handleLink = (event) => {
    if (event.target.value) {
      setLink(event.target.value);
      setLinkInput(event.target.value);
    }
  };

  const handleComment = (event) => {
    if (event.target.value) {
      setComment(event.target.value);
      setCommentInput(event.target.value);
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    const data = {
      fabricName: fabricName,
      fabricLink: link,
      fabricComment: comment,
    };
    dispatch({
      type: "ADD_FABRIC_INFO",
      payload: data,
    });
    setLinkInput("");
    setCommentInput("");
    alert("Saved!");
  };


  return (
    <Box sx={{ marginLeft: 3 }}>
      <Typography
        variant="h3"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Add a link or comment to your fabric!
      </Typography>
      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box sx={{ width: "50vh", wordWrap: "break-word" }}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ paddingBottom: 3 }}>
              Comment
            </Typography>
            {comment ? (
              <Typography variant="body">{comment}</Typography>
            ) : (
              <Typography variant="body">
                You haven't added a comment yet.
              </Typography>
            )}
          </Box>
          <Box sx={{ p: 4, marginTop: 2 }}>
            <Typography variant="h4" sx={{ paddingBottom: 3 }}>
              Fabric Link
            </Typography>
            {link ? (
              <Typography variant="body">
                <a href={link} target="_blank">
                  {link}
                </a>
              </Typography>
            ) : (
              <Typography variant="body">
                You haven't added a link yet.
              </Typography>
            )}
          </Box>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", paddingTop: 8 }}
          >
            <TextField
              type="text"
              label="Add a Comment"
              multiline
              value={commentInput}
              onChange={handleComment}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              type="text"
              label="Add a Link"
              multiline
              value={linkInput}
              onChange={handleLink}
              sx={{ marginBottom: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ marginBottom: 1, borderRadius: 10 }}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => history.push("/fabrics")}
              sx={{ borderRadius: 10 }}
            >
              Back
            </Button>
          </Box>
        </Box>
        <Box>
          <Card sx={{ width: 750, border: 0, boxShadow: 0 }}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {formattedFabricName}
              </Typography>
            </CardContent>
            <CardMedia
              sx={{ height: 750 }}
              image={fabricUrl.url}
              title={formattedFabricName}
            />
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
