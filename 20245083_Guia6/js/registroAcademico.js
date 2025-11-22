document.addEventListener("DOMContentLoaded", function () {
    const containerEstudiantes = document.querySelector("#idContainerEstudiantes");
    const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
    const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");

    btnAddEstudiante.addEventListener("click", addEstudiantes);
    btnViewEstudiantes.addEventListener("click", viewEstudiantes);

    let arrayEstudiantes = new Array();

    const regexCarnet = /^[A-Z]{2}\d{3}$/;
    const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
    const regexDUI = /^\d{8}-\d{1}$/;
    const regexNIT = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexEdad = /^\d+$/;

    function addEstudiantes() {
        const carnet = document.querySelector("#inputCarnet").value.trim().toUpperCase();
        const nombre = document.querySelector("#inputNombre").value.trim().toUpperCase();
        const apellidos = document.querySelector("#inputApellidos").value.trim().toUpperCase();
        const dui = document.querySelector("#inputDUI").value.trim();
        const nit = document.querySelector("#inputNIT").value.trim();
        const fechaNac = document.querySelector("#inputFechaNac").value;
        const correo = document.querySelector("#inputCorreo").value.trim();
        const edad = document.querySelector("#inputEdad").value.trim();

        if (!regexCarnet.test(carnet)) {
            alert("Error en CARNET. Formato requerido: 2 letras y 3 números (Ej: AB001)");
            return;
        }

        if (!regexNombre.test(nombre)) {
            alert("Error en NOMBRE. Solo se permiten letras.");
            return;
        }

        if (!regexNombre.test(apellidos)) {
            alert("Error en APELLIDOS. Solo se permiten letras.");
            return;
        }

        if (!regexDUI.test(dui)) {
            alert("Error en DUI. Formato requerido: ########-#");
            return;
        }

        if (!regexNIT.test(nit)) {
            alert("Error en NIT. Formato requerido: ####-######-###-#");
            return;
        }

        if (fechaNac === "") {
            alert("Error. Debe seleccionar una FECHA DE NACIMIENTO.");
            return;
        }

        if (!regexCorreo.test(correo)) {
            alert("Error en CORREO. Ingrese un correo válido.");
            return;
        }

        if (!regexEdad.test(edad)) {
            alert("Error en EDAD. Ingrese solo números.");
            return;
        }

        arrayEstudiantes.push(
            new Array(carnet, nombre, apellidos, dui, nit, fechaNac, correo, edad)
        );

        alert("Se registró el nuevo estudiante correctamente");

        document.querySelector("form").reset();
        document.querySelector("#inputCarnet").focus();
    }

    function viewEstudiantes() {
        let totalEstudiantes = arrayEstudiantes.length;

        if (totalEstudiantes > 0) {
            let table = "<div class='table-responsive'><table class='table table-light table-striped'>";
            table += "<thead>";
            table += "<tr>";
            table += "<th>#</th>";
            table += "<th>Carnet</th>";
            table += "<th>Nombres</th>";
            table += "<th>Apellidos</th>";
            table += "<th>DUI</th>";
            table += "<th>NIT</th>";
            table += "<th>Fecha Nac.</th>";
            table += "<th>Correo</th>";
            table += "<th>Edad</th>";
            table += "</tr>";
            table += "</thead>";
            table += "<tbody>";

            for (let i = 0; i < arrayEstudiantes.length; i++) {
                let estudiante = arrayEstudiantes[i];

                table += `<tr>`;
                table += `<td class='fw-bold text-center'>${i + 1}</td>`;
                table += `<td>${estudiante[0]}</td>`;
                table += `<td>${estudiante[1]}</td>`;
                table += `<td>${estudiante[2]}</td>`;
                table += `<td>${estudiante[3]}</td>`;
                table += `<td>${estudiante[4]}</td>`;
                table += `<td>${estudiante[5]}</td>`;
                table += `<td>${estudiante[6]}</td>`;
                table += `<td>${estudiante[7]}</td>`;
                table += `</tr>`;
            }

            table += "</tbody>";
            table += "</table></div>";
            containerEstudiantes.innerHTML = table;
        } else {
            alert("No se han registrado estudiantes");
        }
    }
});
