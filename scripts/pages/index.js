// eslint ne reconnaît pas les fonctions et variables qui sont déjà déclarées et utilisées
/* eslint-disable no-undef */

// Fonction qui récupère les éléments de ma factory
function displayData(photographers) {
	// Je recupere la div ou injecter les éléments dans le DOM
	const photographersSection = document.querySelector('.photographer_section')
	// Je parcours les éléments du tableau de photographes grâce à un forEach
	photographers.forEach((photographer) => {
		// Je stocke le résult de ma fonction photographerFactory dans une constante et lui passe mon objet photographe en paramètre
		const photographerModel = photographerFactory(photographer)
		// Je stocke le résultat de ma fonction servant à créer les cartes des photographes dans une constante
		const userCardDOM = photographerModel.getUserCardDOM()
		// J'insère à l'intérieur de ma section les cartes crées grâce à un appenChild
		photographersSection.appendChild(userCardDOM)
	})
}

// Fonction qui crée les éléments de ma page d'accueil
function init() {
	// J'appelle ma fonction displayData et lui passe mon tableau de photographes en paramètre
	displayData(photographers)
}
// J'appelle ma fonction init pour créer les éléments
init()
    
