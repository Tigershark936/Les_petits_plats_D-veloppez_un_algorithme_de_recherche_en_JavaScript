import { addTag } from './tags-system.js';

export function displayFilterIngredients(recipeList){
    // Création du filtre ingrédients
    const filterIngredients = document.createElement('button');
    filterIngredients.classList.add('button-filter');
    filterIngredients.setAttribute('data-role', 'filter-button');
    filterIngredients.setAttribute('aria-haspopup', 'listbox');
    filterIngredients.setAttribute('aria-expanded', 'false');
    filterIngredients.setAttribute('aria-label', 'Filtrer par ingrédients');

    const ingredientTextAndSymbol = document.createElement('div');
    ingredientTextAndSymbol.setAttribute("class", "text-symbol");
    filterIngredients.appendChild(ingredientTextAndSymbol);

    const buttonIngredientsText = document.createElement('p');
    buttonIngredientsText.textContent = `Ingrédients`;
    ingredientTextAndSymbol.appendChild(buttonIngredientsText);

    const buttonIngredientsAngleSymbol = document.createElement('i')
    buttonIngredientsAngleSymbol.classList.add("fa-solid", "fa-angle-down", "dropdown-arrow");
    ingredientTextAndSymbol.appendChild(buttonIngredientsAngleSymbol);

    //Elément que je dois cacher pour le bouton ingredient et s'ouvre qu'avec un event click
    const ingredientsSearch = document.createElement('div');
    ingredientsSearch.classList.add('search-element-filter');
    ingredientsSearch.style.display = "none";
    filterIngredients.appendChild(ingredientsSearch);

    const searchBarAndMagnifyingGlass = document.createElement("div");
    searchBarAndMagnifyingGlass.setAttribute("class", "search-bar-and-glass")
    ingredientsSearch.appendChild(searchBarAndMagnifyingGlass);

    const searchBarIngredients = document.createElement('input');
    searchBarIngredients.setAttribute("type", "text");
    ingredientsSearch.appendChild(searchBarIngredients);

    const searchBarGlass = document.createElement("i");
    searchBarGlass.setAttribute("class", "fa-solid fa-magnifying-glass");
    searchBarAndMagnifyingGlass.appendChild(searchBarGlass);

    const clearIconInput = document.createElement('i');
    clearIconInput.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    clearIconInput.classList.add('clear-input');
    clearIconInput.style.display = 'none';
    searchBarAndMagnifyingGlass.appendChild(clearIconInput);

    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add('list-button');
    ingredientsSearch.appendChild(ingredientsList);

    //va nour permettre d'éviter répétition des éléments dans la list. Le set est une collection d'éléments uniques
    const ingredientsSet = new Set(); 

    recipeList.forEach(recipe => {
        recipe.ingredients.forEach((ingredient) => {
            // console.log('ingredient', ingredient);
            // console.log(`|${ingredient.ingredient}|`);
            const cleanIngredient = ingredient.ingredient.trim().toLowerCase();
            ingredientsSet.add(cleanIngredient);
        });
    });

    ingredientsSet.forEach((ingredient) => {
        const ingredientsLi = document.createElement("li");
        ingredientsLi.classList.add('element-filter-list');
        ingredientsLi.textContent = ingredient;
        ingredientsList.appendChild(ingredientsLi);

         //Event pour selectionner l'element de la liste
        ingredientsLi.addEventListener('click', () => {
            addTag({ name: ingredient, category: 'ingredient' });
            ingredientsSearch.style.display = "none";
            buttonIngredientsAngleSymbol.classList.remove("fa-angle-up");
            buttonIngredientsAngleSymbol.classList.add("fa-angle-down");

        });
    });

    // Je stock les données de depart du set() pour les rendre a nouveau filtrable 
    const ingredientsArray = Array.from(ingredientsSet);

    dynamicInputForButtonSearchFilter({
            inputElement: searchBarIngredients,
            listElement: ingredientsList,
            itemsArray: ingredientsArray,
            clearButtonElement: clearIconInput,
        onItemSelect: (ingredient) => {
            addTag({ name: ingredient, category: 'ingredient' });
        },
        closeMenu: () => {
            ingredientsSearch.style.display = "none";
            buttonIngredientsAngleSymbol.classList.remove("fa-angle-up");
            buttonIngredientsAngleSymbol.classList.add("fa-angle-down");
        }
    });
    // Appel de la function pour avoir les events des filters-buttons
    setupFilterButtonInteraction({
        button: filterIngredients,
        menu: ingredientsSearch,
        arrow: buttonIngredientsAngleSymbol
    });
    return filterIngredients;
}

//--------------------------------------------------------------

export function displayFilterAppliances(recipeList){
    // Création du filtre appareils électroménagers
    const filterAppliances = document.createElement('button');
    filterAppliances.classList.add('button-filter');
    filterAppliances.setAttribute('data-role', 'filter-button');
    filterAppliances.setAttribute('aria-haspopup', 'listbox');
    filterAppliances.setAttribute('aria-expanded', 'false');
    filterAppliances.setAttribute('aria-label', 'Filtrer par appareils électroménagers');

    const appliancesTextAndSymbol = document.createElement('div');
    appliancesTextAndSymbol.setAttribute("class", "text-symbol");
    filterAppliances.appendChild(appliancesTextAndSymbol);

    const buttonAppliancesText = document.createElement('p');
    buttonAppliancesText.textContent = `Appareils`;
    appliancesTextAndSymbol.appendChild(buttonAppliancesText);

    const buttonAppliancesAngleSymbol = document.createElement('i');
    buttonAppliancesAngleSymbol.classList.add("fa-solid", "fa-angle-down", "dropdown-arrow");
    appliancesTextAndSymbol.appendChild(buttonAppliancesAngleSymbol);

    // Menu déroulant 
    const appliancesSearch = document.createElement('div');
    appliancesSearch.classList.add('search-element-filter');
    appliancesSearch.style.display = "none";
    filterAppliances.appendChild(appliancesSearch);

    const searchBarAndMagnifyingGlass = document.createElement("div");
    searchBarAndMagnifyingGlass.setAttribute("class", "search-bar-and-glass")
    appliancesSearch.appendChild(searchBarAndMagnifyingGlass);

    const searchBarAppliances = document.createElement('input');
    searchBarAppliances.setAttribute("type", "text");
    appliancesSearch.appendChild(searchBarAppliances);

    const searchBarGlass = document.createElement("i");
    searchBarGlass.setAttribute("class", "fa-solid fa-magnifying-glass");
    searchBarAndMagnifyingGlass.appendChild(searchBarGlass);

    const clearIconInput = document.createElement('i');
    clearIconInput.classList.add('clear-input');
    clearIconInput.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    clearIconInput.style.display = 'none';
    searchBarAndMagnifyingGlass.appendChild(clearIconInput);

    const appliancesList = document.createElement("ul");
    appliancesList.classList.add('list-button');
    appliancesSearch.appendChild(appliancesList);

    const appliancesSet = new Set(); 

    recipeList.forEach(recipe => {
        // console.log('appliance', recipe.appliance);
        appliancesSet.add(recipe.appliance.toLowerCase().trim());
    });
    // console.log(appliancesSet);
    

    appliancesSet.forEach((appliance) =>{
        const appliancesLi = document.createElement("li");
        appliancesLi.classList.add('element-filter-list');
        appliancesLi.textContent = appliance;
        appliancesList.appendChild(appliancesLi);

        appliancesLi.addEventListener('click', () => {
            addTag({ name: appliance, category: 'appliance' });
            appliancesSearch.style.display = "none";
            buttonAppliancesAngleSymbol.classList.remove("fa-angle-up");
            buttonAppliancesAngleSymbol.classList.add("fa-angle-down");
        });
    })

    const appliancesArray = Array.from(appliancesSet);

    // Appel de la fonction utilitaire pour gérer la recherche dynamique
    dynamicInputForButtonSearchFilter({
        inputElement: searchBarAppliances,
        listElement: appliancesList,
        itemsArray: appliancesArray,
        clearButtonElement: clearIconInput,
        onItemSelect: (appliance) => {
            addTag({ name: appliance, category: 'appliance' });
        },
        closeMenu: () => {
            appliancesSearch.style.display = "none";
            buttonAppliancesAngleSymbol.classList.remove("fa-angle-up");
            buttonAppliancesAngleSymbol.classList.add("fa-angle-down");
        }
    });
    // Appel de la function pour avoir les events des filters-buttons
    setupFilterButtonInteraction({
        button: filterAppliances,
        menu: appliancesSearch,
        arrow: buttonAppliancesAngleSymbol
    });
    return filterAppliances;
}

//--------------------------------------------------------------

export function displayFilterUstensils(recipeList){
    // Création du filtre ustensiles
    const filterUstensils = document.createElement('button');
    filterUstensils.classList.add('button-filter');
    filterUstensils.setAttribute('data-role', 'filter-button');
    filterUstensils.setAttribute('aria-haspopup', 'listbox');
    filterUstensils.setAttribute('aria-expanded', 'false');
    filterUstensils.setAttribute('aria-label', 'Filtrer par ustensiles');

    const ustensilsTextAndSymbol = document.createElement('div');
    ustensilsTextAndSymbol.setAttribute("class", "text-symbol");
    filterUstensils.appendChild(ustensilsTextAndSymbol);

    const buttonUstensilsText = document.createElement('p');
    buttonUstensilsText.textContent = `Ustensiles`;
    ustensilsTextAndSymbol.appendChild(buttonUstensilsText);

    const buttonUstensilsAngleSymbol = document.createElement('i');
    buttonUstensilsAngleSymbol.classList.add("fa-solid", "fa-angle-down", "dropdown-arrow");
    ustensilsTextAndSymbol.appendChild(buttonUstensilsAngleSymbol);

    // Menu déroulant
    const ustensilsSearch = document.createElement('div');
    ustensilsSearch.classList.add('search-element-filter');
    ustensilsSearch.style.display = "none";
    filterUstensils.appendChild(ustensilsSearch);

    const searchBarAndMagnifyingGlass = document.createElement("div");
    searchBarAndMagnifyingGlass.setAttribute("class", "search-bar-and-glass")
    ustensilsSearch.appendChild(searchBarAndMagnifyingGlass);

    const searchBarUstensils = document.createElement('input');
    searchBarUstensils.setAttribute("type", "text");
    ustensilsSearch.appendChild(searchBarUstensils);

    const searchBarGlass = document.createElement("i");
    searchBarGlass.setAttribute("class", "fa-solid fa-magnifying-glass");
    searchBarAndMagnifyingGlass.appendChild(searchBarGlass);

    const clearIconInput = document.createElement('i');
    clearIconInput.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    clearIconInput.classList.add('clear-input');
    clearIconInput.style.display = 'none';
    searchBarAndMagnifyingGlass.appendChild(clearIconInput);

    const ustensilsList = document.createElement("ul");
    ustensilsList.classList.add('list-button');
    ustensilsSearch.appendChild(ustensilsList);

    const ustensilsSet = new Set();

    recipeList.forEach(recipe => {
        recipe.ustensils.forEach((ustensil) => {
            // console.log('ustensils', recipe.ustensils);
            ustensilsSet.add(ustensil.toLowerCase().trim());
        });
    });
    // console.log(ustensilsSet);
    
    
    ustensilsSet.forEach((ustensil) => {
        const ustensilsLi = document.createElement('li');
        ustensilsLi.classList.add('element-filter-list');
        ustensilsLi.textContent = ustensil;
        ustensilsList.appendChild(ustensilsLi);

        ustensilsLi.addEventListener('click', () => {
            addTag({ name: ustensil, category: 'ustensil' });
            ustensilsSearch.style.display = "none";
            buttonUstensilsAngleSymbol.classList.remove("fa-angle-up");
            buttonUstensilsAngleSymbol.classList.add("fa-angle-down");
        });
    });

    const ustensilsArray = Array.from(ustensilsSet);

    // Appel de la fonction utilitaire pour gérer la recherche dynamique
    dynamicInputForButtonSearchFilter({
        inputElement: searchBarUstensils,
        listElement: ustensilsList,
        itemsArray: ustensilsArray,
        clearButtonElement: clearIconInput,
        onItemSelect: (ustensil) => {
            addTag({ name: ustensil, category: 'ustensil' });
        },
        closeMenu: () => {
            ustensilsSearch.style.display = "none";
            buttonUstensilsAngleSymbol.classList.remove("fa-angle-up");
            buttonUstensilsAngleSymbol.classList.add("fa-angle-down");
        },
    });
    // Appel de la function pour avoir les events des filters-buttons
    setupFilterButtonInteraction({
        button: filterUstensils,
        menu: ustensilsSearch,
        arrow: buttonUstensilsAngleSymbol
    });
    return filterUstensils;
};


// Function for --- INTERACTION DU BUTTON FILTER ---
function setupFilterButtonInteraction({
    button, // Le bouton cliquable du filtre (ex. "Ingrédients, Appareils, Ustensils") qui gère l'ouverture du menu.
    menu,   // la box qui s’ouvre avec les ingrédients dedans (la liste des filtres).
    arrow   // la flèche qui pointe vers le bas ou vers le haut pour indiquer l'ouverture/fermeture.
}){
  // Ouvre/ferme le menu au clic sur le bouton
    button.addEventListener("click", (e) => {
        e.stopPropagation(); // Empêche la fermeture immédiate
        button.style.borderRadius = "11px 11px 0 0";

    // Fermer tous les autres menus sauf celui-ci
    document.querySelectorAll('.search-element-filter').forEach(otherMenu => {
        if (otherMenu !== menu) {
        otherMenu.style.display = "none";

        // Réinitialise la flèche des autres filtres en position bas pour dire que s'est fermé
        const otherArrow = otherMenu.parentElement.querySelector(".dropdown-arrow");
            if (otherArrow) {
                otherArrow.classList.remove("fa-angle-up");
                otherArrow.classList.add("fa-angle-down");
            }

            // Réinitialise le border-radius des autres boutons de filtre s'ils ont le bon data-role
            const otherButton = otherMenu.parentElement;
            if (otherButton && otherButton.dataset.role === 'filter-button') {
                otherButton.style.borderRadius = '11px';
            }
        }
    });

    // Toggle ouverture/fermeture du menu actuel
    const isOpen = menu.style.display === "block";
        menu.style.display = isOpen ? "none" : "block";

        // Toggle de la flèche
        if (isOpen) {
            arrow.classList.remove("fa-angle-up");
            arrow.classList.add("fa-angle-down");
            button.style.borderRadius = "11px";
        } else {
            arrow.classList.remove("fa-angle-down");
            arrow.classList.add("fa-angle-up");
        }
    });

    // Évite la fermeture quand on clique dans le menu
    menu.addEventListener("click", (e) => {
        e.stopPropagation();
    });

  // Fermer le menu si clic en dehors
    document.addEventListener("click", (e) => {
        if (!button.contains(e.target)) {
            menu.style.display = "none";
            arrow.classList.remove("fa-angle-up");
            arrow.classList.add("fa-angle-down");
            button.style.borderRadius = "11px";
        }
    });
}



//Fonction pour me permettre de jouer avec les inputs du filter-button et de créer les liste de recherche avec les value
function dynamicInputForButtonSearchFilter({
    inputElement, // champ input
    listElement,  // liste UL à remplir
    itemsArray,   // tableau de base à filtrer
    onItemSelect, // fonction appelée au clic sur un <li>
    closeMenu,    // fonction à appeler pour fermer le menu
    clearButtonElement = null // paramètre pour avoir l'action de la croix dans le input
}){
    function renderList(array) {
        listElement.innerHTML = "";
        array.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            li.classList.add("element-filter-list");
            listElement.appendChild(li);

            li.addEventListener("click", () => {
                onItemSelect(item);
                closeMenu();
            });
        });
    };

    inputElement.addEventListener("input", () => {
        const value = inputElement.value.trim().toLowerCase();

        if (value.length >= 1) {
            const filtered = itemsArray.filter(item => item.includes(value));
            renderList(filtered);
        } else {
            renderList(itemsArray);
        }

        if (clearButtonElement) {
            clearButtonElement.style.display = value.length > 0 ? 'block' : 'none';
        }
    });

    if (clearButtonElement) {
        clearButtonElement.addEventListener("click", () => {
            inputElement.value = '';
            renderList(itemsArray);
            clearButtonElement.style.display = 'none';
        });
    }

  // Affiche la liste complète au départ
  renderList(itemsArray);
};