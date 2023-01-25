async function getPhotographers() {
    try {
        // Je récupère les données des photographes grâce à un fetch : no cors autorise la récupération en local des données au format json
        const request = await fetch(url, { mode: 'no-cors'})
        // J'attends la réponse de ma requête
        const data = await request.json();
        console.log(data);
        // Je retourne les informations des photographes dans ma constante data
        return data;
        // Je crée un message d'erreur si le fetch échoue
    } catch (error) {
        const errorMessage = document.createElement('h1')
        errorMessage.classList.add('photographers_error')
        errorMessage.textContent = 'Erreur lors de la récupération des données des photographes.'
        main.appendChild(errorMessage)
        return { photographers: [] }
    }
}console.log(data);

    /*async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();*/
    
