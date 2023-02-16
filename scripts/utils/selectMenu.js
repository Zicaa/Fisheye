export async function getOptionsContainer() {

    const optionsContainerDOM = 
    `<ul class="select-items select-hide" 
        role="listbox"
        tabindex="-1" 
        aria-labelledby="select-menu-label" 
        aria-activedescendant="popularity">
        <li id="popularity" role="option" aria-selected="true">
            Popularité
            <span class="fas fa-chevron-up select-menu__arrow"></span>
        </li>
        <li id="date" role="option" aria-selected="false">Date</li>
        <li id="title" role="option" aria-selected="false">Titre</li>
    </ul>`;

    this.container.innerHTML += optionsContainerDOM;

    const optionsContainer = this.container.querySelector(".select-items");

    return optionsContainer;

}