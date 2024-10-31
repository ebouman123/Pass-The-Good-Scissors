import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function EditFabric() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const fabricName = location.state;
  const formattedFabricName = fabricName.split("/").pop();

  const chosenFabric = useSelector((store) => store.chosenFabric);
  const currentFabric = chosenFabric[0];

  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");

  const [linkInput, setLinkInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    dispatch({
      type: "FETCH_CHOSEN_FABRIC",
      payload: fabricName,
    });
  }, []);

  useEffect(() => {
    if (chosenFabric.length > 0) {
      setComment(currentFabric.fabricComment);
      setLink(currentFabric.fabricLink);
    }
  }, [chosenFabric]);

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
    alert('Saved!')
  };

  return (
    <div>
      <h1>Add a link or comment to your fabric!</h1>
      <h2>{formattedFabricName}</h2>
      <div>
        <h3>Comment</h3>
        {comment ? <p>{comment}</p> : <p>You haven't added a comment yet.</p>}
      </div>
      <div>
        <h3>Fabric Link</h3>
        {link ? (
          <p>
            <a href={link} target="_blank">
              {link}
            </a>
          </p>
        ) : (
          <p>You haven't added a link yet.</p>
        )}
      </div>
      <form>
        <input
          type="text"
          placeholder="Add a Link"
          value={linkInput}
          onChange={handleLink}
        />
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
      <button onClick={() => history.push("/fabrics")}>Back</button>
      {/* <button onClick={test}>Test</button> */}
    </div>
  );
}
