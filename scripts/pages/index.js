//Fonction qui utilise la méthode fetch, à utiliser avec un serveur local (CORS non autorisés)

async function getPhotographers() {
    try {
      // Je récupère les données des photographes dans le fichier json et les stocke dans une constante
	  	const json = "./data/photographers.json";
        // Je formule ma requête grâce à fetch
		const query = await fetch(json)
		// Je stocke la réponse de ma requête dans ma constante data
        const data = await query.json();
        // Je retourne les informations des photographes de ma constante data
		console.log(data);
        return data;
        // Je crée un message d'erreur si le fetch échoue
    } catch (error) {
        const errorMessage = document.createElement('h1')
        errorMessage.textContent = 'Les données des photographes ne sont pas récupérées correctement.'
        main.appendChild(errorMessage)
        return { photographers: [] }
    }
}

//
async function displayData(photographers) {
	// Je recupere la div ou injecter les éléments dans le DOM
	const photographersSection = document.querySelector('.photographer_section')
	// Je parcours les éléments grâce à un forEach
	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer)
		const userCardDOM = photographerModel.getUserCardDOM()
		photographersSection.appendChild(userCardDOM)
	})
}console.log(photographerFactory);

async function init() {
	// Je récupère les données des photographes
	const { photographers } = await getPhotographers()
	displayData(photographers)
}
// J'appelle la fonction init
init()
    
