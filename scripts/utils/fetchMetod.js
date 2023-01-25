/* Fonction qui utilise la méthode fetch qui est obsolète sur les nouveaux navigateurs (à décommenter)

let json = "./data/photographers.json";

async function getPhotographers() {
    try {
      // Je récupère les données des photographes grâce à un fetch : no cors autorise la récupération en local des données au format json
        const request = await fetch(json, { mode: 'no-cors'})
        // J'attends la réponse de ma requête
        const data = await request.json();
        // Je retourne les informations des photographes dans ma constante data
        return data;
        // Je crée un message d'erreur si le fetch échoue
    } catch (error) {
        const errorMessage = document.createElement('h1')
        errorMessage.textContent = 'Erreur lors de la récupération des données des photographes.'
        main.appendChild(errorMessage)
        return { photographers: [] }
    }
}console.log(data);*/

