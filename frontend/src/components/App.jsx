// src/components/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://keeper-app-3-khpc.onrender.com";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes on mount
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const response = await axios.get(`${BASE_URL}/api/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  function addNote(newNote) {
    // Immediately reflect in UI
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`${BASE_URL}/api/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((noteItem) => noteItem._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;