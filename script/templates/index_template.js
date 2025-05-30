// Construction de la page index.html en dynamique
import { recipes } from '../../data/recipes.js';
import { createRecipeCard } from '../components/recipe-card.js';
import { displayFilterIngredients, displayFilterAppliances, displayFilterUstensils } from '../utils/filters-buttons.js';
import { onTagUpdate, createTagElement, getSelectedTags } from '../utils/tags-system.js';
import { totalCounterRecipes, updateRecipeCounter } from '../utils/counter-recipes.js';

console.log(recipes);

// Élément HTML qui me sert à contenir la carte de recette affichée dynamiquement gràce au JS
let containerRecipeCard;
// Référence globale de l'élément de l'input de recherche principale (header)
let inputsearchBarHeader;

// Fonction principale de lancement du site
function init() {

  // Appel de la fonction du header avec logo, slogan et barre de recherche
  buildHeader();

  // Création de l'élément <main> qui contiendra tout le contenu principal du site
  const main = document.createElement('main');
  main.classList.add('main');
  main.setAttribute('role', 'main');
  document.body.appendChild(main);

  // Création de la zone POUR LE DOM qui regroupe les 3 filtres et le compteur de recettes
  const containerFiltersAndCounter = createContainerFiltersAndCounter();
  main.appendChild(containerFiltersAndCounter);
  updateFilterButtons(recipes); // On appelle ici une fois que l'élément est dans le DOM

  // Création du conteneur des tags sélectionnés
  const containerTag = createTagContainer();
  main.appendChild(containerTag);

  // Création du conteneur des cartes de recettes affichées
  containerRecipeCard = createRecipeContainer();
  main.appendChild(containerRecipeCard);

  // Gestion des tags (ajout / suppression) dans le DOM
  onTagUpdate((tags) => {
    console.log("tag sélectionné :", tags);

    containerTag.innerHTML = "";
    tags.forEach(tag => {
      const tagElement = createTagElement(tag);
      containerTag.appendChild(tagElement);
      console.log("tag rajouté", tag);
    });

    // FILTRE + MAJ de l'affichage des tags qui sont sélectionnés
    filterAndDisplayRecipes();
  });

  // Affichage initial des recettes
  displayRecipes(recipes, "", []);
}


//--------------------------------------------------------------

// Fonction pour construire le header du site (logo, slogan, search bar)
function buildHeader() {
  // HEARDER
  const Header = document.createElement('div');
  Header.classList.add('header');
  document.body.appendChild(Header);

  const backgroundHeader = document.createElement('img');
  backgroundHeader.classList.add('background-img');
  backgroundHeader.setAttribute('role', 'banner');
  Header.appendChild(backgroundHeader);

  // H1 LOGO DU SITE 
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

  Header.appendChild(createSearchBar());
}


//--------------------------------------------------------------

// Fonction pour créer la barre de recherche avec gestion du champ INPUT du HEADER
function createSearchBar() {
  // SEARCH BAR OF HEADER
  const searchBarHeader = document.createElement('div');
  searchBarHeader.classList.add('search-bar');
  searchBarHeader.setAttribute('role', 'search');

  // INPUT DE LA SEARCH BAR
  const input = document.createElement('input');
  input.type = "text";
  input.placeholder = "Rechercher une recette, un ingrédient, ...";
  input.setAttribute("aria-label", "Barre de recherche");
  searchBarHeader.appendChild(input);

  inputsearchBarHeader = input; // on le rend accessible au reste du fichier

  // X DU INPUT DE LA SEARCH BAR
  const clearBtnSearchBarHeader = document.createElement("span");
  clearBtnSearchBarHeader.classList.add("cross-btn");
  clearBtnSearchBarHeader.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  clearBtnSearchBarHeader.style.display = "none";
  searchBarHeader.appendChild(clearBtnSearchBarHeader);

  input.addEventListener("input", () => {
    // Gère l'évènement de la croix (X)
    clearBtnSearchBarHeader.style.display = input.value ? "block" : "none";
    filterAndDisplayRecipes();
  });

  clearBtnSearchBarHeader.addEventListener("click", () => {
    input.value = "";
    clearBtnSearchBarHeader.style.display = "none";
    input.focus();
    filterAndDisplayRecipes();
  });

  // BOUTON DE LA SEARCH BAR 
  const buttonSearchBarHeader = document.createElement('button');
  buttonSearchBarHeader.classList.add('button');
  buttonSearchBarHeader.setAttribute("aria-label", "Lancer la recherche");
  searchBarHeader.appendChild(buttonSearchBarHeader);

  const searchIcon = document.createElement('i');
  searchIcon.classList.add('fa-solid', 'fa-magnifying-glass');
  buttonSearchBarHeader.appendChild(searchIcon);

  return searchBarHeader;
}


//--------------------------------------------------------------

// Fonction pour créer le container des 3 filtres + le compteur total de recettes
function createContainerFiltersAndCounter() {
  const containerFiltersAndCounter = document.createElement('div');
  containerFiltersAndCounter.classList.add('filters-Counter');
  containerFiltersAndCounter.setAttribute('aria-label', 'Filtres et compteur de recettes du siteWeb');

  // Création de la boite pour les filters-buttons
  const containerFilters = document.createElement('div');
  containerFilters.classList.add('filters');
  containerFilters.setAttribute('role', 'group');
  containerFiltersAndCounter.appendChild(containerFilters);

  //supprimé ici : updateFilterButtons(recipes); déplacé dans init()
  containerFiltersAndCounter.appendChild(totalCounterRecipes());

  return containerFiltersAndCounter;
}


//--------------------------------------------------------------

// Fonction pour créer le container des les tags actifs
function createTagContainer() {
  const containerTag = document.createElement('div');
  containerTag.classList.add('container-tag');
  return containerTag;
}


//--------------------------------------------------------------

// Fonction pour créer le container pour les cartes de recettes
function createRecipeContainer() {
  const containerRecipeCard = document.createElement('div');
  containerRecipeCard.classList.add('container-recipe-card');
  return containerRecipeCard;
}


//--------------------------------------------------------------

// Met à jour les boutons filtres selon les recettes visibles actuellement
function updateFilterButtons(recipeList) {
  const filters = document.querySelector('.filters');
  // Nettoyer les filtres actuels avant la régénération 
  filters.innerHTML = "";

  // Réinjecter les boutons dynamiques avec les recettes filtrées
  filters.appendChild(displayFilterIngredients(recipeList));
  filters.appendChild(displayFilterAppliances(recipeList));
  filters.appendChild(displayFilterUstensils(recipeList));
}


//--------------------------------------------------------------

// Fonction pour Affiche les recettes, ou LE message d'erreur si aucune trouvée
function displayRecipes(recipeList, searchValue) {
  containerRecipeCard.innerHTML = "";

  // Pour chaque carte recipe filtrée, je la crée et je la rajoute au container
  recipeList.forEach(recipe => {
    const card = createRecipeCard(recipe);
    console.log("Ajout de la carte :", recipe.name);
    containerRecipeCard.appendChild(card);
  });

  // Condition pour si pas de recipeCard, affichage du message d'erreur
  if (recipeList.length === 0) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('errorMessage');
    const searchMessage = `«${searchValue}»`;
    errorMessage.textContent = `⚠️ Aucune recette ne contient ${searchMessage} vous pouvez chercher « tarte aux pommes», «poisson», etc. ⚠️`;

    containerRecipeCard.appendChild(errorMessage);
    return;
  }
  // MAJ du compteur de recettes ici
  updateRecipeCounter(recipeList.length); 
}


//--------------------------------------------------------------

// Fonction pour filtre les recettes selon la searchbar + les tags, puis met à jour l'affichage
function filterAndDisplayRecipes() {
  const tags = getSelectedTags();
  const searchValue = inputsearchBarHeader.value.trim().toLowerCase();

  const filtered = recipes.filter(recipe => {
    // Filtrage par texte
    // - le nom de la recette 
    const isInTitle = recipe.name.toLowerCase().includes(searchValue);
    // - la description
    const isInDescription = recipe.description.toLowerCase().includes(searchValue);
    // -teste si au moins un élément du tableau passe un des ingrédients puis me retourne un boolean pour sa présence
    const isInIngredients = recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchValue));
    // Vérifie mes conditions si une recette correspond à la recherche de l'utilisateur. (contient moins de 3 caractères OU le texte est présent dans le titre OU dans la description OU dans les ingrédients)
    const textMatch = searchValue.length < 3 || isInTitle || isInDescription || isInIngredients;

    // Filtrage par tags
    const recipeIngredients = recipe.ingredients.map(i => i.ingredient.toLowerCase());
    const recipeUstensils = recipe.ustensils.map(u => u.toLowerCase());
    const recipeAppliance = recipe.appliance.toLowerCase();

    // Séparer les tags selon leur catégorie filtrée
    const activeIngredients = tags.filter(t => t.category === 'ingredient').map(t => t.name.toLowerCase());
    const activeAppliances = tags.filter(t => t.category === 'appliance').map(t => t.name.toLowerCase());
    const activeUstensils = tags.filter(t => t.category === 'ustensil').map(t => t.name.toLowerCase());

    // Vérifie que tous les tags d'ingrédients sont présents dans la recette
    const matchesIngredients = activeIngredients.every(ing => recipeIngredients.includes(ing));
    // Vérifie que la recette utilise l'appareil sélectionné (ou ignore si aucun tag d'appareil actif)
    const matchesAppliance = activeAppliances.length === 0 || activeAppliances.includes(recipeAppliance);
    // Vérifie que tous les ustensiles requis sont présents dans la recette
    const matchesUstensils = activeUstensils.every(ust => recipeUstensils.includes(ust));

    // La recette est conservée dans le container si elle remplit toutes les conditions "texte ET tous les filtres par tags"
    return textMatch && matchesIngredients && matchesAppliance && matchesUstensils;
  });

  displayRecipes(filtered, searchValue, tags); // Affiche les recettes lors du chargement
  updateFilterButtons(filtered);
}

init();
console.log("PageWeb initialisée avec succès !");