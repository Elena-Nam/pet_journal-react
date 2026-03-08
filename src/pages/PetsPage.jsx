import React, { useEffect, useState } from 'react';
import { fetchAllPets, addPet, deletePet, editPet } from '../services/PetServices';
import PetCard from '../components/PetCard';
import PetForm from '../components/PetForm';
import { useNavigate } from 'react-router-dom';
import styles from './PetsPage.module.css';

function PetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPets()
      .then(setPets)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

 const handleAddPet = () => {
  setShowForm(true);
};
  // };


  const handleFormClose = () => {
    setShowForm(false); // close the form
  };

// Called after the user fills the form
const handlePetSubmit = async (newPet) => {
  try {
    console.log('Submitting new pet:', newPet);
    const addedPet = await addPet(newPet); // backend call happens here
    setPets([...pets, addedPet]);          // update frontend list
    setShowForm(false);                     // close form
  } catch (err) {
    console.error('Failed to add pet:', err);
    alert('Error adding pet. Make sure all fields are filled correctly.');
  }
};

  const handleDeletePet = async (id) => {
    await deletePet(id);
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

 const handleEditPet = async (id) => {
  try {
    const updatedPetData = { name: 'Luna Updated' }; // or from form input
    const updatedPet = await editPet(id, updatedPetData);

    setPets((prev) =>
      prev.map(p => (p.id === id ? updatedPet : p)) // use _id, not id
    );
  } catch (err) {
    console.error('Error updating pet:', err);
    alert('Failed to update pet. Check if the pet exists.');
  }
};

  return (
    <div className= {styles.petsContainer}>
      <h1>My Pets</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        // <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div className = {styles.pet_grid}>
          {pets.map(pet => (
            <PetCard
              key={pet.id}
              pet={pet}
              
              onClick={() => navigate(`/pets/${pet._id || pet.id}`)}
              onEdit={() => handleEditPet(pet.id)}
              onDelete={() => handleDeletePet(pet.id)}
            />
                
          ))}

        </div>
      )}
      <button onClick={handleAddPet} className={styles.addPetButton}> + </button>
      <p> Add PET</p>
      {showForm && (
        <PetForm
          onSubmit={handlePetSubmit}
          onCancel={handleFormClose} // optional cancel button
        />
      )}
    </div>
  );
}

export default PetsPage;