// Construction de la page index.html en dynamique
import { recipes } from '../../data/recipes.js';
import { createRecipeCard } from '../components/recipe-card.js';
import { displayFilterIngredients, displayFilterAppliances, displayFilterUstensils } from '../utils/filters-buttons.js';
import { onTagUpdate, createTagElement, getSelectedTags } from '../utils/tags-system.js';
import { totalCounterRecipes, updateRecipeCounter } from '../utils/counter-recipes.js';


console.log(recipes);

let containerRecipeCard;

function displayRecipes(recipeList, searchValue, tags) {
  containerRecipeCard.innerHTML = "";

  // MAJ du compteur de recettes ici
  updateRecipeCounter(recipeList.length);

  if(recipeList.length === 0){
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('errorMessage');

    const tagMessage = formatSelectedTags(tags || []);
    const searchMessage = searchValue ? `«${searchValue}»` : '';
    errorMessage.textContent = `⚠️ Aucune recette ne contient ${searchMessage}${tagMessage ? ' avec ' + tagMessage : ''} vous pouvez chercher « tarte aux pommes», «poisson», etc. ⚠️`;

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

    const containerTag = document.createElement('div');
    containerTag.classList.add('container-tag');
    main.appendChild(containerTag);

    onTagUpdate((tags) => {
      containerTag.innerHTML = "";

      tags.forEach(tag => {
        const tagElement = createTagElement(tag);
        containerTag.appendChild(tagElement);
      });
      filterRecipesWithTags(tags);
    });

    //Création de la boite qui stock les recipesCard
    containerRecipeCard = document.createElement('div');
    containerRecipeCard.classList.add('container-recipe-card');
    main.appendChild(containerRecipeCard);

    recipes.forEach(recipe => {
    const card = createRecipeCard(recipe);
    containerRecipeCard.appendChild(card);
    });
}

function filterRecipesWithTags(tags){
  // Séparer les tags selon leur catégorie
  const activeIngredients = tags.filter((tag) => tag.category === 'ingredient').map(tag  => tag.name.toLowerCase());
  const activeAppliances = tags.filter((tag) => tag.category === 'appliance').map(tag => tag.name.toLowerCase());
  const activeUstensils = tags.filter((tag) => tag.category === 'ustensil').map(tag => tag.name.toLowerCase());

 // 2. Filter recipes
  const filteredRecipes = recipes.filter((recipe) => {
  const recipeIngredients = recipe.ingredients.map((i) => i.ingredient.toLowerCase());
  const recipeUstensils = recipe.ustensils.map((u) => u.toLowerCase());
  const recipeAppliance = recipe.appliance.toLowerCase();

  // Vérifie que tous les tags d'ingrédients sont présents dans la recette
  const matchesIngredients = activeIngredients.every((ing) => recipeIngredients.includes(ing));
  // Vérifie que la recette utilise l'appareil sélectionné (ou ignore si aucun tag d'appareil actif)
  const matchesAppliance = activeAppliances.length === 0 || activeAppliances.includes(recipeAppliance);
  // Vérifie que tous les ustensiles requis sont présents dans la recette
  const matchesUstensils = activeUstensils.every((ust) => recipeUstensils.includes(ust));

  // La recette est conservée dans le container si elle remplit toutes les conditions
  return matchesIngredients && matchesAppliance && matchesUstensils;
});
  //Affichage les recettes filtrées par l'utilisateur
  displayRecipes(filteredRecipes, "", tags);
}

// Fonction qui regroupe les tags sélectionnés en une chaîne visible rangé par catégorie des buttons(ingrédients, appliances, ustensiles), utilisée pour afficher un résumé clair des filtres actifs.
function formatSelectedTags(tags) {
  const ing = tags.filter(t => t.category === 'ingredient').map(t => t.name).join(', ');
  const app = tags.filter(t => t.category === 'appliance').map(t => t.name).join(', ');
  const ust = tags.filter(t => t.category === 'ustensil').map(t => t.name).join(', ');

  // Ajoute les sections de texte formatées seulement si elles contiennent des valeurs
  let result = "";
  if (ing) result += `Ingrédients : ${ing} – `;
  if (app) result += `Appareil : ${app} – `;
  if (ust) result += `Ustensiles : ${ust}`;

  return result.trim().replace(/–\s*$/, ''); // retire le dernier tiret si besoin
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

  const tags = getSelectedTags();
  console.log("📌 Tags actifs au moment de la recherche :", tags);

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
    displayRecipes(filtered, searchValue, tags);
  } else {
    // Si moins de 3 caractères dans la barre de recherche, on affiche toutes les recettes sans filtrage
    displayRecipes(recipes, searchValue, tags);
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