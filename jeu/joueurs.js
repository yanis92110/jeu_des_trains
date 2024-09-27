let joueurs = {}

function ajouter_joueurs(id,nom){
    joueurs[id] = nom;
    console.log(`${nom} ajouté avec l'ID ${id}`)
}

function supprimerJoueur(id){
    const nom = joueurs[id];
    delete joueurs[id];
    console.log(`${nom} supprimé`);
}

function listerJoueurs(){
    return joueurs;
}
module.exports = { ajouter_joueurs, supprimerJoueur, listerJoueurs};