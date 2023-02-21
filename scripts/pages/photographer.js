// Je récupère les données des photographes
const photographerInfo = getPhotographer();

// Je récupère les médias des photographes
const photographerMedia = getMedia();

/****************************************************************************************************************************************/
/*****************************************************ELEMENTS DE PAGE*******************************************************************/
/****************************************************************************************************************************************/

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
  ` <div class="wrapper">
    <div class="select-selected" id="select-menu">
    <input type="text" placeholder="Popularité" readonly />
    <ul class="options">
      <li class="option" value="Popularité">Popularité</li>
      <li class="option" value="Date">Date</li>
      <li class="option" value="Titre">Titre</li>
    </ul>
  </div>
</div>`;

  // J'injecte le menu de sélection dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(selectDiv);
  const selectMenu = document.getElementById("select-menu");
  selectMenu.addEventListener("change", sortMediaSection);

}

function createSelectMenu(){  
 // Variables
const selectMenu = document.getElementById("select-menu");
const listOfOptions = document.querySelectorAll(".option");
const input = document.querySelector('input');


// Functions
const toggleDropdown = (event) => {
  event.stopPropagation();
  selectMenu.classList.toggle("opened");
};

const selectOption = (event) => {
  input.value = event.currentTarget.textContent;
};

const closeDropdownFromOutside = () => {
  if (selectMenu.classList.contains("opened")) {
    selectMenu.classList.remove("opened");
  }
};
// Event Listeners

selectMenu.addEventListener('click', closeDropdownFromOutside);

listOfOptions.forEach((option) => {
  option.addEventListener('click', selectOption);
});

selectMenu.addEventListener('click', toggleDropdown);
selectMenu.addEventListener("change", sortMediaSection);
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

// Fonction qui génère le prix en bas de page
function createFooter(photographPrice) {
  // Je destructurise l'objet relatif aux photographes pour extraire les prix et les stocker
  const {price} = photographPrice;

  // Je calcule le total des likes à ajouter à ma section footer
  const mediaLikeCount = document.querySelectorAll(".media-like-count");
  let totalMediaLikeCount = 0;

  mediaLikeCount.forEach((media) => {
    totalMediaLikeCount += Number(media.textContent);
  });

  // Je crée le HTML de mon footer
  const photographFooter = `
    <aside class="footer">
      <div class="footer-container">
        <span class="footer-likes" id="totalLikesCount">${totalMediaLikeCount}</span>
        <i class="fa-solid fa-heart"></i>
      </div>
      <p>${price} € / jour</p>
    </aside>
  `;

  // J'injecte le footer dans mon HTML
  const footerEl = document.querySelector("footer");
  footerEl.innerHTML = photographFooter;
}

/****************************************************************************************************************************************/
/*****************************************************ANIMATIONS*************************************************************************/
/****************************************************************************************************************************************/

// Fonction qui gère les likes
function countLikes() {
  // Je récupère le boutton like grâce au premier enfant du noeud parent
  const mediaLikeButton = this.parentNode.firstElementChild;

  // Je récupère l'icône like grâce au premier enfant de mon élément
  const mediaLikeIcon = this.firstElementChild;

  // Je pose une condition : si la classe de mon icône inclue "fa-regular"
  if (mediaLikeIcon.classList.contains("fa-regular")) {
    // Je convertie le contenu du bouton de like en un nombre et je le stocke dans la variable mediaLikeCount
    let mediaLikeCount = Number(mediaLikeButton.textContent);

    // J'incrémente ma variable mediaLikeCount
    mediaLikeCount++;

    // Je définie la valeur de mediaLikeCount en tant que nouveau contenu du bouton de like
    mediaLikeButton.textContent = mediaLikeCount;

    // Je recalcule le nombre total de likes dans le footer en appelant la fonction createFooter
    createFooter(photographerInfo);

    // Je remplace la classe "fa regular" par "fa solid"
    mediaLikeIcon.classList.replace("fa-regular", "fa-solid");

    // Sinon : si la classe de mon icône inclue "fa-solid"
    } else if (mediaLikeIcon.classList.contains("fa-solid")) {
      // Je convertie le contenu du bouton de like en un nombre et je le stocke dans la variable mediaLikeCount
      let mediaLikeCount = Number(mediaLikeButton.textContent);

      // Je décrémente ma variable mediaLikeCount
      mediaLikeCount--;

      // Je définie la valeur de mediaLikeCount en tant que nouveau contenu du bouton de like
      mediaLikeButton.textContent = mediaLikeCount;

      // Je recalcule le nombre total de likes dans le footer en appelant la fonction createFooter
      createFooter(photographerInfo);

      // Je remplace la classe "fa solid" par "fa regular" 
      mediaLikeIcon.classList.replace("fa-solid", "fa-regular");
    }
}

// Fonction qui effectue le tri
function sortMediaSection() {
  // Je récupère la valeur de l'option sélectionnée
  const selectedOption = this.value;
  let newOrder = [];

  // Je trie le tableau photographerMedia en utilisant la clé likes si l'option sélectionnée est "Popularité".
  if (selectedOption == "Popularité") {
    newOrder = photographerMedia.sort((a, b) => {
      return b.likes - a.likes;
    });
  }

  // Je trie le tableau photographerMedia en utilisant la clé likes si l'option sélectionnée est "Date".
  if (selectedOption == "Date") {
    newOrder = photographerMedia.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  // Je trie le tableau photographerMedia en utilisant la clé likes si l'option sélectionnée est "Titre".
  if (selectedOption == "Titre") {
    newOrder = photographerMedia.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  const mediaSection = document.getElementsByClassName("media-section");
  mediaSection[0].remove();
  createMediaSection(newOrder);

  // J'ajoute un écouteur d'évènement sur chaque bouton de like pour déclencher la fonction countLike
  const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
  button.addEventListener("click", countLikes);
  });

}

function addEventListeners() {

  // J'ajoute un écouteur d'évènement sur chaque bouton de like pour déclencher la fonction countLike
  const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", countLikes);
  });

}

async function createPhotographMedia() {
  // Je crée mon header dans la page de photographes en appelant ma fonction createPhotographHeader
  await createPhotographHeader(photographerInfo);

  // Je crée mon menu de tri
  await createFilterMenu();
  await createSelectMenu();

  // Je crée mes médias 
  await createMediaSection(photographerMedia);

  // Je crée mon footer
  await createFooter(photographerInfo);

  // J'appelle tous mes écouteurs d'évènement
  addEventListeners();
}

// J'appelle la fonction createPhotographMedia() qui va générer tous ces éléments
createPhotographMedia();