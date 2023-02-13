import { photographerFactory } from "../factories/photographerFactory.js";
import { fetchJson } from "../utils/getJsonData.js";

// Fonction asynchrone qui crée les éléments dans la page index
async function displayData(photographers) {
	// Je recupere la div ou injecter les éléments dans le DOM
	const photographersSection = document.querySelector('.photographer_section')
	// Je parcours les éléments du tableau de photographes du json grâce à un forEach
	photographers.forEach((photographer) => {
		// Je stocke le résult de ma fonction photographerFactory dans une constante et lui passe mon photographe en paramètre
		const photographerModel = photographerFactory(photographer)
		// Je stocke le résultat de ma fonction servant à créer les cartes des photographes dans une constante
		const userCardDOM = photographerModel.getUserCardDOM()
		// J'insère à l'intérieur de ma section les cartes crées grâce à un appenChild
		photographersSection.appendChild(userCardDOM)
	})
}
console.log(photographerFactory);

async function init() {
	// Je stocke dans une constante la réponse de ma fonction asynchrone getPhotographers
	const { photographers } = await fetchJson()
	// J'appelle ma fonction displayData
	displayData(photographers)
}
// J'appelle ma fonction init
init()
    
