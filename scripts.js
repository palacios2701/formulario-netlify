
const webAppUrl = "https://script.google.com/macros/s/AKfycby5vwvZKULUs2ULIiGqn0higkzKfagQkHrfhASKCKjCqN28KVljQh0M45_dwZDROPsKCg/exec";

function setDateTime() {
  const now = new Date();
  document.getElementById("fecha_hora").value = now.toLocaleString("es-MX");
}

async function cargarTipificaciones() {
  const response = await fetch(webAppUrl + "?tipificaciones=1");
  const datos = await response.json();
  const select = document.getElementById("tipificacion");
  select.innerHTML = "";
  datos.forEach(op => {
    const option = document.createElement("option");
    option.value = op;
    option.textContent = op;
    select.appendChild(option);
  });
}

document.getElementById("generar").addEventListener("click", async () => {
  const response = await fetch(webAppUrl + "?generar=1");
  const data = await response.json();
  if (data.error) return alert(data.error);
  document.getElementById("nombre").value = data.nombre;
  document.getElementById("celular").value = data.celular;
  document.getElementById("numero").value = data.numero;
  document.getElementById("fijo").value = data.fijo;
  document.getElementById("edad").value = data.edad;
  document.getElementById("antiguedad").value = data.antiguedad;
  document.getElementById("zona").value = data.zona;
  document.getElementById("correo").value = data.correo;
  setDateTime();
});

document.getElementById("guardar").addEventListener("click", async () => {
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

  const response = await fetch(webAppUrl, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: { "Content-Type": "application/json" }
  });

  const texto = await response.text();
  alert(texto);
});

document.getElementById("buscar").addEventListener("click", async () => {
  const cel = document.getElementById("buscar_cel").value;
  if (!cel) return alert("Ingresa el número a buscar");

  const response = await fetch(webAppUrl + "?celular=" + encodeURIComponent(cel));
  const data = await response.json();
  if (data.error) return alert(data.error);

  document.getElementById("nombre").value = data["Nombre Cliente"] || data.nombre || "";
  document.getElementById("celular").value = data.celular || "";
  document.getElementById("numero").value = data["N. Cliente Bancoppel"] || data.numero || "";
  document.getElementById("fijo").value = data["Tel Fijo"] || data.fijo || "";
  document.getElementById("edad").value = data.edad || "";
  document.getElementById("antiguedad").value = data["Antigüedad del Banco"] || data.antiguedad || "";
  document.getElementById("zona").value = data.zona || "";
  document.getElementById("correo").value = data["Correo Electrónico"] || data.correo || "";
  document.getElementById("tipificacion").value = data.tipificacion || "";
  document.getElementById("observaciones").value = data.observaciones || "";
  setDateTime();
});

window.onload = () => {
  cargarTipificaciones();
  setDateTime();
};
