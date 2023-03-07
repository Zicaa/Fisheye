// Fonction qui déploie le menu déroulant
export function editDropdown(){  
    // Je récupère les éléments dont j'ai besoin
     let dropdown = document.getElementById("select-menu");
     let sortButton = document.getElementsByClassName("button-style");
   
     // Je pause une condition : si mon menu possède la classe dropdown
     if (dropdown.className === "dropdown") {
      // Je lui ajoute la classe "open" pour qu'il s'affiche
       dropdown.className += " open";
       // J'applique un display none à mon bouton pour le masquer
       sortButton[0].style.display="none";
   
    // Sinon la classe de mon menu passe à "dropdown open"
     } else {
       dropdown.className = "dropdown open";
     }
     
}
  
// Fonction qui ferme le menu déroulant
export function closeDropdown(){  
    // Je récupère les éléments dont j'ai besoin
      let dropdown = document.getElementById("select-menu");
      const sortButton = document.getElementsByClassName("button-style");
      
    // Je pause une condition : si mon menu possède la classe dropdown open
    if (dropdown.className === "dropdown open") {
      // Je supprime la classe "open" pour le masquer
       dropdown.classList.remove("open");
       // Je passe mon bouton en display flex pour l'afficher
       sortButton[0].style.display="flex";
       
      // Sinon la classe de mon menu passe à "dropdown"
      } else {
        dropdown.className = "dropdown";
      }
  
}