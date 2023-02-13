//Fonction asynchrone qui récupère les données du json grâce à la méthode fetch, à utiliser avec un serveur local (CORS non autorisés)
export async function fetchJson() {
    try {
    // Je récupère les données du fichier json et les stocke dans une constante
	  	const json = "./data/photographers.json";
        // Je formule ma requête grâce à fetch
		const query = await fetch(json)
		// Je stocke la réponse de ma requête dans ma constante data
        const data = await query.json();
		// J'affiche les données du json dans la console
		console.log(data);
        // Je retourne les informations de ma constante data
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

// Fonction qui récupère les données des photographes dans le Json grâce à leur ID
export async function getPhotographer() {
  // J'extrais les données des photographes que je stocke dans une constante
  const { photographers } = await fetchJson();
  // J'accède aux données de la requête "get" grâce à searchParams
  const params = new URL(document.location).searchParams;
  // J'extrais les ID des photographes grâce aux paramètres de l'URL - parseInt récupère le 1er entier d'une chaîne
  const photographerId = parseInt(params.get("id"));
  // Je fais correspondre chaque ID de photographe dans le tableau Json à l'ID récupéré dans l'URL grâce à la méthod find()
  return photographers.find((photographer) => photographer.id === photographerId);
}

// Fonction qui récupère les médias des photographes dans le Json grâce à leur ID
export async function getMedia() {
  // J'extrais les médias des photographes que je stocke dans une constante
  const { media } = await fetchJson();
  // J'accède aux données de la requête "get" grâce à searchParams
  const params = new URL(document.location).searchParams;
  // J'extrais les ID des photographes grâce aux paramètres de l'URL - parseInt récupère le 1er entier d'une chaîne
  const photographerId = parseInt(params.get("id"));
  // Je fais correspondre chaque ID de photographe dans le tableau Json à l'ID récupéré dans l'URL grâce à la méthod filter()
  return media.filter((mediaItem) => mediaItem.photographerId === photographerId);
}