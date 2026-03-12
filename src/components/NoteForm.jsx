import styles from "../pages/PetProfilePage.module.css"
import React, { useState, useEffect } from "react";

function NoteForm({ initialData = null, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setCategory(initialData.category || "");
      setDate(initialData.date || "");
    } else {
      setTitle("");
      setContent("");
      setCategory("");
      setDate("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, category, date, id: initialData?._id || null });
  };

  return (
    <div >
      <h1>{initialData?._id ? "Edit Note" : "Add Note"}</h1>
      <form onSubmit={handleSubmit} className={styles['note-form']}>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="health">Health</option>
          <option value="behavior">Behavior</option>
          <option value="vet">Vet</option>
          <option value="diet">Diet</option>
          <option value="other">Other</option>
        </select>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">{initialData?._id ? "Save" : "Add"}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NoteForm;