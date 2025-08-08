// src/components/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios"; // Import axios

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from the backend when the component loads
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  function addNote(newNote) {
    // We will let the CreateArea component handle the backend POST request
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem) => {
          return noteItem._id !== id;
        });
      });
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;