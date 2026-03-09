
const url = `http://localhost:3000/api/v1/pets`;

const token = localStorage.getItem('token');

const authHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
};

export const fetchAllPets = async () => {
const token = localStorage.getItem('token');

const authHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
};
    const options = {
      method: 'GET',
      headers: authHeaders
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      
      return data.pets.map((pet) => ({ 
          id: pet._id,
          name: pet.name,
          species: pet.species,
          sex: pet.sex,
          birthDate: pet.birthDate

      }));
          
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error;
  };
  }
export  const addPet = async (newPet) => {
    const options = {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(newPet),
    };
   
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return {
          id: data.pet._id,
          name: data.pet.name,
          species: data.pet.species,
          sex: data.pet.sex,
          birthDate: data.pet.birthDate
        };
    } catch (error) {
    console.error("Error adding new pet:", error.message);
  }
  };

export const deletePet = async (id) => {
    const removeUrl = `${url}/${id}`;
    const options = {
      method: 'DELETE',
      headers: authHeaders
    };

    try {
      const response = await fetch(removeUrl, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
     return;
    } catch (error) {
      console.error('Error removing a pet:', error);
      throw error;
    }
  };
  
export const editPet = async (id, updatedPet) => {
  try {
     if (!id) throw new Error('Pet ID is missing');

    const response = await fetch(`${url}/${id}`, {
      method: 'PATCH', 
      headers: authHeaders,
      body: JSON.stringify(updatedPet),
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
return data;
  
  } catch (error) {
    console.error('Error updating pet:', error.message);
    throw error;
  }
};


