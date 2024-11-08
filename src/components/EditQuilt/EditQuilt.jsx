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

export default function EditQuilt() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  // DisplayQuilts sets the state with the chosen quilt name, then we reference it here
  const quiltName = location.state;
  // Take off the prefixes to get rid of the S3 folders
  const formattedQuiltName = quiltName.split("/").pop();

  const chosenQuilt = useSelector((store) => store.chosenQuilt);
  const currentQuilt = chosenQuilt[0];

  const [comment, setComment] = useState("");
  const [commentInput, setCommentInput] = useState("");

  // Holds the presigned URL from S3
  const [quiltUrl, setQuiltUrl] = useState([]);

  useEffect(() => {
    dispatch({
      type: "FETCH_CHOSEN_QUILT",
      payload: quiltName,
    });
  }, []);

  // Waits for chosenQuilt to pull, then sets the comment to the DB value
  useEffect(() => {
    if (chosenQuilt.length > 0) {
      setComment(currentQuilt.quiltComment);
    }
  }, [chosenQuilt]);

  // Fetches the presigned URL from S3 for the chosen quilt image
  useEffect(() => {
    const fetchPresignedUrl = () => {
      if (quiltName) {
        const formattedQuiltString = quiltName.replaceAll("/", "$");
        axios
          .get(`/api/url/generate-presigned-url-quilt/${formattedQuiltString}`)
          .then((response) => {
            setQuiltUrl(response.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };

    if (quiltName.length > 0) {
      fetchPresignedUrl();
    }
  }, [quiltName]);

  const handleComment = (event) => {
    if (event.target.value) {
      setComment(event.target.value);
      setCommentInput(event.target.value);
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    const data = {
      quiltName: quiltName,
      quiltComment: comment,
    };
    dispatch({
      type: "ADD_QUILT_INFO",
      payload: data,
    });
    setCommentInput("");
    alert("Saved!");
  };

  return (
    <Box sx={{ marginLeft: 3 }}>
      <Typography
        variant="h4"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Add a comment to your quilt!
      </Typography>
      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box sx={{ width: "50vh", wordWrap: "break-word" }}>
          <Box sx={{ border: 1, p: 4 }}>
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
            <Button type="submit" variant="contained" sx={{ marginBottom: 1 }} onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => history.push("/dashboard")}>Back</Button>
          </Box>
        </Box>
        <Box>
          <Card sx={{ width: 750 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {formattedQuiltName}
              </Typography>
            </CardContent>
            <CardMedia
              sx={{ height: 750 }}
              image={quiltUrl.url}
              title={formattedQuiltName}
            />
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
