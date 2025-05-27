// On crée un objet de base avec une propriété "tags" qu'on veut surveiller
const listeTags = { tags: [] };

// Cette fonction sera appelée à chaque changement des tags actifs
let onSelectedTagsChange = () => {};

// On crée un Proxy pour surveiller notre objet
const proxyTags = new Proxy(listeTags, {
    // La méthode "set" est appelée à chaque fois qu'on modifie une propriété
    // objet → c’est { tag: [] }
    // propriete → par ex "tags"
    // nouvelleValeur → le tableau mis à jour 
    set(objet, propriete, nouvelleValeur){
        //On affecte correctement la nouvelle valeur à la bonne propriété
        objet[propriete] = nouvelleValeur;
         // On vérifie qu'on est bien en train de modifier "tags"
        if(propriete === 'tags'){
            // On déclenche la fonction d'observation avec la nouvelle valeur
            onSelectedTagsChange(nouvelleValeur);
        } 
        // On retourne obligatoirement true pour que le Proxy accepte le changement
        return true;
    }
});

// Test : quand la fonction est déclenchée, on log ce qu'on reçoit
onSelectedTagsChange = (recipe) => {
    console.log("recette selectionnée:", recipe);   
}


export const onTagUpdate = (callback) => {
    console.log("tag rajouté"); // juste pour vérifier que quelqu’un click sur le tag
    onSelectedTagsChange = callback;
}

// Fonction pour ajouter un tag à la liste sans doublon
export const addTag = (tag) => {
    const validTag = proxyTags.tags.find(tagInList => {
        return tagInList.name === tag.name && tagInList.category === tag.category;
    });

    // Si le tag n'existe pas encore, on l’ajoute
    if (!validTag) {
      proxyTags.tags = [...proxyTags.tags, tag];
    }
}

// Fonction pour retirer un tag de la liste
const removeTag = (tag) => {
    const filteredTags = proxyTags.tags.filter(tagInList => {
        return tagInList.name !== tag.name || tagInList.category !== tag.category;
    });
    
    // J’assigne ce nouveau tableau au proxy pour déclencher la mise à jour
    proxyTags.tags = filteredTags;
}

export function createTagElement(tag){
    const boxTag = document.createElement('div');
    boxTag.classList.add('box-tag');

    const tagName = document.createElement('span');
    tagName.textContent = tag.name;
    tagName.classList.add('tag-name');
    boxTag.appendChild(tagName);

    const closeButtonTag = document.createElement('button');
    closeButtonTag.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    closeButtonTag.classList.add('tag-close');
    boxTag.appendChild(closeButtonTag);

    closeButtonTag.addEventListener('click', () => {
        removeTag(tag);
    });
    return boxTag
};

export const getSelectedTags = () => [...proxyTags.tags];