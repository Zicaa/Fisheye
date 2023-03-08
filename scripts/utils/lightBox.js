// eslint ne reconnaît pas les fonctions et variables qui sont déjà déclarées et utilisées
// des imports et exports corrigent ce phénomène mais sont non lisibles par les navigateurs récents (CORS policy)
/* eslint-disable no-undef */

// J'initialise une variable à zéro qui contiendra l'id du média actuel
let currentMediaId=0;

// Fonction qui crée le contenu de la lightbox avec l'ID de chaque média en paramètre
function createLightBoxMedia(mediaId) {
    // La méthode find me retourne le 1er élément trouvé : j'indique qu'il correspond à chaque ID de média
    const IdArray = photographerMedia.find(
      (media) => media.id == mediaId
    );
  
    // Je mets à jour la variable currentMediaId avec l'identifiant actuel du média
    currentMediaId = mediaId;
  
    // Je destructurise l'objet relatif aux photographes pour extraire les éléments
    const { title, photographerId, image, video } = IdArray;
  
    // Je récupère l'ID de la lightbox
    const lightboxMedia = document.getElementById("lightboxMedia");
  
    // Si le média est une image, j'ajoute le html approprié à l'élément lightboxMedia ainsi que sa classe et sa légende
    if (image) {
      lightboxMedia.innerHTML = `
        <img class="lightbox-img" src="assets/images/${photographerId}/${image}" alt="${title}">
        <figcaption class="lightbox-caption">${title}</figcaption>
    `;
    }
  
    // Si le média est une vidéo, j'ajoute le html approprié à l'élément lightboxMedia ainsi que sa classe et sa légende
    if (video) {
      lightboxMedia.innerHTML = `
        <video class="lightbox-video" title="${title}" controls>
          <source src="assets/images/${photographerId}/${video}" type="video/mp4">
        </video>
        <figcaption class="lightbox-caption">${title}</figcaption>
    `;
    }

}

// Fonction qui affiche le média suivant au click
function nextMedia() {
// Je récupère l'index de l'élément média actuel dans le tableau photographerMedia
const currentIndex = photographerMedia.findIndex(
    // La condition recherchée avec findIndex : l'ID du média correspond à celui affiché
    (media) => media.id == currentMediaId
    );
  
    // Si l'élément multimédia actuel n'est pas le dernier élément du tableau
    if (currentIndex < photographerMedia.length - 1) {
      // J'affiche l'élément suivant en avançant de +1 dans mon tableau
      const nextMediaId = photographerMedia[currentIndex + 1].id;
      // J'appelle ma fonction createLightBoxMedia pour générer les éléments et lui passe ma fonction callBack en paramètre
      createLightBoxMedia(nextMediaId);
      // Sinon, j'affiche le premier élément du tableau
    } else {
      const nextMediaId = photographerMedia[0].id;
      createLightBoxMedia(nextMediaId);
    }

}
  
// J'ajoute un écouteur d'événements qui déclenche la fonction nextMedia au click
const nextBtn = document.getElementById("lightboxNextBtn");
nextBtn.addEventListener("click", nextMedia);
  
// Fonction qui affiche le média précédent au click
function previousMedia() {
    // Je récupère l'index de l'élément média actuel dans le tableau photographerMedia
    const currentIndex = photographerMedia.findIndex(
      // La condition recherchée avec findIndex : l'ID du média correspond à celui affiché
      (media) => media.id == currentMediaId
    );
  
    // Si l'élément multimédia actuel n'est pas le premier élément du tableau (indexé à zéro)
    if (currentIndex > 0) {
      // J'affiche l'élément précédent en reculant de -1 dans mon tableau
      const previousMediaId = photographerMedia[currentIndex - 1].id;
      // J'appelle ma fonction createLightBoxMedia pour générer les éléments et lui passe ma fonction callBack en paramètre
      createLightBoxMedia(previousMediaId);
      // Sinon, j'affiche le dernier élément du tableau
    } else {
      const previousMediaId = photographerMedia[photographerMedia.length - 1].id;
      createLightBoxMedia(previousMediaId);
    }
}
  
// J'ajoute un écouteur d'événements qui déclenche la fonction nextMedia au click
const previousBtn = document.getElementById("lightboxPreviousBtn");
previousBtn.addEventListener("click", previousMedia);

// J'ajoute un écouteur d'évènement à ma lightboxModal pour voir les médias précédent/suivant en appuyant sur les touches de mon clavier
document.addEventListener("keydown", (event) => {
  // Je récupère l'ID de ma lightbox
  const lightboxModal = document.getElementById("lightboxModal");

  // Si la lightbox est ouverte et que la touche flèche gauche est enfoncée : j'appelle la fonction previousMedia
  if (lightboxModal.open && event.key === "ArrowLeft") {
    previousMedia();
  }

  // Si la lightbox est ouverte et que la touche flèche droite est enfoncée : j'appelle la fonction nextMedia
  if (lightboxModal.open && event.key === "ArrowRight") {
    nextMedia();
  }

  // Si la lightbox est ouverte et que la touche escape est enfoncée : je ferme la modale
  if (lightboxModal.open && event.key === "Escape") {
    closeModal("lightboxModal");
  }
});