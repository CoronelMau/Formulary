export function valida(input) {
  const tipoInput = input.dataset.tipo;

  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing", "typeMismatch", "patternMismatch", "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío"
  },
  email: {
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El correo no es válido"
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch: "Al menos 8 carácteres, debe contener una letra minúscula, mayúscula, un número y no puede contener carácteres especiales",
  },
  nacimiento: {
    valueMissing: "El campo de edad no puede estar vacío",
    customError: "Debes tener al menos 18 años",
  },
  numero: {
    valueMissing: "El campo de teléfono no puede estar vacío",
    patternMismatch: "El formato requerido es XX-XXXX-XXXX 10 números"
  },
  direccion: {
    valueMissing: "El campo de dirreción no puede estar vacío",
    patternMismatch: "La dirección debe contener entre 5 y 40 carácteres"
  }
}

const validadores = {
  nacimiento: (input) => validacionNacimiento(input),
};

function mostrarMensajeDeError(tipoInput, input) {
  let mensaje = "";

  tipoDeErrores.forEach(error => {
    if (input.validity[error]) {
      console.log(tipoInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoInput][error]);
      mensaje = mensajesDeError[tipoInput][error];
    }
  })

  return mensaje;
}

function validacionNacimiento(input) {
  const fechaUsuario = new Date(input.value);
  mayorEdad(fechaUsuario);
  let mensaje = "";

  if (!mayorEdad(fechaUsuario)) {
    mensaje = "Debes tener al menos 18 años";
  }
  input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());

  console.log(diferenciaFechas <= fechaActual);

}