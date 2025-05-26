export function totalCounterRecipes(){   
     // Création du compteur totals des recettes du siteWeb
    const counterRecipes = document.createElement('div');
    counterRecipes.classList.add('counter');
    counterRecipes.setAttribute('aria-live', 'polite');

    const totalsRecipes = document.createElement('h3');
    totalsRecipes.classList.add('h3');
    totalsRecipes.setAttribute('id', 'recipe-counter'); 
    totalsRecipes.textContent = `50 RECETTES`;
    counterRecipes.appendChild(totalsRecipes);

    return counterRecipes;
}

export function updateRecipeCounter(count) {
    const counter = document.getElementById('recipe-counter');
    if(counter){
      counter.textContent = `${count} RECETTE${count > 1 ? 'S' : ''}`;
    }
}