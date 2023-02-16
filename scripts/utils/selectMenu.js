// Je crée les variables qui vont stocker mes éléments
let i, j, c, selectElmt, selectLength, selectMenu, selectMenuLenght, selectedLink, newOption;
  
// Je récupère tous les éléments avec la classe "select"
selectElmt = document.getElementsByClassName("select");
// Je les stocke dans un tableau
selectLength = selectElmt.length;
// Je crée une boucle qui va servir à générer le menu déroulant
for (i = 0; i < selectLength; i++) {
  // Je récupère mon élément sélect et le stocke
  selectMenu = selectElmt[i].getElementsByTagName("select")[0];
  selectMenuLenght = selectMenu.length;
  // Pour chaque élément, je crée une nouvelle div qui agira comme l'élément sélectionné : 
  selectedLink = document.createElement("div");
  selectedLink.setAttribute("class", "select-selected");
  selectedLink.innerHTML = selectMenu.options[selectMenu.selectedIndex].innerHTML;
  selectElmt[i].appendChild(selectedLink);
  //  Pour chaque élément, je crée une nouvelle div qui contiendra la liste des options 
  newOption = document.createElement("div");
  newOption.setAttribute("class", "select-items select-hide");
  // Je crée une boucle indexée à 1 pour faire apparaître les nouveaux menus
  for (j = 0; j < selectMenuLenght; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selectMenu.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    newOption.appendChild(c);
  }
  selectElmt[i].appendChild(newOption);
  selectedLink.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
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

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

