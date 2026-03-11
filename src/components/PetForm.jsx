import React, { useState, useEffect } from 'react';
import styles from '../pages/PetsPage.module.css';
import { FaTimes } from "react-icons/fa";

function PetForm({ onSubmit, initialData = {}, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    species: '', 
    sex: '',
    birthDate: '',
    image: ''
  });

  // Prefill form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        species: initialData.species || '',
        sex: initialData.sex || '',
        birthDate: initialData.birthDate || '',
        image: initialData.image || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.species || !formData.birthDate) {
      alert('Please fill in name, species, and birth date');
      return;
    }

    const payload = {
      name: formData.name,
      species: formData.species,
      sex: formData.sex.toLowerCase() || 'female',
      birthDate: formData.birthDate,
      image: formData.image
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['pet-form']}>
      <input
        type="text"
        name="name"
        placeholder="Pet Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="species"
        placeholder="Species"
        value={formData.species}
        onChange={handleChange}
        required
      />
      <select name="sex" value={formData.sex} onChange={handleChange} required>
        <option value="">Sex</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="date"
        name="birthDate"
        placeholder="Birthday"
        value={formData.birthDate}
        onChange={handleChange}
      />
      {/* <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} /> */}
      <button type="submit"> 
        {initialData?.name ? " Save" : " Add Pet"} </button>
        {onCancel && <button type="button" onClick={onCancel}><FaTimes/> 
      </button>}
    </form>
  );
}

export default PetForm;