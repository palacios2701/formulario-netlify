const URL = "https://script.google.com/macros/s/AKfycbxYY64RJxeS-KKXzqcMyjGqRliZEYlt27ud00ymS20zLsUOxeK95XViVe54cIUyBOZjoQ/exec";

function llenarFormulario(data) {
  document.getElementById("nombre").value = data["Nombre Cliente"] || "";
  document.getElementById("celular").value = data["Celular"] || "";
  document.getElementById("numero").value = data["N. Cliente Bancoppel"] || "";
  document.getElementById("fijo").value = data["Tel Fijo"] || "";
  document.getElementById("edad").value = data["Edad"] || "";
  document.getElementById("antiguedad").value = data["Antigüedad del Banco"] || "";
  document.getElementById("zona").value = data["Zona"] || "";
  document.getElementById("correo").value = data["Correo Electrónico"] || "";
  document.getElementById("tipificacion").value = data["Tipificación"] || "";
  document.getElementById("observaciones").value = data["Observaciones"] || "";
  document.getElementById("fechaHora").value = new Date().toLocaleString();
}

function generarRegistro() {
  fetch(URL + "?function=generarRegistro")
    .then(res => res.json())
    .then(data => {
      if (data.error) return alert(data.error);
      llenarFormulario(data);
    })
    .catch(err => alert("Error al generar registro: " + err));
}

function guardarRegistro() {
  const datos = {
    function: "guardarRegistro",
    "Nombre Cliente": document.getElementById("nombre").value,
    "Celular": document.getElementById("celular").value,
    "N. Cliente Bancoppel": document.getElementById("numero").value,
    "Tel Fijo": document.getElementById("fijo").value,
    "Edad": document.getElementById("edad").value,
    "Antigüedad del Banco": document.getElementById("antiguedad").value,
    "Zona": document.getElementById("zona").value,
    "Correo Electrónico": document.getElementById("correo").value,
    "Tipificación": document.getElementById("tipificacion").value,
    "Observaciones": document.getElementById("observaciones").value,
    "Fecha y Hora": document.getElementById("fechaHora").value,
    "Usuario": document.getElementById("usuario").value
  };

  const query = new URLSearchParams(datos).toString();

  fetch(URL + "?" + query)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Registro guardado correctamente.");
        location.reload();
      } else {
        alert("Error al guardar: " + data.error);
      }
    })
    .catch(err => alert("Error en la solicitud: " + err));
}

function buscarRegistro() {
  const celular = document.getElementById("busqueda").value.trim();
  if (!celular) return alert("Ingresa un número de celular para buscar.");

  fetch(`${URL}?funcion=buscarRegistro&celular=${celular}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) return alert(data.error);
      llenarFormulario(data);
    })
    .catch(err => alert("Error al buscar registro: " + err));
}


function cargarTipificaciones() {
  fetch(URL + "?function=obtenerTipificaciones")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("tipificacion");
      select.innerHTML = '<option value="">Selecciona...</option>';
      data.forEach(tipi => {
        const option = document.createElement("option");
        option.value = tipi;
        option.text = tipi;
        select.appendChild(option);
      });
    })
    .catch(err => alert("Error al cargar tipificaciones: " + err));
}

window.onload = function () {
  cargarTipificaciones();
};
