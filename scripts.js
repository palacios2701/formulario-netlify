// scripts.js

const url = "https://script.google.com/macros/s/AKfycby5vwvZKULUs2ULIiGqn0higkzKfagQkHrfhASKCKjCqN28KVljQh0M45_dwZDROPsKCg/exec";

window.onload = function () {
  cargarTipificaciones();
  actualizarFechaHora();
};

function actualizarFechaHora() {
  const fechaHoraInput = document.getElementById("fecha_hora");
  const ahora = new Date();
  fechaHoraInput.value = ahora.toLocaleString("es-MX");
}

function cargarTipificaciones() {
  fetch(url + "?accion=tipificaciones")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("tipificacion");
      data.forEach((tipo) => {
        const option = document.createElement("option");
        option.value = tipo;
        option.text = tipo;
        select.appendChild(option);
      });
    })
    .catch((error) => console.error("Error al cargar tipificaciones:", error));
}

document.getElementById("generar").addEventListener("click", () => {
  fetch(url + "?accion=generar")
    .then((res) => res.json())
    .then((data) => llenarFormulario(data))
    .catch((err) => console.error("Error al generar registro:", err));
});

document.getElementById("guardar").addEventListener("click", () => {
  const datos = obtenerDatosFormulario();
  fetch(url, {
    method: "POST",
    body: JSON.stringify(datos),
  })
    .then((res) => res.text())
    .then((data) => alert("Registro guardado: " + data))
    .catch((err) => console.error("Error al guardar registro:", err));
});

document.getElementById("buscar").addEventListener("click", () => {
  const celular = document.getElementById("buscar_celular").value.trim();
  if (!celular) return alert("Ingrese el número de celular a buscar");
  fetch(`${url}?accion=buscar&celular=${celular}`)
    .then((res) => res.json())
    .then((data) => {
      if (data) llenarFormulario(data);
      else alert("No se encontró ningún registro con ese celular");
    })
    .catch((err) => console.error("Error al buscar registro:", err));
});

function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById("nombre").value,
    celular: document.getElementById("celular").value,
    cliente: document.getElementById("cliente").value,
    tel_fijo: document.getElementById("tel_fijo").value,
    edad: document.getElementById("edad").value,
    antiguedad: document.getElementById("antiguedad").value,
    zona: document.getElementById("zona").value,
    tipificacion: document.getElementById("tipificacion").value,
    correo: document.getElementById("correo").value,
    observaciones: document.getElementById("observaciones").value,
    fecha_hora: document.getElementById("fecha_hora").value,
    usuario: document.getElementById("usuario").value,
  };
}

function llenarFormulario(data) {
  document.getElementById("nombre").value = data.nombre || "";
  document.getElementById("celular").value = data.celular || "";
  document.getElementById("cliente").value = data.cliente || "";
  document.getElementById("tel_fijo").value = data.tel_fijo || "";
  document.getElementById("edad").value = data.edad || "";
  document.getElementById("antiguedad").value = data.antiguedad || "";
  document.getElementById("zona").value = data.zona || "";
  document.getElementById("tipificacion").value = data.tipificacion || "";
  document.getElementById("correo").value = data.correo || "";
  document.getElementById("observaciones").value = data.observaciones || "";
  document.getElementById("fecha_hora").value = data.fecha_hora || "";
  document.getElementById("usuario").value = data.usuario || "";
}
