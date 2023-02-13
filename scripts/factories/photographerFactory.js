// Fonction servant à créer les photographes à partir du fichier json
export function photographerFactory(data) {
     // Extraction des données nécessaires et stockage dans une constante
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    // Fonction qui crée les cartes des photographes par le DOM
    function getUserCardDOM() {
        // Je crée l'article à intégrer dans le HTML 
        const article = document.createElement( 'article' );
        article.classList.add("photographer-card");

        // Je crée les liens vers le portfolio des photographes
        const photographerCard = document.createElement("a");
        photographerCard.classList.add("photographer-card-link");
        photographerCard.setAttribute("href", `html/photographer.html?id=${id}`);
        photographerCard.setAttribute(
        "aria-label", "Lien vers le portfolio de " + name,
        );
        
        // Je crée les photos de profil des photographes + accessibilité
        const photographerImg = document.createElement( 'img' );
        photographerImg.classList.add("photographer-img");
        photographerImg.setAttribute("src", picture)
        photographerImg.setAttribute("alt", "Photo de " + name);

        // J'ajoute les noms des photographes
        const photographerName = document.createElement( 'h2' );
        photographerName.textContent = name;

        // J'ajoute les noms des photographes
        const textContent = document.createElement( 'div' );
        textContent.classList.add("photographer-description");

        // J'ajoute leur provenance
        const photographerLocation = document.createElement( 'p' );
        photographerLocation.textContent = city + ", " + country;
        photographerLocation.classList.add("location");

        // J'ajoute leur presentation
        const photographerTagline = document.createElement( 'p' );
        photographerTagline.textContent = tagline;
        photographerTagline.classList.add("presentation");

        // J'ajoute leur prix par jour
        const photographerPrice = document.createElement( 'p' );
        photographerPrice.textContent = price + "€/jour";
        photographerPrice.classList.add("price");

        // J'intègre les liens dans mes cards de photographes
        photographerCard.appendChild(photographerImg);
        photographerCard.appendChild(photographerName);

        // J'intègre le texte descriptif à la div parente grâce à des appenChild
        textContent.appendChild(photographerLocation);
        textContent.appendChild(photographerTagline);
        textContent.appendChild(photographerPrice);
        
        // J'intègre les données crées dans le HTML grâce à des appenChild
        article.appendChild(photographerCard);
        article.appendChild(textContent);
        return (article);
    }
    // Je retourne la fonction crée avec tous les éléments
    return { getUserCardDOM }
}