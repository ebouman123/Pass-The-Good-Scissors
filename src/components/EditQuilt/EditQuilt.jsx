import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

export default function EditQuilt() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const quiltName = location.state;
  const formattedQuiltName = quiltName.split("/").pop();

  const chosenQuilt = useSelector((store) => store.chosenQuilt);
  const currentQuilt = chosenQuilt[0];

  const [comment, setComment] = useState("");
  const [commentInput, setCommentInput] = useState("");

  const [quiltUrl, setQuiltUrl] = useState([]);

  useEffect(() => {
    dispatch({
      type: "FETCH_CHOSEN_QUILT",
      payload: quiltName,
    });
  }, []);

  useEffect(() => {
    if (chosenQuilt.length > 0) {
      setComment(currentQuilt.quiltComment);
    }
  }, [chosenQuilt]);

  useEffect(() => {
    const fetchPresignedUrl = () => {
      if (quiltName) {
        // Request a presigned URL for the specific quilt
        const formattedQuiltString = quiltName.replaceAll("/", "$");

        axios
          .get(`/api/url/generate-presigned-url-quilt/${formattedQuiltString}`)
          .then((response) => {
            setQuiltUrl(response.data);
          })
          .catch((err) => {
            console.error("error on the front end yo", err);
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
      {/* <button onClick={test}>TEST</button> */}
    </div>
  );
}
