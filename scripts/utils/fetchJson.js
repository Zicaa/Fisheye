//Fonction asynchrone qui récupère les données du json grâce à la méthode fetch, à utiliser avec un serveur local (CORS non autorisés)
async function getPhotographers() {
    try {
    // Je récupère les données des photographes dans le fichier json et les stocke dans une constante
	  	const json = "./data/photographers.json";
        // Je formule ma requête grâce à fetch
		const query = await fetch(json)
		// Je stocke la réponse de ma requête dans ma constante data
        const data = await query.json();
		// J'affiche les données du json dans la console
		console.log(data);
        // Je retourne les informations des photographes de ma constante data
        return data;
		
    // Je crée un message d'erreur si le fetch échoue
    } catch (error) {
        const errorMessage = document.createElement('h1')
        errorMessage.textContent = 'Les données des photographes ne sont pas récupérées correctement.'
        main.appendChild(errorMessage)
		// Je retourne les photographes du fichier json
        return { photographers: [] }
    }
}