// Je récupère les données des photographes
const photographerInfo = getPhotographer();

// Je récupère les médias des photographes
const photographerMedia = getMedia();

/****************************************************************************************************************************************/
/*****************************************************ELEMENTS DE PAGE*******************************************************************/
/****************************************************************************************************************************************/

// Fonction qui génère le header de chaque photographe
function createPhotographHeader(photographerElement) {

  // Je destructurise l'objet relatif aux photographes pour extraire les éléments
  const { name, city, country, tagline, portrait } = photographerElement;

  // Je crée la section photographes contenant les éléments
  const photographSection = document.createElement('section');
  photographSection.innerHTML =
  `   <div class="photograph-info">
          <h1 class="photograph-name">${name}</h1>
          <p class="photograph-location">${city}, ${country}</p>
          <p class="photograph-tagline">${tagline}</p>
      </div>
      <button class="contact-button" id="contactBtn" aria-label="Bouton d'ouverture du modal de contact" onclick="displayModal('contactModal')">Contactez-moi</button>
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
  
    selectDiv.innerHTML =
    ` <p class="select-p">Trier par</p>
      <div class="dropdown" id="select-menu">
        <div class="button-style">
          <button class="sort-btn" aria-haspopup="listbox" onclick="editDropdown()">Popularité
          </button>
          <span class="fas fa-chevron-down" id="chevron-down" role='button'></span>
        </div>
        <ul id="dropdown-tri">
          <li class="tri" role='option'>Popularité<span class="fas fa-chevron-up"></span></li>
          <li class="tri" role="option" id="date">Date</li>
          <li class="tri" role="option">Titre</li>
        </ul>
    </div>`

  // J'injecte le menu de sélection dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(selectDiv);
  const sortButton = Array.from(document.getElementsByClassName("tri"));
  sortButton.forEach((button) => button.addEventListener("click", sortMediaSection()));

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
  // Je destructurise l'objet relatif aux photographes pour extraire les prix 
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

// Fonction qui déploie le menu déroulant
function editDropdown(){  
  // Je récupère les éléments dont j'ai besoin
   let dropdown = document.getElementById("select-menu");
   let sortButton = document.getElementsByClassName("button-style");
 
   // Je pause une condition : si mon menu possède la classe dropdown
   if (dropdown.className === "dropdown") {
    // Je lui ajoute la classe "open" pour qu'il s'affiche
     dropdown.className += " open";
     // J'applique un display none à mon bouton pour le masquer
     sortButton[0].style.display="none";
 
  // Sinon la classe de mon menu passe à "dropdown open"
   } else {
     dropdown.className = "dropdown open";
   }
   
}

// Fonction qui ferme le menu déroulant
function closeDropdown(){  
  // Je récupère les éléments dont j'ai besoin
    let dropdown = document.getElementById("select-menu");
    const sortButton = document.getElementsByClassName("button-style");
    
  // Je pause une condition : si mon menu possède la classe dropdown open
  if (dropdown.className === "dropdown open") {
    // Je supprime la classe "open" pour le masquer
     dropdown.classList.remove("open");
     // Je passe mon bouton en display flex pour l'afficher
     sortButton[0].style.display="flex";
     
    // Sinon la classe de mon menu passe à "dropdown"
    } else {
      dropdown.className = "dropdown";
    }

}

// Fonction qui effectue le tri
function sortMediaSection() {
  // Je récupère la valeur de l'option sélectionnée
  let newOrder = [];
  let btnSort = document.querySelector(".sort-btn");
  let sortBtn = Array.from(document.getElementsByClassName("tri"));
    
  console.log({sortBtn});
    
  // Je parcours mon tableau de boutons indexés et déclenche une fonction au click
  sortBtn.forEach((btn, index) => btn.addEventListener("click", () => {

    // Si mon élément de liste est indexé à 0
    if (index == 0) {
      // Je change l'appelation de mon bouton
      btnSort.innerHTML = "Popularité";
      newOrder = photographerMedia.sort((a, b) => {
        // Je retourne le nombre de likes pour ma variable b, - le nombre de likes de ma variable a 
        return b.likes - a.likes;
      });
    }

    // Si mon bouton est indexé à 1
    if (index == 1) {
      // Je change l'appelation de mon bouton
      btnSort.innerHTML = "Date";
      newOrder = photographerMedia.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }

    // Je trie le tableau photographerMedia en utilisant la clé likes si l'option sélectionnée est "Titre".
    if (index == 2) {
      // Je change l'appelation de mon bouton
      btnSort.innerHTML = "Titre";
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

    // Je récupère ma section de médias et la stocke dans une constante
    const mediaSection = document.getElementsByClassName("media-section");
    // Je supprime ma section de médias
    mediaSection[0].remove();

    // Je fais apparaître ma nouvelle section de médias avec le tri effectué
    createMediaSection(newOrder);

    // J'ajoute un écouteur d'évènement sur chaque bouton de like pour déclencher la fonction countLike après le tri effectué
    const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
    mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", countLikes);
    });

    // J'appelle ma fonction closeDropdown pour fermer le menu déroulant après avoir effectué le tri
    const sortBtn = Array.from(document.getElementsByClassName("tri"));
    sortBtn.forEach((button) => button.addEventListener("click", closeDropdown()));

  }));

}

// Fonction asynchrone qui ouvre la lightbox et passe l'Id de chaque média en paramètre
async function createLightBox(mediaId) {
  // Je vais récupérer chaque ID de médias présent dans mon tableau et les stocke dans ma constante
  const mediaArray = await photographerMedia.find((media) => media.id == mediaId);

  // Je fais correspondre la variable currentMediaId avec l'identifiant actuel de ma lightbox
  currentMediaId = mediaId;

  // Je destructurise l'objet relatif aux photographes pour extraire les éléments
  const { title, photographerId, image, video } = mediaArray;

  // Je récupère L'ID de ma Lightbox 
  const lightboxMedia = document.getElementById("lightboxMedia");

  // Je pause une condition : si le média est une image, j'injecte mon image dans le HTML de ma lightbox
  if (image) {
    lightboxMedia.innerHTML = `
      <img class="lightbox-img" src="assets/images/${photographerId}/${image}" alt="${title}">
      <figcaption class="lightbox-caption">${title}</figcaption>
  `;
  }

  // Je pause une condition : si le média est une image, j'injecte mon image dans le HTML de ma lightbox
  if (video) {
    lightboxMedia.innerHTML = `
      <video class="lightbox-video" title="${title}" controls>
        <source src="assets/images/${photographerId}/${video}" type="video/mp4">
      </video>
      <figcaption class="lightbox-caption">${title}</figcaption>
  `;
  }
}


// Fonction qui rappelle tous les addEventlisteners nécessaires à l'exécution des animations
function addEventListeners() {
 
  // J'ajoute un écouteur d'évènement sur chaque bouton de like pour déclencher la fonction countLike
  const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
  button.addEventListener("click", countLikes);
  });

}

// Fonction asynchrone qui intègre les éléments statiques et les animations à ma page de photographes
async function createPhotographMedia() {
  // Je crée mon header dans la page de photographes en appelant ma fonction createPhotographHeader
  await createPhotographHeader(photographerInfo);

  // Je crée mon menu de tri
  await createFilterMenu();

  // Je crée mes médias 
  await createMediaSection(photographerMedia);

  // Je crée mon footer
  await createFooter(photographerInfo);

  // J'insère le nom du photographe dans le titre de ma modale de contact
  await photographNameInsert(photographerInfo);

  // J'appelle tous mes écouteurs d'évènement
  addEventListeners();
}

// J'appelle la fonction createPhotographMedia() qui va générer tous ces éléments
createPhotographMedia();