import React from 'react';
import styles from '../pages/PetsPage.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa'
function PetCard({ pet, onClick , onEdit, onDelete}) {
  return (
    <>
    <div className={styles['pet-card']} onClick={onClick}>
      <img src={pet.image || 'https://via.placeholder.com/140'} alt={pet.name} />
      <div className={styles['pet-name']}>{pet.name}</div>
    </div>
    <div >
    <button onClick={onEdit} > <FaEdit /></button>
    <button onClick={onDelete} >   <FaTrash /> </button>
    </div>
    </>
  );
}

export default PetCard;