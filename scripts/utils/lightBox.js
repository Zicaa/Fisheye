let currentMediaId=0;

// Fonction asynchrone qui crée le contenu de la lightbox
async function createLightBoxMedia(mediaId) {
    // La méthode find me retourne le 1er élément trouvé : j'indique qu'il correspond à chaque ID de média
    const IdArray = await photographerMedia.find(
      (media) => media.id == mediaId
    );
  
    // Je mets à jour la variable currentMediaId avec l'identifiant actuel de la boîte à lumière.
    currentMediaId = mediaId;
  
    // Je destructurise l'objet relatif aux photographes pour extraire les éléments
    const { title, photographerId, image, video } = IdArray;
  
    // Je récupère l'ID de la lightbox
    const lightboxMedia = document.getElementById("lightboxMedia");
  
    // Si le média est une image, j'ajoute le html approprié à l'élément lightboxMedia
    if (image) {
      lightboxMedia.innerHTML = `
        <img class="lightbox-img" src="assets/images/${photographerId}/${image}" alt="${title}">
        <figcaption class="lightbox-caption">${title}</figcaption>
    `;
    }
  
    // Si le média est une vidéo, j'ajoute le html approprié à l'élément lightboxMedia
    if (video) {
      lightboxMedia.innerHTML = `
        <video class="lightbox-video" title="${title}" controls>
          <source src="assets/images/${photographerId}/${video}" type="video/mp4">
        </video>
        <figcaption class="lightbox-caption">${title}</figcaption>
    `;
    }

}
  
// Fonction qui active le média suivant au click
function nextLightBoxMedia() {
// Je récupère l'index de l'élément média actuel dans le tableau photographerMedia
const currentIndex = photographerMedia.findIndex(
    (media) => media.id == currentMediaId
    );
  
    // Si l'élément multimédia actuel n'est pas le dernier élément du tableau, j'affiche l'élément suivant
    if (currentIndex < photographerMedia.length - 1) {
      const nextMediaId = photographerMedia[currentIndex + 1].id;
      createLightBoxMedia(nextMediaId);
      // Sinon, j'affiche le premier élément du tableau
    } else {
      const nextMediaId = photographerMedia[0].id;
      createLightBoxMedia(nextMediaId);
    }

}
  
// J'ajoute un écouteur d'événements qui déclenche la fonction nextLightBoxMedia au click
const nextBtn = document.getElementById("lightboxNextBtn");
nextBtn.addEventListener("click", nextLightBoxMedia);
  
// Fonction qui active le média précédent au click
function previousLightBoxMedia() {
    // Je récupère l'index de l'élément média actuel dans le tableau photographerMedia
    const currentIndex = photographerMedia.findIndex(
      (media) => media.id == currentMediaId
    );
  
    // Si l'élément multimédia actuel n'est pas le premier élément du tableau, j'affiche l'élément précédent
    if (currentIndex > 0) {
      const previousMediaId = photographerMedia[currentIndex - 1].id;
      createLightBoxMedia(previousMediaId);
      // Sinon, j'affiche le dernier élément du tableau
    } else {
      const previousMediaId = photographerMedia[photographerMedia.length - 1].id;
      createLightBoxMedia(previousMediaId);
    }
}
  
// J'ajoute un écouteur d'événements qui déclenche la fonction nextLightBoxMedia au click
const previousBtn = document.getElementById("lightboxPreviousBtn");
previousBtn.addEventListener("click", previousLightBoxMedia);
  