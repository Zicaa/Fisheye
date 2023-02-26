1 // Fonction qui ouvre ma modale de portfolio
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

2 // Fonction qui ferme ma modale de portfolio
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

3 // Fonction qui intègre les noms des photographes dans le h1 de ma modale de contact
function photographNameInsert(photographerName) {
  // Je destructurise l'objet relatif aux photographes pour extraire les noms
  const { name } = photographerName;

  // J'ajoute le nom du photographe dans le H1 de ma modale de contact
  const modalTitle = document.querySelector(".modal-title");
  modalTitle.innerHTML = `Contactez-moi<br>${name}`;
}

4 // Vérification des données du formulaire

// Je récupère les éléments nécessaires aux vérifications
const firstname = document.getElementById ('firstName');
const firstnameError = document.getElementById ('first-error');
const lastname = document.getElementById ('lastName');
const lastnameError = document.getElementById ('last-error');
const email = document.getElementById ('email');
const emailError = document.getElementById ('email-error');
const message = document.getElementById ('message');
const messageError = document.getElementById ('message-error');

//  Initialisation des expressions régulières

let regexText= /^[A-ZÇÉÈÊËÀÂÎÏÔÙÛ]{1}[a-zçéèêëàâîïôùû]+[-]?[a-zçéèêëàâîïôùû]+$/i;
let regexEmail = /^([a-z0-9]+(?:\.[a-z0-9]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])?$/;

// Fonction qui valide les éléments du formulaire et prend l'event en paramètre
function validateForm(event) {
  // Je désactive l'envoi du formulaire par défaut pour effectuer ma vérification
  event.preventDefault();

  firstValidate=false;

    // Si le prénom ne correspond pas aux caractères autorisés par ma regex, si il y'a - de 2 caractères, si le champ est vide
    if (!firstname.value.match(regexText) || firstname.value.length < 2 || firstname.value == null) {
        firstnameError.innerHTML = 'Votre prénom est incomplet ou mal orthographié, veuillez le ressaisir.';
        firstnameError.classList.add("error-message");
        firstname.classList.add("error-class");
      } else {
        firstnameError.style.display='none';
        firstnameError.classList.remove("error-message");
        firstname.classList.remove("error-class");
        firstValidate=true;
    };

  lastValidate=false;

    // Si le nom ne correspond pas aux caractères autorisés par ma regex, si il y'a - de 2 caractères, si le champ est vide
    if (!lastname.value.match(regexText) || lastname.value.length < 2 || lastname.value == null) {
        lastnameError.innerHTML = 'Votre nom est incomplet ou mal orthographié, veuillez le ressaisir.';
        lastnameError.classList.add("error-message");
        lastname.classList.add("error-class");
      } else {
        lastnameError.style.display='none';
        lastnameError.classList.remove("error-message");
        lastname.classList.remove("error-class");
        lastValidate=true;
    };

  emailValidate=false;

    // Si le mail ne correspond pas aux caractères autorisés par ma regex, si le champ est vide
    if (!email.value.match(regexEmail) || email.value == null) {
        emailError.innerHTML = 'Veuillez entrer une adresse email valide.';
        emailError.classList.add("error-message");
        email.classList.add("error-class");
    } else {
        emailError.style.display='none';
        emailError.classList.remove("error-message");
        email.classList.remove("error-class");
        messageValidate=true;
    };

  messageValidate=false;

    // Si le format de message contient moins de 10 caractères, si le champ est vide
    if (message.value.length < 10 || message.value == null) { 
        messageError.innerHTML = 'Veuillez saisir au minimum 10 caractères.';
        messageError.classList.add("error-message");
        message.classList.add("error-class");
    } else {
        messageError.style.display='none';
        messageError.classList.remove("error-message");
        message.classList.remove("error-class");
        messageValidate=true;
    };

  if ((modalForm.firstValidate == true && modalForm.lastValidate == true && modalForm.emailValidate == true  && modalForm.messageValidate == true )) {
    console.log('Prénom : ' + firstname.value)
    console.log('Nom : ' + lastname.value)
    console.log('email : ' + email.value)
    console.log('message : ' + message.value)
    // Je vide les éléments du formulaire
    modalForm.reset();
    // Je ferme ma modale
    closeModal("contactModal");

  };

    // Je vide les éléments du formulaire
    modalForm.reset();
    // Je ferme ma modale
    closeModal("contactModal");
    
}

// J'ajoute un écouteur d'évènement pour fermer ma modale au click sur la croix
const modalCloseBtn = document.getElementById("modalCloseBtn");
modalCloseBtn.addEventListener("click", () => {
  closeModal("contactModal");
});

// J'ajoute un écouteur d'évènement sur le btn submit pour déclencher ma fonction de validation
const modalForm = document.getElementById("modalForm");
modalForm.addEventListener("submit", validateForm);