export function createRecipeCard(recipe){
    //Création de la carte de recette 
    const recipeCard = document.createElement('article');
    recipeCard.classList.add('recipe-card');
    recipeCard.setAttribute('role', 'article');
    recipeCard.setAttribute('aria-label', `Recette de ${recipe.name}`);

    const pictureCard = document.createElement('div');
    pictureCard.classList.add('card-img');
    recipeCard.appendChild(pictureCard);

    const timeRecipeCard = document.createElement('span');
    timeRecipeCard.classList.add('time-recipe');
    timeRecipeCard.setAttribute('aria-label', `Temps de préparation : ${recipe.time} minutes`);
    timeRecipeCard.textContent = `${recipe.time}min`;
    pictureCard.appendChild(timeRecipeCard);

    const picture = document.createElement('img');
    picture.classList.add('img');
    picture.src = `../assets/pictures-recipes/${recipe.image}`
    picture.setAttribute('alt', `Photo de la recette ${recipe.name}`);
    pictureCard.appendChild(picture);

    const titleRecipeCard = document.createElement('h4');
    titleRecipeCard.classList.add('h4');
    titleRecipeCard.textContent = `${recipe.name}`;
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
    recipeDescription.textContent = `${recipe.description}`;
    recipeText.appendChild(recipeDescription);

    const boxContainerIngredients = document.createElement('div');
    boxContainerIngredients.classList.add('box-container-ingredients');
    recipeText.appendChild(boxContainerIngredients);

    const titleIngredients = document.createElement('h5');
    titleIngredients.classList.add('h5');
    titleIngredients.textContent = `INGRÉDIENTS`;
    boxContainerIngredients.appendChild(titleIngredients);

    const listIngredients = document.createElement('ul');
    listIngredients.classList.add('ul');
    listIngredients.setAttribute('aria-label', 'Liste des ingrédients de la recette');
    listIngredients.setAttribute('role', 'list'); 
    boxContainerIngredients.appendChild(listIngredients);

    recipe.ingredients.forEach(({ ingredient, quantity, unit }) => {
        const ingredientItem = document.createElement('li');
        ingredientItem.classList.add('li');
        ingredientItem.setAttribute('role', 'listitem');
        listIngredients.appendChild(ingredientItem);

        const ingredientName = document.createElement('p');
        ingredientName.classList.add('ingredient');
        ingredientName.setAttribute('aria-label', `Nom de l'ingrédient : ${ingredient}`);
        ingredientName.textContent = `${ingredient}`;
        ingredientItem.appendChild(ingredientName);

        const ingredientQuantity = document.createElement('p');
        ingredientQuantity.classList.add('quantity');
        const quantityText = quantity !== undefined ? `${quantity}${unit ? ' ' + unit : ''}` : '';
        ingredientQuantity.setAttribute('aria-label', `Quantité de l'ingrédient : ${quantityText}`);
        ingredientQuantity.textContent = quantityText;
        ingredientItem.appendChild(ingredientQuantity);
    });
        return recipeCard
    }