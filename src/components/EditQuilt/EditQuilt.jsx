import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

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
    <div>
      <h1>Add a comment for your quilt!</h1>
      <h2>{formattedQuiltName}</h2>
      <img src={quiltUrl.url} height="1000" />
      <div>
        <h3>Comment</h3>
        {comment ? <p>{comment}</p> : <p>You haven't added a comment yet.</p>}
      </div>
      <form>
        <input
          type="text"
          placeholder="Add a Comment"
          value={commentInput}
          onChange={handleComment}
        />
        <button type="submit" onClick={handleSave}>
          Save
        </button>
      </form>
      <button onClick={() => history.push("/dashboard")}>Back</button>
    </div>
  );
}
