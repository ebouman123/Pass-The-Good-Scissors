import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function EditFabric() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const fabricName = location.state
  const formattedFabricName = fabricName.replaceAll("/", "$");

  const [link, setLink] = useState('');
  const [comment, setComment] = useState('');

  const handleLink = (event) => {
    setLink(event.target.value)
  }

  const handleComment = (event) => {
    setComment(event.target.value)
  }

  const handleSave = (event) => {
    event.preventDefault();
    const data = {
        fabricName: formattedFabricName,
        fabricLink: link,
        fabricComment: comment
    }
    dispatch({
        type: 'ADD_FABRIC_INFO',
        payload: data
    })
    //TODO: Add "Saved" Notification
    history.push("/fabrics")
  };

  return (
    <div>
      <form>
        <input 
        type="text"
        placeholder="Add a Link"
        value={link}
        onChange={handleLink}
         />
        <input 
        type="text"
        placeholder="Add a Comment"
        value={comment}
        onChange={handleComment}
         />
        <button type="submit" onClick={handleSave}>
          Save
        </button>
      </form>
      <button onClick={() => history.push("/fabrics")}>Back</button>
    </div>
  );
}
