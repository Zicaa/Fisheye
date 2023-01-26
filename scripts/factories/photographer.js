function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement( 'p' );
        location.textContent = city + ", " + country;
        location.classList.add("location");
        const presentation = document.createElement( 'p' );
        presentation.textContent = tagline;
        location.classList.add("presentation");
        const priceForDay = document.createElement( 'p' );
        priceForDay.textContent = price + "€/jour";
        location.classList.add("price");
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(presentation);
        article.appendChild(priceForDay);
        return (article);
    }
    return { getUserCardDOM }
}