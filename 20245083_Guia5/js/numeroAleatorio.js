//Generamos un numero aleatorio que se encuentre en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
// Creamos una constante que permite identificar el maximo de intentos
const numeroIntentos = 3;
// Guardara el numero de intentos que realiza el usuario
let intentos = 1;
function generarNumeroAleatorio() {
    //Definimos una variable para impresion de mensajes
    let mensaje;
    // Utilizamos el dom para acceder al parrafo creado
    const parrafo = document.querySelector("#idParrafo");

    // Verificamos en que intento esta el usuario
    if (intentos <= numeroIntentos) {
        let numeroInput = prompt(
            "¿Que número se ha generado (Intento " + intentos + ")?"
        );

        //aqui la entrada pasa a número
        //Es necesario para comparar si es mayor o menor
        let numero = parseInt(numeroInput);
        //aqui finaliza la modificación

        //verificamos el numero aleatorio con el ingresado por el usuario
        if (numero === numeroAleatorio) { //Se cambia a === para comparación estricta
            mensaje = `¡Es sorprente, pudiste adivinar el numero oculto (${numeroAleatorio}).
Refresque la página para volver a jugar.`;
        } else if (intentos == numeroIntentos) {
            mensaje = `Su numero de intentos ha terminado.
El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
        } else {

            //aqui se inicia la modificación para dar pistas 
            let pista;
            if (numero < numeroAleatorio) {
                pista = "El número que busca es **más alto**.";
            } else if (numero > numeroAleatorio) {
                pista = "El número que busca es **más bajo**.";
            } else {
                pista = "Entrada no válida."; // Mensaje por si no ingresa un número
            }

            mensaje = `Incorrecto. ${pista} Quedan ${numeroIntentos - intentos
                } intentos`;
            //aqui finaliza eso
        }

        //+ intentos
        intentos++;
    } else {
        mensaje = `Su numero de intentos ha terminado.
El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }

    parrafo.innerHTML = mensaje;
}