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
  // Pour chaque élément, je crée une nouvelle div et lui applique la classe "select-selected"
  a = document.createElement("div");
  a.setAttribute("class", "select-selected");
  // J'insère mon objet dans le HTML
  a.innerHTML = selectElmnt.options[selectElmnt.selectedIndex].innerHTML;
  customSelect[i].appendChild(a);
  //  Pour chaque élément, je crée une nouvelle div et lui applique la classe "select-items select-hide"
  b = document.createElement("div");
  b.setAttribute("class", "select-items select-hide");

  // Je crée une boucle qui va gérer l'attribution des classes
  for (j = 0; j < selectElmntL; j++) {
    // Pour chaque option dans l'élément de sélection original, je crée une nouvelle div qui agira comme un élément d'option
    c = document.createElement("div");
    c.innerHTML = selectElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        
        let y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsById("same-as-selected");
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

}

