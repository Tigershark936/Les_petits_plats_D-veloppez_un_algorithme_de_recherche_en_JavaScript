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
  const tags = getSelectedTags(); // Récupère les tags actifs (ingrédients, ustensiles, appareil)
  const searchValue = inputsearchBarHeader.value.trim().toLowerCase(); // Récupère la valeur de l'input principal.

  // Tableau final contenant les recettes filtrées
  let filteredRecipes = [];

  // Boucle principale sur toutes les recettes du tableau
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const title = recipe.name.toLowerCase();
    const description = recipe.description.toLowerCase();
    console.log(`Recette analysée : ${recipe.name}`); // Suivi de la recette en cours

    // Vérifie si un ingrédient contient la recherche
    let foundInIngredients = false;
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
      if (ingredient.includes(searchValue)) {
        foundInIngredients = true;
        console.log(`ingrédient trouvé: "${ingredient}" dans la ${recipe.name}`);
        break;
      }
    }

    // Vérifie si le titre ou la description matchent la recherche
    const isInTitle = title.includes(searchValue);
    const isInDescription = description.includes(searchValue);

    // Condition : testmatch si texte < 3 caractères ou s’il est trouvé dans un des 3 champs
    const textMatch = searchValue.length < 3 || isInTitle || isInDescription || foundInIngredients;


    // Filtrage par tags avec des tableaux (ingredients / ustensils / appliance)
    const recipeIngredients = [];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      recipeIngredients.push(recipe.ingredients[j].ingredient.toLowerCase());
    }

    const recipeUstensils = [];
    for (let j = 0; j < recipe.ustensils.length; j++) {
      recipeUstensils.push(recipe.ustensils[j].toLowerCase());
    }

    const recipeAppliance = recipe.appliance.toLowerCase();

    
    // Trie les tags actifs selon leur type
    const activeIngredients = [];
    const activeAppliances = [];
    const activeUstensils = [];

    // Parcourt tous les tags sélectionnés par l’utilisateur
    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j];
      const name = tag.name.toLowerCase();
      // Si c'est une catégorie "...", ajoute-le à la liste des "..." actifs
      if (tag.category === 'ingredient') activeIngredients.push(name);
      if (tag.category === 'appliance') activeAppliances.push(name);
      if (tag.category === 'ustensil') activeUstensils.push(name);
    }

    // Vérifie que tous les tags ingrédients sont présents dans la recette
    let matchesIngredients = true;
    for (let j = 0; j < activeIngredients.length; j++) {
      if (!recipeIngredients.includes(activeIngredients[j])) {
        matchesIngredients = false;
        break;
      }
    }

    // Vérifie que l’appareil électroménager corresponds au moins un tag sélectionné
    let matchesAppliance = activeAppliances.length === 0;
    for (let j = 0; j < activeAppliances.length; j++) {
      if (activeAppliances[j] === recipeAppliance) {
        matchesAppliance = true;
        break;
      }
    }

    // Vérifie que tous les ustensiles sélectionnés sont bien dans la recette
    let matchesUstensils = true;
    for (let j = 0; j < activeUstensils.length; j++) {
      if (!recipeUstensils.includes(activeUstensils[j])) {
        matchesUstensils = false;
        break;
      }
    }

    // Si la ou les recette(s) correspond à la recherche principale ET tous les tags → on l’ajoute
    if (textMatch && matchesIngredients && matchesAppliance && matchesUstensils) {
      filteredRecipes.push(recipe);
      console.log(`Recette gardé : ${recipe.name}`);
    }
  }
  displayRecipes(filteredRecipes, searchValue, tags);
  updateFilterButtons(filteredRecipes);
}

init();
console.log("PageWeb initialisée avec succès !");