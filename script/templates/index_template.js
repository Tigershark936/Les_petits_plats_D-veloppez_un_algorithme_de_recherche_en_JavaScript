// Construction de la page index.html en dynamique
import { recipes } from '../../data/recipes.js';
import { createRecipeCard } from '../components/recipe-card.js';
import { displayFilterIngredients, displayFilterAppliances, displayFilterUstensils } from '../utils/filters-buttons.js';
import { totalCounterRecipes } from '../utils/counter-recipes.js';

console.log(recipes);

let containerRecipeCard;

function displayRecipes(recipeList, searchValue) {
  containerRecipeCard.innerHTML = "";

  if(recipeList.length === 0){
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('errorMessage');
    errorMessage.textContent = ` ⚠️ «Aucune recette ne contient "${searchValue}" vous pouvez chercher « tarte aux pommes », « poisson », etc. ⚠️ `;
    containerRecipeCard.appendChild(errorMessage);
    return;
  }
  
  recipeList.forEach(recipe => {
    const card = createRecipeCard(recipe);
    console.log("Ajout de la carte :", recipe.name); 
    containerRecipeCard.appendChild(card);
  });
}

function init(){
    const main = document.createElement('main');
    main.classList.add('main');
    main.setAttribute('role', 'main');
    document.body.appendChild(main);
    console.log(main);

    // Création de la boite des 3 filtres et du compteur des recipes 
    const containerFiltersAndCounter = document.createElement('div');
    containerFiltersAndCounter.classList.add('filters-Counter');
    containerFiltersAndCounter.setAttribute('aria-label', 'Filtres et compteur de recettes du siteWeb');
    main.appendChild(containerFiltersAndCounter);

    const filters = document.createElement('div');
    filters.classList.add('filters');
    filters.setAttribute('role', 'group'); 
    containerFiltersAndCounter.appendChild(filters);

    // On injecte ici les 3 boutons de filtres dynamiques et le nombre total de recipes
    filters.appendChild(displayFilterIngredients());
    filters.appendChild(displayFilterAppliances());
    filters.appendChild(displayFilterUstensils());
    containerFiltersAndCounter.appendChild(totalCounterRecipes());


    //Création de la boite qui stock les recipesCard
    containerRecipeCard = document.createElement('div');
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

inputsearchBarHeader.addEventListener("input", () => {
  const searchValue = inputsearchBarHeader.value.trim().toLowerCase();

  // Gère l'évènement de la croix (X)
  clearBtnSearchBarHeader.style.display = searchValue ? "block" : "none";

  // Si la recherche contient au moins 3 caractères, on commence à filtrer les recettes
  if (searchValue.length >= 3) {
    const filtered = recipes.filter(recipe => {
      // - le nom de la recette
      const isInTitle = recipe.name.toLowerCase().includes(searchValue);
       // - la description
      const isInDescription = recipe.description.toLowerCase().includes(searchValue);
      // - un des ingrédients
      const isInIngredients = recipe.ingredients.some(ing =>
        ing.ingredient.toLowerCase().includes(searchValue)
      );
      // Si la recherche correspond à l’un de ces éléments, on garde la recette
      return isInTitle || isInDescription || isInIngredients;
    });
    console.log("searchValue:", searchValue, "| length:", searchValue.length);

    // Affiche les recettes filtrées dans le DOM
    displayRecipes(filtered, searchValue);
  } else {
    // Si moins de 3 caractères dans la barre de recherche, on affiche toutes les recettes sans filtrage
    displayRecipes(recipes, searchValue);
  }
});

// X DU INPUT DE LA SEARCH BAR
const clearBtnSearchBarHeader = document.createElement("span");
clearBtnSearchBarHeader.classList.add("cross-btn");
clearBtnSearchBarHeader.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
clearBtnSearchBarHeader.style.display = "none";// Cache la cross tant que rien n’est écrit dans la search bar
searchBarHeader.appendChild(clearBtnSearchBarHeader);

clearBtnSearchBarHeader.addEventListener("click", () => {
  inputsearchBarHeader.value = "";
  clearBtnSearchBarHeader.style.display = "none";
  inputsearchBarHeader.focus();
  displayRecipes(recipes);   
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

init()