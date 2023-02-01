//Fonction qui utilise la méthode fetch, à utiliser avec un serveur local (CORS non autorisés)

async function getPhotographers() {
    try {
      // Je récupère les données des photographes grâce à la fonction fetch 
	  	const json = "./data/photographers.json";
        // J'attends la réponse de ma requête
		const query = await fetch(json)
		// Je stocke la réponse de ma requête dans ma constante data
        const data = await query.json();
        // Je retourne les informations des photographes de ma constante data
        return data;
		console.log(data);
        // Je crée un message d'erreur si le fetch échoue
    } catch (error) {
        const errorMessage = document.createElement('h1')
        errorMessage.textContent = 'Erreur lors de la récupération des données des photographes.'
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
    
