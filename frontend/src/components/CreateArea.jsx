// src/components/CreateArea.jsx
import React, { useState } from "react";
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import { Fab, Zoom } from "@mui/material";
import axios from 'axios'; // Import axios for making API requests

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  async function submitNote(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/notes', note);
      props.onAdd(note); // This will add the note to your local state for a seamless UI update
      setNote({
        title: "",
        content: "",
      });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <MapsUgcOutlinedIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;