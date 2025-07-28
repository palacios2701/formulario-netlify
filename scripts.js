
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycby5vwvZKULUs2ULIiGqn0higkzKfagQkHrfhASKCKjCqN28KVljQh0M45_dwZDROPsKCg/exec";

document.addEventListener("DOMContentLoaded", () => {
  cargarTipificaciones();
  document.getElementById("fecha").value = new Date().toLocaleString();
});

function cargarTipificaciones() {
  fetch(WEB_APP_URL + "?action=obtenerTipificaciones")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("tipificacion");
      data.forEach(t => {
        const option = document.createElement("option");
        option.value = t;
        option.textContent = t;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error al cargar tipificaciones:", err));
}

function generarRegistro() {
  fetch(WEB_APP_URL + "?action=generarRegistro")
    .then(res => res.json())
    .then(data => {
      if (data.error) return alert(data.error);
      document.getElementById("nombre").value = data.nombre || "";
      document.getElementById("celular").value = data.celular || "";
      document.getElementById("numero").value = data.numero || "";
      document.getElementById("fijo").value = data.fijo || "";
      document.getElementById("edad").value = data.edad || "";
      document.getElementById("antiguedad").value = data.antiguedad || "";
      document.getElementById("zona").value = data.zona || "";
      document.getElementById("correo").value = data.correo || "";
      document.getElementById("fecha").value = new Date().toLocaleString();
      document.getElementById("usuario").value = "";
    });
}

function guardarRegistro() {
  const data = {
    nombre: document.getElementById("nombre").value,
    celular: document.getElementById("celular").value,
    numero: document.getElementById("numero").value,
    fijo: document.getElementById("fijo").value,
    edad: document.getElementById("edad").value,
    antiguedad: document.getElementById("antiguedad").value,
    zona: document.getElementById("zona").value,
    tipificacion: document.getElementById("tipificacion").value,
    correo: document.getElementById("correo").value,
    observaciones: document.getElementById("observaciones").value
  };

  fetch(WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(err => {
      console.error("Error al guardar:", err);
      alert("Ocurrió un error al guardar.");
    });
}

function buscarRegistro() {
  const celular = document.getElementById("buscar-celular").value.trim();
  if (!celular) {
    alert("Por favor ingresa un número de celular para buscar.");
    return;
  }

  fetch(`${WEB_APP_URL}?celular=${celular}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

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
      document.getElementById("fecha").value = data["Fecha y Hora"] || "";
      document.getElementById("usuario").value = data["Usuario"] || "";
    })
    .catch(error => {
      console.error("Error al buscar el registro:", error);
      alert("Ocurrió un error al buscar el registro.");
    });
}
