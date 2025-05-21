// Construction de la page index.html en dynamique
import { recipes } from '../../data/recipes.js';
import { createRecipeCard } from '../components/recipe-card.js';

console.log(recipes);

function init(){
    const main = document.createElement('main');
    main.classList.add('main');
    main.setAttribute('role', 'main');
    document.body.appendChild(main);
    console.log(main);

    //Création de la boite qui stock les recipesCard
    const containerRecipeCard = document.createElement('div');
    containerRecipeCard.classList.add('container-recipe-card');
    main.appendChild(containerRecipeCard);

    recipes.forEach(recipe => {
    const card = createRecipeCard(recipe);
    containerRecipeCard.appendChild(card);
    });
}


const Header = document.createElement('div');
Header.classList.add('header');
Header.setAttribute('role', 'banner'); // Zone de l'en-tête
document.body.appendChild(Header);
console.log(Header);

const backgroundHeader = document.createElement('img');
backgroundHeader.classList.add('background-img');
Header.appendChild(backgroundHeader);

//H1 LOGO DU SITE 
const h1 = document.createElement('h1');
const logoWebsite = document.createElement('img');
logoWebsite.classList.add('logo');
logoWebsite.src = "../assets/icons/Logo.png";
logoWebsite.alt = "Logo du site";
h1.appendChild(logoWebsite);
Header.appendChild(h1);

// H2 SLOGAN DU HEARDER
const sloganHeader = document.createElement('h2');
sloganHeader.innerHTML = `CHERCHEZ PARMI PLUS DE 1500 RECETTES <br> DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES`;
sloganHeader.classList.add('h2');
sloganHeader.setAttribute('aria-label', 'Slogan du site'); 
Header.appendChild(sloganHeader);

// BARRE DE RECHERCHE DU HEADER
const searchBarHeader = document.createElement('div');
searchBarHeader.classList.add('search-bar');
searchBarHeader.setAttribute('role', 'search');
Header.appendChild(searchBarHeader);

// INPUT DE LA SEARCH BAR
const inputsearchBarHeader = document.createElement('input');
inputsearchBarHeader.type = "text";
inputsearchBarHeader.placeholder = "Rechercher une recette, un ingrédient, ...";
inputsearchBarHeader.setAttribute("aria-label", "Barre de recherche");
searchBarHeader.appendChild(inputsearchBarHeader);

// X DU INPUT DE LA SEARCH BAR
const clearBtnSearchBarHeader = document.createElement("span");
clearBtnSearchBarHeader.classList.add("cross-btn");
clearBtnSearchBarHeader.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
clearBtnSearchBarHeader.style.display = "none";// Cache la cross tant que rien n’est écrit dans la search bar
searchBarHeader.appendChild(clearBtnSearchBarHeader);

inputsearchBarHeader.addEventListener("input", () => {
    if(inputsearchBarHeader.value.trim() !== ""){
        clearBtnSearchBarHeader.style.display = "block";
    } else {
        clearBtnSearchBarHeader.style.display = "none"
    }
})

clearBtnSearchBarHeader.addEventListener("click", () => {
  inputsearchBarHeader.value = "";
  clearBtnSearchBarHeader.style.display = "none";
  inputsearchBarHeader.focus();
});


// BOUTON DE LA SEARCH BAR 
const buttonSearchBarHeader = document.createElement('button');
buttonSearchBarHeader.classList.add('button');
buttonSearchBarHeader.setAttribute("aria-label", "Lancer la recherche");
searchBarHeader.appendChild(buttonSearchBarHeader);

// LOGO DU BOUTON DE LA SEARCH BAR
const searchIcon = document.createElement('i');
searchIcon.classList.add('fa-solid', 'fa-magnifying-glass');
buttonSearchBarHeader.appendChild(searchIcon);

// ------------------------------------ MAIN ------------------------------------ // 

// const main = document.createElement('main');
// main.classList.add('main');
// main.setAttribute('role', 'main');
// document.body.appendChild(main);
// console.log(main);

// Création de la boite des 3 filtres et du compteur des recipes 
const containerFiltersAndCounter = document.createElement('div');
containerFiltersAndCounter.classList.add('filters-Counter');
containerFiltersAndCounter.setAttribute('aria-label', 'Filtres et compteur de recettes du siteWeb');
// main.appendChild(containerFiltersAndCounter);

const filters = document.createElement('div');
filters.classList.add('filters');
filters.setAttribute('role', 'group'); 
containerFiltersAndCounter.appendChild(filters);

//--------------------------------------------------------------

// Création du filtre ingrédients
const filterIngredients = document.createElement('button');
filterIngredients.classList.add('button-filter');
filterIngredients.setAttribute('aria-haspopup', 'listbox');
filterIngredients.setAttribute('aria-expanded', 'false');
filterIngredients.setAttribute('aria-label', 'Filtrer par ingrédients');
filters.appendChild(filterIngredients);

const ingredientTextAndSymbol = document.createElement('div');
ingredientTextAndSymbol.setAttribute("class", "text-symbol");
filterIngredients.appendChild(ingredientTextAndSymbol);

const buttonIngredientsText = document.createElement('p');
buttonIngredientsText.textContent = `Ingrédients`;
ingredientTextAndSymbol.appendChild(buttonIngredientsText);

const buttonIngredientsAngleSymbol = document.createElement('i')
buttonIngredientsAngleSymbol.setAttribute("class", "fa-solid fa-angle-down");
ingredientTextAndSymbol.appendChild(buttonIngredientsAngleSymbol);

//Elément que je dois cacher pour le bouton ingredient et s'ouvre qu'avec un event click
const ingredientsSearch = document.createElement('div');
ingredientsSearch.classList.add('search-element-filter');
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

const ingredientsList = document.createElement("ul");
ingredientsList.classList.add('ingredients-list');
ingredientsSearch.appendChild(ingredientsList);

//--------------------------------------------------------------

// Création du filtre appareils électroménagers
const filterAppliances = document.createElement('button');
filterAppliances.classList.add('button-filter');
filterAppliances.setAttribute('aria-haspopup', 'listbox');
filterAppliances.setAttribute('aria-expanded', 'false');
filterAppliances.setAttribute('aria-label', 'Filtrer par appareils électroménagers');
filters.appendChild(filterAppliances);

const appliancesTextAndSymbol = document.createElement('div');
appliancesTextAndSymbol.setAttribute("class", "text-symbol");
filterAppliances.appendChild(appliancesTextAndSymbol);

const buttonAppliancesText = document.createElement('p');
buttonAppliancesText.textContent = `Appareils`;
appliancesTextAndSymbol.appendChild(buttonAppliancesText);

const buttonAppliancesAngleSymbol = document.createElement('i');
buttonAppliancesAngleSymbol.setAttribute("class", "fa-solid fa-angle-down");
appliancesTextAndSymbol.appendChild(buttonAppliancesAngleSymbol);

//--------------------------------------------------------------

// Création du filtre ustensiles
const filterUstensils = document.createElement('button');
filterUstensils.classList.add('button-filter');
filterUstensils.setAttribute('aria-haspopup', 'listbox');
filterUstensils.setAttribute('aria-expanded', 'false');
filterUstensils.setAttribute('aria-label', 'Filtrer par ustensiles');
filters.appendChild(filterUstensils);

const ustensilsTextAndSymbol = document.createElement('div');
ustensilsTextAndSymbol.setAttribute("class", "text-symbol");
filterUstensils.appendChild(ustensilsTextAndSymbol);

const buttonUstensilsText = document.createElement('p');
buttonUstensilsText.textContent = `Ustensiles`;
ustensilsTextAndSymbol.appendChild(buttonUstensilsText);

const buttonUstensilsAngleSymbol = document.createElement('i');
buttonUstensilsAngleSymbol.setAttribute("class", "fa-solid fa-angle-down");
ustensilsTextAndSymbol.appendChild(buttonUstensilsAngleSymbol);

//--------------------------------------------------------------

// Création du compteur totals des recettes du siteWeb
const counterRecipes = document.createElement('div');
counterRecipes.classList.add('counter');
counterRecipes.setAttribute('aria-live', 'polite');
containerFiltersAndCounter.appendChild(counterRecipes);

const totalsRecipes = document.createElement('h3');
totalsRecipes.classList.add('h3');
totalsRecipes.textContent = `50 RECETTES`;
counterRecipes.appendChild(totalsRecipes);


init()