import { AiFillPauseCircle } from "react-icons/ai";

// const url = `http://localhost:3000/api/v1/pets`;
const API_URL = "https://pet-journal-r991.onrender.com/api/v1/pets";

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
}
export const fetchAllNotes = async (petId) => {
  const options = {
  method: 'GET',
  headers: getAuthHeaders(),
  };

  try {
    const response = await fetch(`${API_URL}/${petId}/notes`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
   
    return data.notes.map((note) => ({
      id: note._id,
      title: note.title,
      category: note.category || 'other',
      content: note.content,
      date: note.date,
      pet: note.pet
    })); 
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  };
  }
   
  
export  const addNote = async (petId, newNote) => {
  // console.log('Adding note to URL:', `${API_URL}/${petId}/notes`, 'Data:', newNote);
    const options = {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(newNote),
  };
   
  try {
    const response = await fetch(`${API_URL}/${petId}/notes`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return {
      id: data.note._id,
      title: data.note.title,
      category: data.note.category,
      content: data.note.content,
      date: data.note.date,
      pet: data.note.pet
      };
  } catch (error) {
    console.error("Error adding new note:", error.message);
    throw error;
  }
};
     

export const deleteNote = async (petId, noteId) => {
  
  const removeUrl = `${API_URL}/${petId}/notes/${noteId}`;
  // console.log('Deleting note URL:', removeUrl);
  const options = {
    method: 'DELETE',
    headers: getAuthHeaders(),
  };

  try {
    const response = await fetch(removeUrl, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Error: ${response.status} ${errorData.message || ''}`);
    }
    return;
  } catch (error) {
    console.error('Error removing a note:', error)
    throw error;
  }
  };
  

export const editNote = async (petId, noteId, noteData) => {
  try {
    if (!noteId) throw new Error('NoteID is missing');
    const response = await fetch(`${API_URL}/${petId}/notes/${noteId}`, {
      method: 'PATCH', 
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });

  if (!response.ok) throw new Error(`Error: ${response.status}`);

  const data = await response.json();
  return data;
  } catch (error) {
    console.error('Error updating note:', error.message);
    throw error;
  }
};




