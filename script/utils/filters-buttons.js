import { recipes } from '../../data/recipes.js';

// console.log(recipes);
// console.log(recipes[0].ingredients);
// console.log(recipes[0].appliance);
// console.log(recipes.map(recipe => recipe.appliance));
// console.log(recipes[0].ustensils);

export function displayFilterIngredients(){
    // Création du filtre ingrédients
    const filterIngredients = document.createElement('button');
    filterIngredients.classList.add('button-filter');
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

    // Empêche la fermeture du menu quand on clique dans le champ de recherche
    ingredientsSearch.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // --- INTERACTION DU BUTTON FILTER ---

    // Clic sur le bouton : ferme les autres
    filterIngredients.addEventListener("click", (e) => {
        e.stopPropagation();

        // Fermer tous les autres menus + flèches
        document.querySelectorAll('.search-element-filter').forEach(menu => {
            if (menu !== ingredientsSearch) {
                menu.style.display = "none";
                const arrow = menu.parentElement.querySelector(".dropdown-arrow");
                if (arrow) {
                    arrow.classList.remove("fa-angle-up");
                    arrow.classList.add("fa-angle-down");
                }
            }
        });

        // Toggle ouverture du menu ingredients
        const isOpen = ingredientsSearch.style.display === "block";
        ingredientsSearch.style.display = isOpen ? "none" : "block";

        // Toggle flèche
        if (isOpen) {
            buttonIngredientsAngleSymbol.classList.add("fa-angle-down");
            buttonIngredientsAngleSymbol.classList.remove("fa-angle-up");
        } else {
            buttonIngredientsAngleSymbol.classList.remove("fa-angle-down");
            buttonIngredientsAngleSymbol.classList.add("fa-angle-up");
        }
    });

    //Ferme la liste et le input quand on clique en dehors
    document.addEventListener("click", (e) => {
        if (!filterIngredients.contains(e.target)) {
            ingredientsSearch.style.display = "none";

            //Remet de la flèche vers le bas
            buttonIngredientsAngleSymbol.classList.remove("fa-angle-up");
            buttonIngredientsAngleSymbol.classList.add("fa-angle-down");
        }
    });

    const searchBarAndMagnifyingGlass = document.createElement("div");
    searchBarAndMagnifyingGlass.setAttribute("class", "search-bar-and-glass")
    ingredientsSearch.appendChild(searchBarAndMagnifyingGlass);

    const searchBarIngredients = document.createElement('input');
    searchBarIngredients.setAttribute("type", "text");
    ingredientsSearch.appendChild(searchBarIngredients);

    const searchBarGlass = document.createElement("i");
    searchBarGlass.setAttribute("class", "fa-solid fa-magnifying-glass");
    searchBarAndMagnifyingGlass.appendChild(searchBarGlass);

    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add('list-button');
    ingredientsSearch.appendChild(ingredientsList);

    //va nour permettre d'éviter répétition des éléments dans la list. Le set est une collection d'éléments uniques
    const ingredientsSet = new Set(); 

    recipes.forEach(recipe => {
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
    });

    return filterIngredients;
}

//--------------------------------------------------------------

export function displayFilterAppliances(){
    // Création du filtre appareils électroménagers
    const filterAppliances = document.createElement('button');
    filterAppliances.classList.add('button-filter');
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

    appliancesSearch.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // --- INTERACTION DU BUTTON FILTER ---

    // Clic sur le bouton : ferme les autres
    filterAppliances.addEventListener("click", (e) => {
        e.stopPropagation();

        // Fermer tous les autres menus + flèches
        document.querySelectorAll('.search-element-filter').forEach(menu => {
            if (menu !== appliancesSearch) {
                menu.style.display = "none";
                const arrow = menu.parentElement.querySelector(".dropdown-arrow");
                if (arrow) {
                    arrow.classList.remove("fa-angle-up");
                    arrow.classList.add("fa-angle-down");
                }
            }
        });

        // Toggle ouverture du menu appareils electroménagers
        const isOpen = appliancesSearch.style.display === "block";
        appliancesSearch.style.display = isOpen ? "none" : "block";

        // Toggle flèche
        if (isOpen) {
            buttonAppliancesAngleSymbol.classList.add("fa-angle-down");
            buttonAppliancesAngleSymbol.classList.remove("fa-angle-up");
        } else {
            buttonAppliancesAngleSymbol.classList.remove("fa-angle-down");
            buttonAppliancesAngleSymbol.classList.add("fa-angle-up");
        }
    });

    //Ferme quand on clique en dehors
    document.addEventListener("click", (e) => {
        if (!filterAppliances.contains(e.target)) {
            appliancesSearch.style.display = "none";

            //Remet de la flèche vers le bas
            buttonAppliancesAngleSymbol.classList.remove("fa-angle-up");
            buttonAppliancesAngleSymbol.classList.add("fa-angle-down");
        }
    });

    const searchBarAndMagnifyingGlass = document.createElement("div");
    searchBarAndMagnifyingGlass.setAttribute("class", "search-bar-and-glass")
    appliancesSearch.appendChild(searchBarAndMagnifyingGlass);

    const searchBarAppliances = document.createElement('input');
    searchBarAppliances.setAttribute("type", "text");
    appliancesSearch.appendChild(searchBarAppliances);

    const searchBarGlass = document.createElement("i");
    searchBarGlass.setAttribute("class", "fa-solid fa-magnifying-glass");
    searchBarAndMagnifyingGlass.appendChild(searchBarGlass);

    const appliancesList = document.createElement("ul");
    appliancesList.classList.add('list-button');
    appliancesSearch.appendChild(appliancesList);

    const appliancesSet = new Set(); 

    recipes.forEach(recipe => {
        // console.log('appliance', recipe.appliance);
        appliancesSet.add(recipe.appliance)
    });
    // console.log(appliancesSet);
    

    appliancesSet.forEach((appliance) =>{
        const appliancesLi = document.createElement("li");
        appliancesLi.classList.add('element-filter-list');
        appliancesLi.textContent = appliance;
        appliancesList.appendChild(appliancesLi);
    })

    return filterAppliances;
}

//--------------------------------------------------------------

export function displayFilterUstensils(){
    // Création du filtre ustensiles
    const filterUstensils = document.createElement('button');
    filterUstensils.classList.add('button-filter');
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

    ustensilsSearch.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // --- INTERACTION DU BUTTON FILTER ---

    // Clic sur le bouton : ferme les autres
    filterUstensils.addEventListener("click", (e) => {
        e.stopPropagation();

        // Fermer tous les autres menus + flèches
        document.querySelectorAll('.search-element-filter').forEach(menu => {
            if (menu !== ustensilsSearch) {
                menu.style.display = "none";
                const arrow = menu.parentElement.querySelector(".dropdown-arrow");
                if (arrow) {
                    arrow.classList.remove("fa-angle-up");
                    arrow.classList.add("fa-angle-down");
                }   
            }
        });

        // Toggle ouverture du menu ustensiles
        const isOpen = ustensilsSearch.style.display === "block";
        ustensilsSearch.style.display = isOpen ? "none" : "block";

        // Toggle flèche
        if (isOpen) {
            buttonUstensilsAngleSymbol.classList.add("fa-angle-down");
            buttonUstensilsAngleSymbol.classList.remove("fa-angle-up");
        } else {
            buttonUstensilsAngleSymbol.classList.remove("fa-angle-down");
            buttonUstensilsAngleSymbol.classList.add("fa-angle-up");
        }
    });

    //Ferme quand on clique en dehors
    document.addEventListener("click", (e) => {
        if (!filterUstensils.contains(e.target)) {
            ustensilsSearch.style.display = "none";

            //Remet de la flèche vers le bas
            buttonUstensilsAngleSymbol.classList.add("fa-angle-down");
            buttonUstensilsAngleSymbol.classList.remove("fa-angle-up");
        }
    });


    const searchBarAndMagnifyingGlass = document.createElement("div");
    searchBarAndMagnifyingGlass.setAttribute("class", "search-bar-and-glass")
    ustensilsSearch.appendChild(searchBarAndMagnifyingGlass);

    const searchBarUstensils = document.createElement('input');
    searchBarUstensils.setAttribute("type", "text");
    ustensilsSearch.appendChild(searchBarUstensils);

    const searchBarGlass = document.createElement("i");
    searchBarGlass.setAttribute("class", "fa-solid fa-magnifying-glass");
    searchBarAndMagnifyingGlass.appendChild(searchBarGlass);

    const ustensilsList = document.createElement("ul");
    ustensilsList.classList.add('list-button');
    ustensilsSearch.appendChild(ustensilsList);

    const ustensilsSet = new Set();

    recipes.forEach(recipe => {
        recipe.ustensils.forEach((ustensil) => {
            // console.log('ustensils', recipe.ustensils);
            ustensilsSet.add(ustensil);
        });
    });
    // console.log(ustensilsSet);
    
    
    ustensilsSet.forEach((ustensil) => {
        const ustensilsLi = document.createElement('li');
        ustensilsLi.classList.add('element-filter-list');
        ustensilsLi.textContent = ustensil;
        ustensilsList.appendChild(ustensilsLi);
    });

    return filterUstensils;
}