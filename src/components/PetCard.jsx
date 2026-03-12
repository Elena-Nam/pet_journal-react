import React from 'react';
import styles from '../pages/PetsPage.module.css';

function PetCard({ pet, onClick }) {
  return (
    <div className={styles['pet-card']} onClick={onClick}>
      <img src={pet.image || 'https://via.placeholder.com/140'} alt={pet.name} />
      <div className={styles['pet-name']}>{pet.name}</div>
    </div>
  );
}

export default PetCard;