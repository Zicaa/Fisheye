// Fonction servant à créer les médias à partir du fichier json
export function mediaFactory(data) {
    // Extraction des données nécessaires et stockage dans une constante
    const { id, photographerId, title, image, video, likes } = data;
  
    // Fonction qui crée les cartes des photographes en retournqant les éléments du DOM
    function getMediaCardDOM() {
      // Je crée l'article à intégrer dans le HTML pour contenir mon média
      const article = document.createElement("article");
      article.classList.add("media-card");
      // J'ajoute un id à cet article correspondant à l'id du média
      article.id = id;
  
      // Je pose une condition : si le media est une image, je l'intègre grâce à un innerHTML dans l'article
      if (image) {
        article.innerHTML =
        // Je crée le bouton ouvrant la lightbox et intègre les images dans les cards
        `<button class="media-button-card" aria-label="Bouton ouvrant la lightbox">
          <img class="media-img-card" src="assets/images/${photographerId}/${image}" alt="${title}">
        </button>
        <section class="media-info-card">
            <h2 class="media-title-card">${title}</h2>
            <div class="media-like-content">
                <div class="media-like-count">${likes}</div>
                    <button class="media-like-button" aria-label="Coeur symbolisant un button like">
                    <i class="media-like-logo fa-heart fa-regular"></i>
                    </button>
            </div>
        </section>`;

      // Sinon j'intègre l'autre média (la vidéo) à mon article grâce à un innerHTML

      } else {
        article.innerHTML =
        // Je crée le bouton ouvrant la lightbox et intègre les vidéos dans les cards
        `<button class="media-button-card" aria-label="Bouton ouvrant la lightbox">
            <video class="media-video-card" title="${title}">
                <source src="assets/images/${photographerId}/${video}" type="video/mp4">
            </video>
        </button>
        <section class="media-info-card">
            <h2 class="media-title-card">${title}</h2>
            <div class="media-like-content">
                <div class="media-like-count">${likes}</div>
                <button class="media-like-button" aria-label="Coeur symbolisant un button like">
                <i class="media-like-logo fa-heart fa-regular"></i>
                </button>
            </div>
        </section>`;
      }
  
      // Je retourne l'élément article
      console.log(article);
      return article;
    }
  
    // Je retourne un objet avec la fonction getMediaCarDom
    return { getMediaCardDOM };
  }