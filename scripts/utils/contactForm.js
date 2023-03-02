// Fonction qui intègre les noms des photographes dans le h1 de ma modale de contact
 function photographNameInsert(photographerName) {
  // Je destructurise l'objet relatif aux photographes pour extraire les noms
  const { name } = photographerName;

  // J'ajoute le nom du photographe dans le H1 de ma modale de contact
  const modalTitle = document.querySelector(".modal-title");
  modalTitle.innerHTML = `Contactez-moi<br>${name}`;

} 

// Je récupère les éléments nécessaires aux vérifications
const firstname = document.getElementById ('firstName');
const firstnameError = document.getElementById ('first-error');
const lastname = document.getElementById ('lastName');
const lastnameError = document.getElementById ('last-error');
const email = document.getElementById ('email');
const emailError = document.getElementById ('email-error');
const message = document.getElementById ('message');
const messageError = document.getElementById ('message-error');

// Initialisation des expressions régulières

let regexText= /^[A-ZÇÉÈÊËÀÂÎÏÔÙÛ]{1}[a-zçéèêëàâîïôùû]+[-]?[a-zçéèêëàâîïôùû]+$/i;
let regexEmail = /^([a-z0-9]+(?:\.[a-z0-9]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])?$/;

// Fonction qui valide les éléments du formulaire et prend l'event en paramètre
function validateForm(event) {

  // Je désactive l'envoi du formulaire par défaut pour effectuer ma vérification de données
  event.preventDefault();

  let firstValidate=false;

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
    }

  let lastValidate=false;

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
    }

  let emailValidate=false;

    // Si le mail ne correspond pas aux caractères autorisés par ma regex, si le champ est vide
    if (!email.value.match(regexEmail) || email.value == null) {
        emailError.innerHTML = 'Veuillez entrer une adresse email valide.';
        emailError.classList.add("error-message");
        email.classList.add("error-class");
    } else {
        emailError.style.display='none';
        emailError.classList.remove("error-message");
        email.classList.remove("error-class");
        emailValidate=true;
    }

  let messageValidate=false;

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
    }

  if ((firstValidate == true && lastValidate == true && emailValidate == true  && messageValidate == true )) {
    console.log('Prénom : ' + firstname.value)
    console.log('Nom : ' + lastname.value)
    console.log('email : ' + email.value)
    console.log('message : ' + message.value)
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