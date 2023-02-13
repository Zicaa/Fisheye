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

  // Je crée la section photographes contenant les éléments
  const photographSection = document.createElement('section');
  photographSection.innerHTML =
  `   <div class="photograph-info">
          <h1 class="photograph-name">${name}</h1>
          <p class="photograph-location">${city}, ${country}</p>
          <p class="photograph-tagline">${tagline}</p>
      </div>
      <button class="contact_button" id="contactBtn" aria-label="Bouton d'ouverture du modal de contact">Contactez-moi</button>
      <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">`;

   // J'ajoute une classe à mon élément
   photographSection.classList="photograph-header";

  // J'injecte la section des photographes dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(photographSection);
}

// Fonction qui génère le menu de tri
function createFilterMenu() {

  // Je crée le menu de tri
  const selectButton = document.createElement('select');
  selectButton.innerHTML =
  `<select class="filter-menu" id="filter-menu" aria-label="Menu de tri">
      <option class="filter-menu-options" value=""> Trier par </option>
      <option class="filter-menu-options" value="Popularité">Popularité</option>
      <option class="filter-menu-options" value="Date">Date</option>
      <option class="filter-menu-options" value="Titre">Titre</option>
    </select>`;

  // J'ajoute une classe à mon élément
  selectButton.classList="select-button";

  // J'injecte le menu de sélection dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(selectButton);
}

// Fonction qui génère la galerie de médias
function createMediaSection(array) {

  // Je crée la section contenant les médias
  const mediaSection = document.createElement("section");

  // Je parcours mon tableau de médias
  array.forEach((media) => {
    // Je crée une nouvelle card pour chacun d'entre eux en appelant ma fonction mediaFactory
    const mediaCardModel = mediaFactory(media);
    // Je vais chercher les éléments du DOM grâce à ma fonction callback getMediaCardDOM
    const mediaCardDOM = mediaCardModel.getMediaCardDOM();
    // J'injecte les nouvelles cards de medias dans ma section medias
    mediaSection.appendChild(mediaCardDOM);
  });

   // J'ajoute une classe à mon élément
   mediaSection.className = "media-section";

  // J'injecte la section de médias dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(mediaSection);
}

// Fonction qui intègre les éléments dans ma page photographes
async function createPhotographPage() {
  // Intégration du header des photographes avec leurs infos
  await createPhotographHeader(photographerInfo);

  // Intégration du menu de sélection
  await createFilterMenu();

  // Intégration de la section de médias
  await createMediaSection(photographerMedia);

}

// J'appelle la fonction qui créé mes éléments
createPhotographPage();