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
  ` <select class="select-selected" id="select-menu">
      <option value="Popularité">Popularité</option>
      <option value="Date">Date</option>
      <option value="Titre">Titre</option>
    </select>`;

  // J'injecte le menu de sélection dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(selectDiv);
  const selectMenu = document.getElementById("select-menu");
  selectMenu.addEventListener("change", sortMediaSection);

}

function createSelectMenu(){  
 
  // Je crée les variables qui vont stocker mes éléments
  let i, j, customSelect, customSelectL, selectElmnt, selectElmntL, a, b, c;
  // Je récupère tous les éléments avec la classe "custom-select"
  customSelect = document.getElementsByClassName("custom-select");
  // Je les stocke dans un tableau
  customSelectL = customSelect.length;
  
  // Je crée une boucle qui va servir à générer le menu déroulant
  for (i = 0; i < customSelectL; i++) {
    // Je récupère le premier élément sélect de mon tableau et le stocke
    selectElmnt = customSelect[i].getElementsByTagName("select")[0];
    selectElmntL = selectElmnt.length;
    // Pour chaque élément, je crée une nouvelle div et lui applique la classe "select-selected", 
    // qui indiquera que mon élmnt est sélectionné
    a = document.createElement("div");
    a.setAttribute("class", "select-selected");
    // J'insère mon objet dans le HTML
    a.innerHTML = selectElmnt.options[selectElmnt.selectedIndex].innerHTML;
    customSelect[i].appendChild(a);
    // Pour chaque élément, je crée une nouvelle div et lui applique la classe "select-items select-hide"
    // qui masquera mes éléments non sélectionnés
    b = document.createElement("div");
    b.setAttribute("class", "select-items select-hide");
  
    // Je crée une boucle qui va gérer l'attribution des classes
    for (j = 1; j < selectElmntL; j++) {
      // Pour chaque option dans l'élément de sélection original, je crée une nouvelle div qui agira comme un élément d'option
      c = document.createElement("div");
      // J'intègre dans mon HTML la première option indexée
      c.innerHTML = selectElmnt.options[j].innerHTML;
      // Au clic sur l'option, je déclenche une fonction 
      c.addEventListener("click", function(e) {
          
        // Je crée les variables qui vont stocker mes éléments
          let y, i, k, parentNode, parentNodeL, previousParent, yl;
          // Je vais chercher mon premier élément parent qui est le sélect et le stocke
          parentNode = this.parentNode.parentNode.getElementsByTagName("select")[0];
          // Je génère un tableau de tous mes noeuds d'éléments parents 
          parentNodeL = parentNode.length;
          // Je vais chercher mon noeud parent immédiat grâce à previousSibling
          previousParent = this.parentNode.previousSibling;
          //selectClass = document.getElementsByClassName("select-selected");
          //selectClass.innerHTML +="Popularité";
  
          for (i = 1; i < parentNodeL; i++) {
            if (parentNode.options[i].innerHTML == this.innerHTML) {
              parentNode.selectedIndex = i;
              previousParent.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          parentNode.click();
      });
      b.appendChild(c);
    }
    customSelect[i].appendChild(b);
    a.addEventListener("click", function(e) {
      
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  
    function closeAllSelect(elmnt) {
    
      var x, y, i, xl, yl, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }
  
  document.addEventListener("click", closeAllSelect);
  document.addEventListener("click", createSelectMenu);
    
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