// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
const bodyModal = document.getElementById("idBodyModal");

// Función para validar y recorrer el formulario
const validarFormulario = function () {
    let errores = [];
    let datosValidos = [];

    // Validar campos vacíos 
    const nombres = formulario.elements["idNombre"].value;
    const apellidos = formulario.elements["idApellidos"].value;
    const correo = formulario.elements["idCorreo"].value;
    const password = formulario.elements["idPassword"].value;
    const passwordRep = formulario.elements["idPasswordRepetir"].value;
    const fechaNac = formulario.elements["idFechaNac"].value;
    const pais = formulario.elements["idCmPais"].value;

    if (!nombres || !apellidos || !correo || !password || !passwordRep || !fechaNac) {
        alert("Por favor, complete todos los campos de texto.");
        return;
    }
    datosValidos.push({ label: "Nombres", value: nombres });
    datosValidos.push({ label: "Apellidos", value: apellidos });

    //Validar Fecha de Nacimiento
    let fechaActual = new Date();
    let fechaIngresada = new Date(fechaNac);
    if (fechaIngresada > fechaActual) {
        errores.push("La fecha de nacimiento no puede ser futura.");
    } else {
        datosValidos.push({ label: "Fecha Nacimiento", value: fechaNac });
    }

    //Validar Correo
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(correo)) {
        errores.push("El formato del correo electrónico no es válido.");
    } else {
        datosValidos.push({ label: "Correo", value: correo });
    }

    //Validar Contraseñas Iguales
    if (password !== passwordRep) {
        errores.push("Las contraseñas no coinciden.");
    } else {
        datosValidos.push({ label: "Contraseña", value: "******" }); // Por seguridad no mostramos la clave real
    }

    // Validar Intereses 
    const interesesChecked = formulario.querySelectorAll('input[type="checkbox"]:checked');
    if (interesesChecked.length === 0) {
        errores.push("Debe seleccionar al menos un interés.");
    } else {
        let intereses = [];
        interesesChecked.forEach(chk => {
            // Buscamos el label para obtener el texto bonito
            let label = formulario.querySelector(`label[for="${chk.id}"]`).textContent;
            intereses.push(label);
        });
        datosValidos.push({ label: "Intereses", value: intereses.join(", ") });
    }

    //Validar Carrera
    const carreraChecked = formulario.querySelector('input[name="idRdCarrera"]:checked');
    if (!carreraChecked) {
        errores.push("Debe seleccionar una carrera.");
    } else {
        let labelCarrera = formulario.querySelector(`label[for="${carreraChecked.id}"]`).textContent;
        datosValidos.push({ label: "Carrera", value: labelCarrera });
    }

    // Validar País
    // Asumiendo que el primer option de Seleccione una opcion tiene valor vacío o texto por defecto
    if (pais === "Seleccione una opcion" || pais === "") {
        errores.push("Debe seleccionar un país de origen.");
    } else {
        // Obtenemos el texto de la opción seleccionada, no el valor numérico
        const paisTexto = formulario.elements["idCmPais"].options[formulario.elements["idCmPais"].selectedIndex].text;
        datosValidos.push({ label: "País", value: paisTexto });
    }

    // MOSTRAR RESULTADOS O ERRORES
    if (errores.length > 0) {
        alert("Errores encontrados:\n" + errores.join("\n"));
    } else {
        crearTablaModal(datosValidos);
    }
};

const crearTablaModal = function (datos) {
    // Limpiamos el contenido previo del modal 
    // O mejor, usamos while loop
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    // Crear elemento tabla
    const table = document.createElement("table");
    table.className = "table table-striped table-bordered";

    // Crear encabezado tabla
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.textContent = "Campo";
    const th2 = document.createElement("th");
    th2.textContent = "Valor Ingresado";
    
    trHead.appendChild(th1);
    trHead.appendChild(th2);
    thead.appendChild(trHead);
    table.appendChild(thead);

    // Crear cuerpo tabla
    const tbody = document.createElement("tbody");

    datos.forEach(dato => {
        const tr = document.createElement("tr");
        
        const tdLabel = document.createElement("td");
        tdLabel.textContent = dato.label;
        tdLabel.style.fontWeight = "bold";

        const tdValue = document.createElement("td");
        tdValue.textContent = dato.value;

        tr.appendChild(tdLabel);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    // Agregar la tabla construida al cuerpo del modal
    bodyModal.appendChild(table);

    // Mostrar modal
    modal.show();
};

// agregando eventos al boton
button.onclick = () => {
    validarFormulario();
};
