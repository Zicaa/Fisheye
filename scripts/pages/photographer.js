import { mediaFactory } from "../factories/mediaFactory.js";
import { getPhotographer } from "../utils/getJsonData.js";
import { getMedia } from "../utils/getJsonData.js";


// Je récupère les données des photographes
const photographerInfo = await getPhotographer();

// Je récupère les médias des photographes
const photographerMedia = await getMedia();

// Fonction qui génère le header de chaque photographe
function createPhotographHeader(photographerElement) {
  // Je destructurise l'objet relatif aux photographes pour stocker les éléments
  const { name, city, country, tagline, portrait } = photographerElement;

  // Je crée la section photographes conetnant les éléments
  const createPhotographSection = document.createElement('section');
  createPhotographSection.innerHTML =
  `   <div class="photograph-info">
          <h1 class="photograph-name">${name}</h1>
          <p class="photograph-location">${city}, ${country}</p>
          <p class="photograph-tagline">${tagline}</p>
      </div>
      <button class="button" id="contactBtn" aria-label="Bouton d'ouverture du modal de contact">Contactez-moi</button>
      <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">`;

   // J'ajoute la classe à styliser dans le CSS
   createPhotographSection.classList="photograph-header";

  // J'injecte les éléments dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(createPhotographSection);
}


// Fonction qui intègre les éléments dans ma page photographes
async function createPhotographPage() {
  // Intégration du header des photographes leurs infos
  await createPhotographHeader(photographerInfo);

}

// J'appelle la fonction qui créé mes éléments
createPhotographPage();