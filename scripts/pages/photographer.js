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
  selectDiv.innerHTML =
  `<div class ="select">
    <p class ="select-p">Trier par</p>
      <select class="select-button" id="filter-menu" aria-label="Menu de tri">
        <option value="0">Popularité</option>
        <option value="1">Date</option>
        <option value="2">Titre</option>
      </select>
  </div>`;

  // J'injecte le menu de sélection dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(selectDiv);

  // Je crée les variables qui vont stocker mes éléments
  let i, j, selectElmt, selectLength, selectMenu, selectMenuLenght, selectedLink, newOption, newOptionChoice;
  
  // Je récupère tous les éléments avec la classe "select"
  selectElmt = document.getElementsByClassName("select");
  // Je les stocke dans un tableau
  selectLength = selectElmt.length;
  // Je crée une boucle qui va servir à générer le menu déroulant
  for (i = 0; i < selectLength; i++) {
    // Je récupère mon élément sélect et le stocke
    selectMenu = selectElmt[i].getElementsByTagName("select")[0];
    selectMenuLenght = selectMenu.length;
    // Pour chaque élément, je crée une nouvelle div qui agira comme l'élément sélectionné : 
    selectedLink = document.createElement("div");
    selectedLink.setAttribute("class", "select-selected");
    selectedLink.innerHTML = selectMenu.options[selectMenu.selectedIndex].innerHTML;
    selectElmt[i].appendChild(selectedLink);
    //  Pour chaque élément, je crée une nouvelle div qui contiendra la liste des options 
    newOption = document.createElement("div");
    newOption.setAttribute("class", "select-items select-hide");
    // Je crée une boucle indexée à 0 pour faire apparaître les nouveaux menus
    for (j = 0; j < selectMenuLenght; j++) {
      // Pour chaque option dans l'élément de sélection original, je crée une nouvelle div qui agira comme un élément d'option : 
      newOptionChoice = document.createElement("div");
      newOptionChoice.innerHTML = selectMenu.options[j].innerHTML;
      newOptionChoice.addEventListener("click", function(e) {

          // Lorsqu'un élément est cliqué, mettre à jour la boîte de sélection originale et l'élément sélectionné 
          let i, k, newOptionParentElmt, newOptionParentElmtLenght, previousParentElmnt, parentNode, parentNodeLenght;

          newOptionParentElmt = this.parentNode.parentNode.getElementsByTagName("select")[0];
          newOptionParentElmtLenght = newOptionParentElmt.length;
          previousParentElmnt = this.parentNode.previousSibling;
          for (i = 0; i < newOptionParentElmtLenght; i++) {
            if (newOptionParentElmt.options[i].innerHTML == this.innerHTML) {
              newOptionParentElmt.selectedIndex = i;
              previousParentElmnt.innerHTML = this.innerHTML;
              parentNode = this.parentNode.getElementsByClassName("same-as-selected");
              parentNodeLenght = parentNode.length;
              for (k = 0; k < parentNodeLenght; k++) {
                this.parentNode[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          this.parentNode.click();
      });
      newOption.appendChild(newOptionChoice);
    }
    selectElmt[i].appendChild(newOption);
    selectedLink.addEventListener("click", function(e) {
      //Lorsque la boîte de sélection est cliquée, je ferme toutes les boîtes de sélection, j'ouvre la boîte de sélection actuelle :
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    // Fonction qui ferme toutes les boîtes de sélection dans le document, sauf la boîte de sélection actuelle :
    let x, y, i, xl, yl, arrNo = [];
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

  // Si l'utilisateur clique n'importe où en dehors de la boîte de sélection on ferme toutes les boîtes de sélection
  document.addEventListener("click", closeAllSelect);

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

  // Intégration de la section de médias
  await createMediaSection(photographerMedia);

  // Intégration du footer
  await createFooter(photographerInfo);

}

// J'appelle la fonction qui créé mes éléments
createPhotographPage();