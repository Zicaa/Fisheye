function displayModal(contactModal) {
  // Get the modal element
  const modal = document.getElementById(contactModal);
  // Get the header, main and footer elements
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

function closeModal(contactModal) {
  // Get the modal element
  const modal = document.getElementById(contactModal);
  // Get the header, main and footer elements
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");

  // Close the modal
  modal.close();
  modal.style.display = "none";
  // Set the aria-hidden attribute of the modal to true to indicate that it is hidden
  modal.setAttribute("aria-hidden", "true");
  // Set the aria-hidden attribute of the header, main and footer elements to false to indicate that they are visible
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
  footer.setAttribute("aria-hidden", "false");
}