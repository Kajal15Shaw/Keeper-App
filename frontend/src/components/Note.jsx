import React from "react";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteForeverTwoToneIcon />
      </button>
    </div>
  );
}

export default Note;