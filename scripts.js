const url = "https://script.google.com/macros/s/AKfycby5vwvZKULUs2ULIiGqn0higkzKfagQkHrfhASKCKjCqN28KVljQh0M45_dwZDROPsKCg/exec";

window.onload = function () {
  fetch(url + "?funcion=obtenerTipificaciones")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("tipificacion");
      data.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item;
        opt.textContent = item;
        select.appendChild(opt);
      });
    });
};

function generarRegistro() {
  fetch(url + "?funcion=generarRegistro")
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        document.getElementById("nombre").value = data.nombre || "";
        document.getElementById("celular").value = data.celular || "";
        document.getElementById("numero").value = data.numero || "";
        document.getElementById("fijo").value = data.fijo || "";
        document.getElementById("edad").value = data.edad || "";
        document.getElementById("antiguedad").value = data.antiguedad || "";
        document.getElementById("zona").value = data.zona || "";
        document.getElementById("correo").value = data.correo || "";
        document.getElementById("fechaHora").value = new Date().toLocaleString();
      }
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
    observaciones: document.getElementById("observaciones").value,
    fechaHora: document.getElementById("fechaHora").value,
    usuario: document.getElementById("usuario").value
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(msg => alert(msg));
}

function buscarRegistro() {
  const celular = document.getElementById("buscarCelular").value;
  if (!celular) return alert("Ingrese un celular");

  fetch(url + "?celular=" + celular)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        document.getElementById("nombre").value = data["Nombre Cliente"] || "";
        document.getElementById("celular").value = data["Celular"] || "";
        document.getElementById("numero").value = data["N. Cliente Bancoppel"] || "";
        document.getElementById("fijo").value = data["Tel Fijo"] || "";
        document.getElementById("edad").value = data["Edad"] || "";
        document.getElementById("antiguedad").value = data["Antigüedad del Banco"] || "";
        document.getElementById("zona").value = data["Zona"] || "";
        document.getElementById("correo").value = data["Correo Electrónico"] || "";
        document.getElementById("observaciones").value = data["Observaciones"] || "";
        document.getElementById("fechaHora").value = data["Fecha y Hora"] || "";
        document.getElementById("usuario").value = data["Usuario"] || "";
        document.getElementById("tipificacion").value = data["Tipificación"] || "";
      }
    });
}
