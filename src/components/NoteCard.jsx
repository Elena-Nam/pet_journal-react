
import styles from './NoteCard.module.css';

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className={styles.noteCard}>
      <p className={styles.noteItem}>Date: {new Date(note.date).toLocaleDateString()}</p>
      <h3 className={styles.noteItem}>Title: {note.title}</h3>
      <p className={styles.noteItem}> Content: {note.content}</p>
      <p className={styles.noteItem}>Category: {note.category}</p>
      
      <div className={styles.noteButtons}>
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;

