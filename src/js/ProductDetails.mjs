


export default class ProductDetails {
  constructor(common_names, dataSource) {
    this.common_names = common_names;
    this.dataSource = dataSource;
    this.plant = {};
  }

  async init() {
    this.plant = await this.dataSource.findPlantByCommonNames(this.common_names); // Busca por nombres comunes
    if (this.plant) {
        this.renderPlantDetails("main"); // Muestra los detalles en el elemento principal
        document.getElementById('addToWish')
        .addEventListener('click', this.addToWish.bind(this)); // Configura el botón "Añadir a la Lista de Deseos"
    } else {
        console.error(`No se encontró ninguna planta con los nombres comunes: ${this.common_names}`);
    }
}

// Lógica para añadir la planta a la lista de deseos
addToWish() {
    let wishList = getLocalStorage("plant-wish") || [];
    const existingItemIndex = wishList.findIndex(item => item.id === this.plant.id);

    if (existingItemIndex > -1) {
        alert(`${this.plant["Common name (fr.)"]} ya está en tu lista de deseos.`);
    } else {
        wishList.push(this.plant); // Agrega la planta a la lista
        setLocalStorage("plant-wish", wishList); // Actualiza el localStorage
        alert(`${this.plant["Common name (fr.)"]} ha sido añadida a tu lista de deseos.`);
    }
}

// Renderiza los detalles de la planta en el DOM
renderPlantDetails(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`No se encontró el elemento con el selector "${selector}".`);
        return;
    }
    
    // Inserta la plantilla con los detalles de la planta
    element.insertAdjacentHTML("afterbegin", this.plantDetailsTemplate(this.plant));
}

// Plantilla de los detalles de la planta
plantDetailsTemplate(plant) {
    const commonNames = plant["Common name"].join(', ');
    const insects = plant.Insects ? plant.Insects.join(', ') : 'Ninguno';
    const uses = plant.Use ? plant.Use.join(', ') : 'No especificado';
    const temperatureRange = `${plant["Temperature min"].C}°C - ${plant["Temperature max"].C}°C`;
    
    return `
    <div class="plant-details">
        <h2>${plant["Common name (fr.)"] || 'Nombre desconocido'}</h2>
        <img src="${plant.img}" alt="${plant["Common name (fr.)"] || 'Nombre desconocido'}">
        <p><strong>Nombre en latín:</strong> ${plant["Latin name"] || 'Desconocido'}</p>
        <p><strong>Nombres comunes:</strong> ${commonNames || 'Desconocido'}</p>
        <p><strong>Familia:</strong> ${plant.Family || 'Desconocido'}</p>
        <p><strong>Usos:</strong> ${uses}</p>
        <p><strong>Insectos comunes:</strong> ${insects}</p>
        <p><strong>Rango de temperatura:</strong> ${temperatureRange}</p>
        <p><strong>Altura al comprar:</strong> ${plant["Height at purchase"].cm} cm</p>
        <p><strong>Ancho al comprar:</strong> ${plant["Width at purchase"].cm} cm</p>
        <p><strong>Riego:</strong> ${plant.Watering}</p>
        <button id="addToWish">Añadir a la Lista de Deseos</button>
    </div>`;
}
}

// Función auxiliar para obtener datos del localStorage
function getLocalStorage(key) {
const storedData = localStorage.getItem(key);
return storedData ? JSON.parse(storedData) : [];
}

// Función auxiliar para establecer datos en el localStorage
function setLocalStorage(key, data) {
localStorage.setItem(key, JSON.stringify(data));
}
