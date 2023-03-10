/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// Fonction qui gère les likes
function countLikes() {
    // Je récupère la div contenant le nombre de likes en sélectionnant le 1er enfant du noeud parent de mon btn
    const mediaLikeContent = this.parentNode.firstElementChild;

    // Je récupère l'icône like grâce au premier enfant de mon btn
    const mediaLikeIcon = this.firstElementChild;

    // Je pose une condition : si la classe de mon icône inclue "fa-regular"
    if (mediaLikeIcon.classList.contains("fa-regular")) {
      // J'accède au nombre de like de chaque média et le stocke dans la variable mediaLikeCount
      let mediaLikeCount = mediaLikeContent.textContent;

      // J'incrémente ma variable mediaLikeCount : le nombre de like augmente de 1
      mediaLikeCount++;

      // Je définie la valeur de mediaLikeCount en tant que nouveau contenu du bouton de like
      mediaLikeContent.textContent = mediaLikeCount;

      // Je recalcule le nombre total de likes dans le footer en appelant la fonction createFooter
      createFooter(photographerInfo);

      // Je remplace la classe "fa regular" par "fa solid"
      mediaLikeIcon.classList.replace("fa-regular", "fa-solid");

      // Sinon : si la classe de mon icône inclue "fa-solid"
      } else if (mediaLikeIcon.classList.contains("fa-solid")) {
        // J'accède au nombre de like de chaque média et le stocke dans la variable mediaLikeCount
        let mediaLikeCount = mediaLikeContent.textContent;

        // Je décrémente ma variable mediaLikeCount
        mediaLikeCount--;

        // Je définie la valeur de mediaLikeCount en tant que nouveau contenu du bouton de like
        mediaLikeContent.textContent = mediaLikeCount;

        // Je recalcule le nombre total de likes dans le footer en appelant la fonction createFooter
        createFooter(photographerInfo);

        // Je remplace la classe "fa solid" par "fa regular" 
        mediaLikeIcon.classList.replace("fa-solid", "fa-regular");
      }

  }