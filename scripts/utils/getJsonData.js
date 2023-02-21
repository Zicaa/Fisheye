// Fonction qui récupère les données des photographes dans le Json grâce à leur ID
function getPhotographer() {
  // J'extrais les données des photographes que je stocke dans une constante
  // J'accède aux données de la requête "get" grâce à searchParams
  const params = new URL(document.location).searchParams;
  // J'extrais les ID des photographes grâce aux paramètres de l'URL - parseInt récupère le 1er entier d'une chaîne
  const photographerId = parseInt(params.get("id"));
  // Je fais correspondre chaque ID de photographe dans le tableau Json à l'ID récupéré dans l'URL grâce à la méthod find()
  return photographers.find((photographer) => photographer.id === photographerId);
}

// Fonction qui récupère les médias des photographes dans le Json grâce à leur ID
function getMedia() {
  // J'accède aux données de la requête "get" grâce à searchParams
  const params = new URL(document.location).searchParams;
  // J'extrais les ID des photographes grâce aux paramètres de l'URL - parseInt récupère le 1er entier d'une chaîne
  const photographerId = parseInt(params.get("id"));
  // Je fais correspondre chaque ID de photographe dans le tableau Json à l'ID récupéré dans l'URL grâce à la méthod filter()
  return media.filter((mediaItem) => mediaItem.photographerId === photographerId);
}