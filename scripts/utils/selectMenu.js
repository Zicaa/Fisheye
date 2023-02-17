export async function createSelectMenu(){

  /*
  // Nabar qui se déploie/replie en cliquant sur le bouton select
  let customSelect;

  
    customSelect = document.getElementsByClassName("custom-select");
  
    if (customSelect.className === "custom-select") {
      customSelect.className += "select-selected";
  
    } else {
      customSelect.className = "select-selected";
    }

}
*/


// Je crée les variables qui vont stocker mes éléments
let i, j, customSelect, customSelectL, selectElmnt, selectElmntL, a, b, c;
// Je récupère tous les éléments avec la classe "custom-select"
customSelect = document.getElementsByClassName("custom-select");
// Je les stocke dans un tableau
customSelectL = customSelect.length;

// Je crée une boucle qui va servir à générer le menu déroulant
for (i = 0; i < customSelectL; i++) {
  // Je récupère le premier élément sélect de mon tableau et le stocke
  selectElmnt = customSelect[i].getElementsByTagName("select")[0];
  selectElmntL = selectElmnt.length;
  // Pour chaque élément, je crée une nouvelle div et lui applique la classe "select-selected", 
  // qui indiquera que mon élmnt est sélectionné
  a = document.createElement("div");
  a.setAttribute("class", "select-selected");
  // J'insère mon objet dans le HTML
  a.innerHTML = selectElmnt.options[selectElmnt.selectedIndex].innerHTML;
  customSelect[i].appendChild(a);
  // Pour chaque élément, je crée une nouvelle div et lui applique la classe "select-items select-hide"
  // qui masquera mes éléments non sélectionnés
  b = document.createElement("div");
  b.setAttribute("class", "select-items select-hide");

  // Je crée une boucle qui va gérer l'attribution des classes
  for (j = 1; j < selectElmntL; j++) {
    // Pour chaque option dans l'élément de sélection original, je crée une nouvelle div qui agira comme un élément d'option
    c = document.createElement("div");
    // J'intègre dans mon HTML la première option indexée
    c.innerHTML = selectElmnt.options[j].innerHTML;
    // Au clic sur l'option, je déclenche une fonction 
    c.addEventListener("click", function(e) {
        
      // Je crée les variables qui vont stocker mes éléments
        let y, i, k, parentNode, parentNodeL, previousParent, yl;
        // Je vais chercher mon premier élément parent qui est le sélect et le stocke
        parentNode = this.parentNode.parentNode.getElementsByTagName("select")[0];
        // Je génère un tableau de tous mes noeuds d'éléments parents 
        parentNodeL = parentNode.length;
        // Je vais chercher mon noeud parent immédiat grâce à previousSibling
        previousParent = this.parentNode.previousSibling;
        //selectClass = document.getElementsByClassName("select-selected");
        //selectClass.innerHTML +="Popularité";

        for (i = 1; i < parentNodeL; i++) {
          if (parentNode.options[i].innerHTML == this.innerHTML) {
            parentNode.selectedIndex = i;
            previousParent.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        parentNode.click();
    });
    b.appendChild(c);
  }
  customSelect[i].appendChild(b);
  a.addEventListener("click", function(e) {
    
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

  function closeAllSelect(elmnt) {
  
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  document.addEventListener("click", closeAllSelect);
  //document.addEventListener("click", createSelectMenu);

 
  function modifySelect(selectClass) {

   selectClass = document.getElementsByClassName("select-selected");
            
      if (selectElmnt === selectClass) {
        selectClass[0].innerHTML +="Popularité";
    }
  }
  customSelect[0].addEventListener("click", modifySelect);

}

