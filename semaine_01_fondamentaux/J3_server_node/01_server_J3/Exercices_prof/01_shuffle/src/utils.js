// logique métier
function shuflleUsers( users ){
    let html = '<ul>';

    // le sort mélange les éléments par référence ...
    // effectivement c'est pas simple mais une fois mélangés
    // les éléments sont mélangés dans le tableau initial
    // c'est ce que l'on appelle par référence
    // regarder d'ailleurs l'exemple dans la doc
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    users.sort( (a, b) => Math.random() - 0.5) ;

    for(const user of users){
        html += `<li>${user}</li>`;
    }

    html += '</ul>';

    return html;
}

// on export le nom de la fonction directement accessible dans le code par la suite
module.exports = shuflleUsers ;