// Construction de la page index.html en dynamique

const Header = document.createElement('div');
Header.classList.add('header');
Header.setAttribute('role', 'banner'); // Zone de l'en-tête
document.body.appendChild(Header);
console.log(Header);

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

// BARRE DE RECHERCHE
const searchBarHeader = document.createElement('div');
searchBarHeader.classList.add('search-bar');
searchBarHeader.setAttribute('role', 'search');
Header.appendChild(searchBarHeader);

// INPUT DE LA SEARCH BAR
const inputsearchBarHeader = document.createElement('input');
inputsearchBarHeader.type = "search";
inputsearchBarHeader.id = "search";
inputsearchBarHeader.placeholder = "Rechercher une recette, un ingrédient, ...";
inputsearchBarHeader.setAttribute("aria-label", "Barre de recherche");
searchBarHeader.appendChild(inputsearchBarHeader);

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

const main = document.createElement('main');
main.classList.add('main');
main.setAttribute('role', 'main');
document.body.appendChild(main);
console.log(main);

// Création de la boite des 3 filtres et du compteur des recipes 
const filtersAndCounter = document.createElement('div');
filtersAndCounter.classList.add('filters-Counter');
filtersAndCounter.setAttribute('aria-label', 'Filtres et compteur de recettes du siteWeb');
main.appendChild(filtersAndCounter);

const filters = document.createElement('div');
filters.classList.add('filters');
filters.setAttribute('role', 'group'); 
filtersAndCounter.appendChild(filters);

//--------------------------------------------------------------

// Création du filtre ingrédients
const filterIngredients = document.createElement('button');
filterIngredients.classList.add('button-filters');
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

//--------------------------------------------------------------

// Création du filtre appareils électroménagers
const filterAppliances = document.createElement('button');
filterAppliances.classList.add('button-filters');
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
filterUstensils.classList.add('button-filters');
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
filtersAndCounter.appendChild(counterRecipes);

const totalsRecipes = document.createElement('h3');
totalsRecipes.classList.add('h3');
totalsRecipes.textContent = `50 RECETTES`;
counterRecipes.appendChild(totalsRecipes);

//--------------------------------------------------------------

//Création de la carte de recette 
const recipeCard = document.createElement('article');
recipeCard.classList.add('recipe-card');
recipeCard.setAttribute('role', 'article');
recipeCard.setAttribute('aria-label', 'Recette de ....');
main.appendChild(recipeCard);

const pictureCard = document.createElement('div');
pictureCard.classList.add('card-img');
recipeCard.appendChild(pictureCard);

const timeRecipeCard = document.createElement('span');
timeRecipeCard.classList.add('time-recipe');
timeRecipeCard.setAttribute('aria-label', 'Temps de préparation : ... minutes');
timeRecipeCard.textContent = `10min`;
pictureCard.appendChild(timeRecipeCard);

const picture = document.createElement('img');
picture.classList.add('img');
picture.setAttribute('alt', 'Photo de la recette ...');
pictureCard.appendChild(picture);

const titleRecipeCard = document.createElement('h4');
titleRecipeCard.classList.add('h4');
titleRecipeCard.textContent = `Limonade de coco`;
recipeCard.appendChild(titleRecipeCard);

const recipeText = document.createElement('div');
recipeText.classList.add('recipe-text');
recipeCard.appendChild(recipeText);

const titleRecipe = document.createElement('h5');
titleRecipe.classList.add('h5');
titleRecipe.textContent = (`RECETTE`);
recipeText.appendChild(titleRecipe);

const recipeDescription = document.createElement('p');
recipeDescription.classList.add('recipe-description');
recipeDescription.textContent = `Mettre les glaçons à votre goût dans le blender, Ajouter le lait  la crème de coco, le jus de 2 citrons et le sucre ensemble. Mixer jusqu'à obtenir la consistance désirée.`;
recipeText.appendChild(recipeDescription);

const titleIngredients = document.createElement('h5');
titleIngredients.classList.add('h5');
titleIngredients.textContent = `INGRÉDIENTS`;
recipeText.appendChild(titleIngredients);

const listIngredients = document.createElement('ul');
listIngredients.classList.add('ul');
listIngredients.setAttribute('aria-label', 'Liste des ingrédients de la recette');
listIngredients.setAttribute('role', 'list'); 
recipeText.appendChild(listIngredients);

const ingredientItem = document.createElement('li');
ingredientItem.classList.add('li');
ingredientItem.setAttribute('aria-label', 'ingrédient : ....');
ingredientItem.setAttribute('role', 'listitem');
listIngredients.appendChild(ingredientItem);

const ingredient = document.createElement('p');
ingredient.classList.add('ingredient');
ingredient.textContent = `Lait de coco`;
ingredient.setAttribute('aria-label', "Nom de l'ingrédient");
ingredientItem.appendChild(ingredient);

const ingredientQuantity = document.createElement('p');
ingredientQuantity.classList.add('quantity');
ingredientQuantity.textContent = `400ml`;
ingredientQuantity.setAttribute('aria-label', "Quantité de l'ingrédient");
ingredientItem.appendChild(ingredientQuantity);