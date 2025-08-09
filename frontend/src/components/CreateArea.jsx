// src/components/CreateArea.jsx
import React, { useState } from "react";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import { Fab, Zoom } from "@mui/material";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://keeper-app-3-khpc.onrender.com";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  }

  async function submitNote(event) {
    event.preventDefault();
    if (!note.title.trim() && !note.content.trim()) return; // prevent empty notes

    try {
      const res = await axios.post(`${BASE_URL}/api/notes`, note);
      props.onAdd(res.data); // use backend response so _id is included
      setNote({ title: "", content: "" });
      setExpanded(false);
    } catch (error) {
      console.error("Error adding note:", error);
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
