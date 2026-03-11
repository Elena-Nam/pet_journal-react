import React, { useEffect, useState } from 'react';
import { fetchAllPets, addPet, deletePet, editPet } from '../services/PetServices';
import PetCard from '../components/PetCard';
import PetForm from '../components/PetForm';
import { useNavigate } from 'react-router-dom';
import styles from './PetsPage.module.css';
import { FaPlus, FaEdit, FaTrash} from "react-icons/fa";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import Modal from "../components/Modal"; 


function PetsPage() {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
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
    setEditingPet(null);
    setShowForm(true);
  };
  

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPet(null);
  };


// Handle form submission
  const handleFormSubmit = async (petData) => {
    if (editingPet) {
      // Editing existing pet
      const updatedPet = await editPet(editingPet._id || editingPet.id, petData);
      setPets(prev => prev.map(p => (p._id === updatedPet._id || p.id === updatedPet.id ? updatedPet : p)));
      setEditingPet(null);
    } else {
      // Adding new pet
      const addedPet = await addPet(petData);
      setPets([...pets, addedPet]);
    }
    setShowForm(false);
  };


  const handleDeletePet = async (id) => {
    await deletePet(id);
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

    
  const handleEditPet = (pet) => {
    setEditingPet(pet);  
    setShowForm(true); 
  };

  return ( 
  <>
    <Navbar/>
    <div className= {styles.petsContainer}>
        
    <h1 className = {styles.title}> My Pets </h1>
    {loading ? (
      <p>Loading...</p>
    ) : (
    <div className = {styles.pet_grid}>
      {pets.map(pet => (
        <div key={pet.id} >
        <PetCard
          key={pet.id}
          pet={pet}
          onClick={() => navigate(`/pets/${pet._id || pet.id}`, { state: { pet } }) }/>
        <div className={styles.pillButtonGroup}>
        <button onClick={() => handleEditPet(pet)}>
          <FaEdit size ={30} color="white"/>
        </button>
        <button onClick={() => handleDeletePet(pet.id)}>
          <FaTrash size ={30} color="#FF6347"/>
        </button>
        </div> 
      </div>  
    ))}
    </div>
      )}
      <button onClick={handleAddPet} className={styles.addPetButton}> <FaPlus size={40}/>  Add PET</button>
      <Modal isOpen={showForm} onClose={handleFormCancel}>
        <PetForm
          initialData={editingPet || {}}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </Modal>

      <Footer/>
    </div>
    
  </>
  );
}

export default PetsPage;