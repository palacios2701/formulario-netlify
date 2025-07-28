
const URL = "https://script.google.com/macros/s/AKfycbze6NbxPi2FGeOPajaG458qQ-MmOXoOddSuJ9uElMNhHeJMr0SoU25-vtfyqHz3mQSs9g/exec";


function llenarFormulario(data) {
  document.getElementById("nombre").value = data.nombre || "";
  document.getElementById("celular").value = data.celular || "";
  document.getElementById("numero").value = data.numero || "";
  document.getElementById("fijo").value = data.fijo || "";
  document.getElementById("edad").value = data.edad || "";
  document.getElementById("antiguedad").value = data.antiguedad || "";
  document.getElementById("zona").value = data.zona || "";
  document.getElementById("correo").value = data.correo || "";
  document.getElementById("tipificacion").value = data.tipificacion || "";
  document.getElementById("observaciones").value = data.observaciones || "";
  document.getElementById("fechaHora").value = new Date().toLocaleString();
}

function generarRegistro() {
  fetch(url + "?funcion=generarRegistro")
    .then(res => res.json())
    .then(data => {
      if (data.error) return alert(data.error);
      llenarFormulario(data);
    })
    .catch(err => alert("Error al generar registro: " + err));
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
    correo: document.getElementById("correo").value,
    tipificacion: document.getElementById("tipificacion").value,
    observaciones: document.getElementById("observaciones").value,
    usuario: document.getElementById("usuario").value
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(err => alert("Error al guardar: " + err));
}

function buscarRegistro() {
  const celular = document.getElementById("buscarCelular").value;
  if (!celular) return alert("Ingresa un celular para buscar.");

  fetch(url + "?celular=" + encodeURIComponent(celular))
    .then(res => res.json())
    .then(data => {
      if (data.error) return alert(data.error);
      llenarFormulario(data);
    })
    .catch(err => alert("Error al buscar: " + err));
}

function cargarTipificaciones() {
  fetch(`${URL}?function=obtenerTipificaciones`)
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById("tipificacion");
      select.innerHTML = '<option value="">Selecciona...</option>';
      data.forEach(tipi => {
        const option = document.createElement("option");
        option.value = tipi;
        option.textContent = tipi;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error al cargar tipificaciones:", error);
    });
}


window.onload = cargarTipificaciones;
