// eslint ne reconnaît pas les fonctions et variables qui sont déjà déclarées et utilisées
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

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
  
      // Après le tri :

      // J'ajoute un écouteur d'évènement sur chaque bouton de médias pour ouvrir la modale au click 
        const mediaCardButtons = document.querySelectorAll(".media-button-card");
        mediaCardButtons.forEach((card) => {
        card.addEventListener("click", () => {
        const mediaId = card.parentElement.id;
        // Je crée la lightbox en amont
        createLightBoxMedia(mediaId);
        // J'ouvre ma modale
        displayModal("lightboxModal");
        });
      });
  
      // J'ajoute un écouteur d'évènement sur chaque bouton de like pour déclencher la fonction countLike 
      const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
      mediaCardLikeButtons.forEach((button) => {
      button.addEventListener("click", countLikes);
      });
  
      // J'appelle ma fonction closeDropdown pour fermer le menu déroulant
      const sortBtn = Array.from(document.getElementsByClassName("tri"));
      sortBtn.forEach((button) => button.addEventListener("click", closeDropdown()));
  
    }));
  
  }