
const urlBase = "https://script.google.com/macros/s/AKfycby5vwvZKULUs2ULIiGqn0higkzKfagQkHrfhASKCKjCqN28KVljQh0M45_dwZDROPsKCg/exec";

document.addEventListener("DOMContentLoaded", () => {
  cargarTipificaciones();

  document.getElementById("btnGenerar").addEventListener("click", generarRegistro);
  document.getElementById("btnGuardar").addEventListener("click", guardarRegistro);
  document.getElementById("btnBuscar").addEventListener("click", buscarRegistro);
});

function cargarTipificaciones() {
  fetch(urlBase + "?accion=tipificaciones")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("tipificacion");
      select.innerHTML = "<option value=''>Seleccione</option>";
      data.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error cargando tipificaciones:", err));
}

function generarRegistro() {
  fetch(urlBase + "?accion=generar")
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }
      document.getElementById("nombre").value = data.nombre || "";
      document.getElementById("celular").value = data.celular || "";
      document.getElementById("numero").value = data.numero || "";
      document.getElementById("fijo").value = data.fijo || "";
      document.getElementById("edad").value = data.edad || "";
      document.getElementById("antiguedad").value = data.antiguedad || "";
      document.getElementById("zona").value = data.zona || "";
      document.getElementById("correo").value = data.correo || "";
    })
    .catch(err => console.error("Error generando registro:", err));
}

function guardarRegistro() {
  const datos = {
    nombre: document.getElementById("nombre").value,
    celular: document.getElementById("celular").value,
    numero: document.getElementById("numero").value,
    fijo: document.getElementById("fijo").value,
    edad: document.getElementById("edad").value,
    antiguedad: document.getElementById("antiguedad").value,
    zona: document.getElementById("zona").value,
    tipificacion: document.getElementById("tipificacion").value,
    correo: document.getElementById("correo").value,
    observaciones: document.getElementById("observaciones").value,
    usuario: document.getElementById("usuario").value
  };

  fetch(urlBase, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      limpiarCampos();
    })
    .catch(err => console.error("Error guardando registro:", err));
}

function buscarRegistro() {
  const celularBuscar = document.getElementById("buscarCelular").value;
  if (!celularBuscar) {
    alert("Ingrese un número celular para buscar.");
    return;
  }

  fetch(urlBase + "?celular=" + encodeURIComponent(celularBuscar))
    .then(res => res.json())
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
      document.getElementById("tipificacion").value = data["Tipificación"] || "";
      document.getElementById("correo").value = data["Correo Electrónico"] || "";
      document.getElementById("observaciones").value = data["Observaciones"] || "";
      document.getElementById("usuario").value = data["Usuario"] || "";
    })
    .catch(err => console.error("Error buscando registro:", err));
}

function limpiarCampos() {
  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id !== "buscarCelular" && el.id !== "tipificacion") el.value = "";
    if (el.id === "tipificacion") el.selectedIndex = 0;
  });
}
