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
      <button class="contact-button" id="contactBtn" aria-label="Bouton d'ouverture du modal de contact">Contactez-moi</button>
      <div class="photograph-portrait">
          <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">
      </div>`;

   // J'ajoute une classe à mon élément
   photographSection.classList="photograph-header";

  // J'injecte la section des photographes dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(photographSection);
}

// Fonction qui génère le menu de tri
function createFilterMenu() {

  // Je crée le menu de tri
  const selectDiv = document.createElement('div');

  // J'ajoute une classe à mon élément
  selectDiv.classList="custom-select";
  selectDiv.style="width:170px";

  selectDiv.innerHTML =
  ` <select class="select-selected" id="select-menu>
      <option value="Popularité">Popularité</option>
      <option value="Date">Date</option>
      <option value="Titre">Titre</option>
    </select>`;

  // J'injecte le menu de sélection dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(selectDiv);

}

// Fonction qui effectue le tri
async function sortMediaSection() {
  // Je récupère la valeur de l'option sélectionnée
  const selectedOption = this.value;

  // Je trie le tableau photographerMedia en utilisant la clé likes si l'option sélectionnée est "Popularité".
  if (selectedOption == "Popularité") {
    await photographerMedia.sort((a, b) => {
      return b.likes - a.likes;
    });
  }

  // Je trie le tableau photographerMedia en utilisant la clé likes si l'option sélectionnée est "Date".
  if (selectedOption == "Date") {
    await photographerMedia.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  // Je trie le tableau photographerMedia en utilisant la clé likes si l'option sélectionnée est "Titre".
  if (selectedOption == "Titre") {
    await photographerMedia.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }
  
}
const selectMenu = document.getElementById("select-menu");
selectMenu.addEventListener("change", sortMediaSection);

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

// Fonction qui génère le prix en bas de page
function createFooter(photographPrice) {
  // Je destructurise l'objet relatif aux photographes pour extraire les prix et les stocker
  const {price} = photographPrice;

  const photographFooter = document.createElement('aside');
  photographFooter.innerHTML =`
    <aside class="footer-aside">
        <div class="footer-favicon">
          <i class="fa-solid fa-heart"></i>
        </div>
        <p>${price} € / jour</p>
    </aside>`;

  // Add the footer section HTML to the footer element
  const footer = document.querySelector("footer");
  footer.appendChild(photographFooter);
}

// Fonction qui intègre les éléments dans ma page photographes
async function createPhotographPage() {
  // Intégration du header des photographes avec leurs infos
  await createPhotographHeader(photographerInfo);

  // Intégration du menu de sélection
  await createFilterMenu();
  await createSelectMenu();
  await sortMediaSection();

  // Intégration de la section de médias
  await createMediaSection(photographerMedia);

  // Intégration du footer
  await createFooter(photographerInfo);

}

// J'appelle la fonction qui créé mes éléments
createPhotographPage();