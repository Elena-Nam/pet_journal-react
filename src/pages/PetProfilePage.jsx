import React, { useEffect, useState} from 'react'
import { useNavigate, useParams} from "react-router-dom";
import { fetchAllNotes, addNote, deleteNote, editNote } from '../services/NoteServices';
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import styles from './PetProfilePage.module.css';
import { FaSearch } from "react-icons/fa";
import Modal from "../components/Modal"; 


function PetProfilePage() {
  const { id: petId } = useParams();
  // console.log("PetProfilePage petId:", petId);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortField, setSortField] = useState('time');


  useEffect(() => {
    fetchAllNotes(petId)
      .then(setNotes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [petId]);

  const navigate = useNavigate();
// const location = useLocation();
// const pet = location.state?.pet;
  const handleAddNote = (petId, noteData) => {
    setEditingNote(null);
    setShowForm(true);
  };
  

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingNote(null);
  };


  // Handle form submission
  const handleFormSubmit = async (noteData) => {
    if (editingNote) {
        // Editing existing note
        const updatedNote = await editNote(petId, editingNote._id || editingNote.id, noteData);
        setNotes(prev => prev.map(note => {
        const noteId = note.id || note._id;
        const updatedNoteId = updatedNote.id || updatedNote._id;
        return noteId === updatedNoteId ? { ...note, ...updatedNote } : note;
      }));

      setEditingNote(null);
      setShowForm(false); // hide form after edit
    } else {
      // Adding new pet
      const addedNote = await addNote(petId, noteData);
      setNotes(prev => [...prev, addedNote]);
      setShowForm(false);
    };
  }

  const handleDeleteNote = async ( noteId) => {
    try{
    // console.log('Deleting note:', noteId, 'for pet:', petId);
    await deleteNote(petId, noteId);
    setNotes(prev => prev.filter(note => (note.id || note._id) !== noteId));
    } catch (error) {
    console.error("Error deleting note:", error.message);
  }
  };


  // Function to change sorting field
  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };

const processedNotes = [...notes]
  .filter((n) => (category ? n.category === category : true))
  .filter((n) =>
    search ? n.title?.toLowerCase().includes(search.toLowerCase()) : true
  )
  .filter((n) =>
    date ? new Date(n.date).toISOString().slice(0, 10) === date : true
  )
  .sort((a, b) => {
    if (sortField === "time") {
      return sortDirection === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }

    return sortDirection === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });


  
return (
  <div className={styles.petProfileContainer}>
    <Navbar />

    <div className={styles.layout}>

      <div className={styles.column}>
        <div className={styles.sorting}>
          <span>Sort by:</span>
          <select value={sortField} onChange={handleSortFieldChange}>
            <option value="title">Title</option>
            <option value="time">Time</option>
          </select>
        </div>

        <div className={styles.notesFilters}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="health">Health</option>
            <option value="behavior">Behavior</option>
            <option value="vet">Vet</option>
            <option value="diet">Diet</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className={styles.column}>
        {/* <div className={styles.petInfo}>
          <h1>The place for pet details</h1> */}
          {/* <h2>{pet.name}</h2>
              <p>Breed: {pet.breed}</p>
              <p>Age: {pet.age} years</p> */}
        {/* </div> */}

        <div className={styles.notesSection}>
          <div className={styles.notesCards}>
            {loading ? (
              <p>Loading notes...</p>
            ) : processedNotes.length > 0 ? (
              processedNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={(note) => {
                    setEditingNote(note);
                    setShowForm(true);
                  }}
                  onDelete={() => handleDeleteNote(note.id || note._id)}
                />
              ))
            ) : (
              <h2>No notes found</h2>
            )}
          </div>

          <div className={styles.addBtn}>
            <button
              onClick={() => {
                setEditingNote(null);
                setShowForm(true);
                
              }}
            >
              Add New Note
            </button>
          </div>
        </div>
      </div>

     
      <div className={styles.column}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div> 
      </div>
    </div>
      <Modal isOpen={showForm} onClose={handleFormCancel}>
          {showForm && (
            <NoteForm
              initialData={editingNote}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          )}
      </Modal>
    <Footer />
  </div>
);

}


export default PetProfilePage;