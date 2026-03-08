import React, { useState } from 'react';
import styles from '../pages/PetsPage.module.css';

function PetForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    sex: '',
    birthDate: '',
    image: ''
  });

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
    // createdBy is handled by backend via token
  };

  onSubmit(payload);
};

  return (
    <form onSubmit={handleSubmit} className={styles['pet-form']}>
      <input type="text" name="name" placeholder="Pet Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="species" placeholder="Species" value={formData.species} onChange={handleChange} required />
      <select name="sex" value={formData.sex} onChange={handleChange} required>
        <option value="">Sex</option>
        <option value="Male">male</option>
        <option value="Female">female</option>
      </select>
      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
      {/* <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} /> */}
      <button type="submit">Add Pet</button>
    </form>
  );
}

export default PetForm;