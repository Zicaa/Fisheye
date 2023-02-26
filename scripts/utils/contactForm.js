// Fonction qui ouvre ma modale de portfolio
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

// Fonction qui ferme ma modale de portfolio
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

// Fonction qui intègre les noms des photographes dans le h1 de ma modale de contact
function photographNameInsert(photographerName) {
  // Je destructurise l'objet relatif aux photographes pour extraire les noms
  const { name } = photographerName;

  // J'ajoute le nom du photographe dans le H1 de ma modale de contact
  const modalTitle = document.querySelector(".modal-title");
  modalTitle.innerHTML = `Contactez-moi<br>${name}`;
}

// Fonction qui valide les éléments du formulaire et prend l'event en paramètre
function validateForm(event) {
  // Je désactive l'envoi du formulaire par défaut pour effectuer ma vérification
  event.preventDefault();

  // Je récupère mes éléments de modale et leurs inputs
  const modalForm = document.getElementById("modalForm");

  // J'utilise la méthode checkValidity pour vérifie si les éléments sont valides par rapport aux patterns du HTML
  if (modalForm.checkValidity()) {
    // Je vide les éléments du formulaire
    modalForm.reset();
    // Je ferme ma modale
    closeModal("contactModal");
  }
}

// J'ajoute un écouteur d'évènement pour fermer ma modale au click sur la croix
const modalCloseBtn = document.getElementById("modalCloseBtn");
modalCloseBtn.addEventListener("click", () => {
  closeModal("contactModal");
});

// J'ajoute un écouteur d'évènement sur le btn submit pour déclencher ma fonction de validation
const modalForm = document.getElementById("modalForm");
modalForm.addEventListener("submit", validateForm);