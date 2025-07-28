const API_URL = "https://script.google.com/macros/s/AKfycby5vwvZKULUs2ULIiGqn0higkzKfagQkHrfhASKCKjCqN28KVljQh0M45_dwZDROPsKCg/exec";

window.onload = () => {
  cargarTipificaciones();
  document.getElementById("generar").onclick = generarRegistro;
  document.getElementById("guardar").onclick = guardarRegistro;
  document.getElementById("buscar").onclick = buscarRegistro;
  document.getElementById("fecha_hora").value = new Date().toLocaleString("es-MX");
};

function cargarTipificaciones() {
  fetch(API_URL + "?action=obtenerTipificaciones")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("tipificacion");
      select.innerHTML = data.map(t => `<option>${t}</option>`).join("");
    })
    .catch(() => alert("Error al cargar tipificaciones"));
}

function generarRegistro() {
  fetch(API_URL + "?action=generarRegistro")
    .then(res => res.json())
    .then(data => {
      if (data.error) return alert(data.error);
      document.getElementById("nombre").value = data["Nombre Cliente"];
      document.getElementById("celular").value = data["Celular"];
      document.getElementById("cliente").value = data["N. Cliente Bancoppel"];
      document.getElementById("tel_fijo").value = data["Tel Fijo"];
      document.getElementById("edad").value = data["Edad"];
      document.getElementById("antiguedad").value = data["Antigüedad del Banco"];
      document.getElementById("zona").value = data["Zona"];
      document.getElementById("correo").value = data["Correo Electrónico"];
      document.getElementById("fecha_hora").value = new Date().toLocaleString("es-MX");
    })
    .catch(() => alert("Error al generar registro"));
}

function guardarRegistro() {
  const data = {
    nombre: document.getElementById("nombre").value,
    celular: document.getElementById("celular").value,
    numero: document.getElementById("cliente").value,
    fijo: document.getElementById("tel_fijo").value,
    edad: document.getElementById("edad").value,
    antiguedad: document.getElementById("antiguedad").value,
    zona: document.getElementById("zona").value,
    tipificacion: document.getElementById("tipificacion").value,
    correo: document.getElementById("correo").value,
    observaciones: document.getElementById("observaciones").value,
    fecha_hora: document.getElementById("fecha_hora").value,
    usuario: document.getElementById("usuario").value
  };

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(text => alert(text))
    .catch(() => alert("Error al guardar"));
}

function buscarRegistro() {
  const celular = document.getElementById("buscar_celular").value;
  if (!celular) return alert("Ingresa un celular");

  fetch(`${API_URL}?celular=${celular}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) return alert(data.error);
      document.getElementById("nombre").value = data["Nombre Cliente"];
      document.getElementById("celular").value = data["Celular"];
      document.getElementById("cliente").value = data["N. Cliente Bancoppel"];
      document.getElementById("tel_fijo").value = data["Tel Fijo"];
      document.getElementById("edad").value = data["Edad"];
      document.getElementById("antiguedad").value = data["Antigüedad del Banco"];
      document.getElementById("zona").value = data["Zona"];
      document.getElementById("tipificacion").value = data["Tipificación"];
      document.getElementById("correo").value = data["Correo Electrónico"];
      document.getElementById("observaciones").value = data["Observaciones"];
      document.getElementById("fecha_hora").value = data["Fecha y Hora"];
      document.getElementById("usuario").value = data["Usuario"];
    })
    .catch(() => alert("Error al buscar"));
}
