    /*async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
    }*/

    const data = './data/photographers.json';

    let zone = document.getElementsByClassName("photographer_section");

    // Je créé une fonction qui affiche tous les photographes
    async function getPhotographers() {
        try {
            // Je récupère les données présentes dans mon fichier json
            fetch(data)
            // A la réponse de l'API, je récupère les données présentes dans le format json
            .then(response => response.json())
            // Je retourne les données
            return data
            // Je definie une erreur si le fetch ne fonctionne pas
        } catch (error) {
            console.error(error)
            const errorElement = document.createElement('h2')
            errorElement.classList.add('photographers_error')
            errorElement.textContent = 'Erreur lors de la récupération des données des photographes.'
            main.appendChild(errorElement)
            return { photographers: [] }
        }
    }

    async function displayData(photographers) {
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
    
    init();
    
