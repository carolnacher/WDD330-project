let savedPlants = []; 

export function displayWishlist() {
    const wishlistContainer = document.getElementById('wishlist');
    if (!wishlistContainer) {
        console.warn('Wishlist container not found. Function displayWishlist() will not run.');
        return; // Detén la ejecución si no estás en la página correcta
    }

    wishlistContainer.innerHTML = '';

    if (savedPlants.length === 0) {
        wishlistContainer.innerHTML = '<p>No plants in your wishlist.</p>';
    } else {
        savedPlants.forEach((plant, index) => {
            const plantCard = document.createElement('div');
            plantCard.classList.add('plant-card');

            const plantImage = document.createElement('img');
            plantImage.src = plant.Img || 'default.jpg'; // Usa una imagen por defecto si no hay imagen
            plantImage.alt = plant["Common name (fr.)"] || 'Unknown';

            const plantInfo = document.createElement('div');
            plantInfo.classList.add('plant-info');

            const plantName = document.createElement('h3');
            plantName.textContent = plant["Common name (fr.)"] || 'Unknown';

            const latinName = document.createElement('p');
            latinName.textContent = `Latin name: ${plant["Latin name"] || 'Unknown'}`;

            const family = document.createElement('p');
            family.textContent = `Family: ${plant.Family || 'Unknown'}`;

            // Botón para eliminar la planta de la lista de deseos
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => removeFromWishlist(index));

            plantInfo.appendChild(plantName);
            plantInfo.appendChild(latinName);
            plantInfo.appendChild(family);
            plantCard.appendChild(plantImage);
            plantCard.appendChild(plantInfo);
            plantCard.appendChild(removeButton);

            wishlistContainer.appendChild(plantCard);
        });
    }
}

export function addToWishlist(plant) {
    // Agrega la planta al array
    savedPlants.push(plant);
    
    // Actualiza el almacenamiento y la lista en pantalla
    updateLocalStorage();
    displayWishlist();
    
    console.log('Plant added to wishlist:', plant);
}

export function removeFromWishlist(plantIndex) {
    savedPlants.splice(plantIndex, 1);
    updateLocalStorage();
    displayWishlist();
}

export function updateLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(savedPlants));
}

export function loadWishlist() {
    const storedPlants = JSON.parse(localStorage.getItem('wishlist'));
    if (storedPlants) {
        savedPlants = storedPlants;
    }
    displayWishlist();  // Muestra la lista después de cargarla
}
