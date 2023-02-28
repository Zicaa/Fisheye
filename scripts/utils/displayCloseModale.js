// Fonction qui ouvre les modales
function displayModal(contactModal) {
    // Je récupère l'ID de ma modale et le passe en paramètre de ma fonction
    const modal = document.getElementById(contactModal);
    // Je récupère le header, le corps et le footer de ma page
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
  
    // J'affiche ma modale grâce à la méthode showModal()
    modal.showModal();
    // Je lui applique le display flex pour qu'elle soie visible 
    modal.style.display = "flex";
    // Je lui applique l'attribut "aria-hidden : false" pour la rendre visible au lecteur d'écran
    modal.setAttribute("aria-hidden", "false");
    // J'applique l'attribut "aria-hidden : true" aux balises header, main et footer pour les masquer au lecteur d'écran
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    footer.setAttribute("aria-hidden", "true");
  }
  
// Fonction qui ferme les modales
function closeModal(contactModal) {
    // Je récupère l'ID de ma modale et le passe en paramètre de ma fonction
    const modal = document.getElementById(contactModal);
    // Je récupère le header, le corps et le footer de ma page
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
  
    // Je ferme ma modale grâce à la méthode close()
    modal.close();
    // Je lui applique le display none pour la masquer
    modal.style.display = "none";
    // Je lui applique l'attribut "aria-hidden : true" pour la masquer au lecteur d'écran
    modal.setAttribute("aria-hidden", "true");
    // J'applique l'attribut "aria-hidden : false" aux balises header, main et footer pour les rendre visibles au lecteur d'écran
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    footer.setAttribute("aria-hidden", "false");
  }
   