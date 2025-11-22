//Obteniendo la referencia al elemento de los botones
//Por medio del .getelementById

const buttonSpan = document.getElementById("idBtnSpan");
const buttonP = document.getElementById("idBtnP");
const buttonDiv = document.getElementById("idBtnDiv");
const buttonButton = document.getElementById("idBtnButton");
const imprimir = document.getElementById("idImprimirResultado");
const contarElementos = function (elemento) {

    //obteniendo el numero de etiquetas que se han creado
    // En el documento html

    let arrayElement = document.getElementsByTagName(elemento);
    console.log(
        `Etiquetas buscadas <${elemento}></${elemento}> / Total encontradas : ${arrayElement.length}`
    );
    for (const i of arrayElement) {
        console.log(i);
    }

    alert("Revise la consola del navegador");
};

//DEFINICION DE EVENTOS PARA LOS BOTONES
buttonSpan.onclick = () => {
    contarElementos("span");
};

buttonP.onclick = () => {
    contarElementos("p");
};

buttonDiv.onclick = () => {
    contarElementos("div");
};

buttonButton.onclick = () => {
    contarElementos("button");
};