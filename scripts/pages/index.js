// eslint ne reconnaît pas les fonctions et variables qui sont déjà déclarées et utilisées
/* eslint-disable no-undef */

// Fonction qui crée les éléments de ma page d'accueil
function displayData(photographers) {
	// Je recupere la div ou injecter les éléments dans le DOM
	const photographersSection = document.querySelector('.photographer_section')
	// Je parcours les éléments du tableau de photographes grâce à un forEach
	photographers.forEach((photographer) => {
		// Je récupère les éléments de mon objet de photographes grâce à ma fonction photographerFactory
		const photographerModel = photographerFactory(photographer)
		// Je crée les cards grâce à ma fonction getUserCardDOM
		const userCardDOM = photographerModel.getUserCardDOM()
		// J'insère à l'intérieur de ma section les cartes crées grâce à un appenChild
		photographersSection.appendChild(userCardDOM)
	})
}

// Fonction qui intègre les éléments de ma page d'accueil
function init() {
	// J'appelle ma fonction displayData et lui passe mon tableau de photographes en paramètre
	displayData(photographers)
	console.log(photographers);
}
// J'appelle ma fonction init pour créer les éléments
init()
    
