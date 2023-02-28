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