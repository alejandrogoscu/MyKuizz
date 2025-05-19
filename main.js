
const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple"
const logo = document.getElementById("logo")
const bienvenida = document.getElementById("bienvenida")
const questionario = document.getElementById("questionario")
const final = document.getElementById("final")
const pregunta = document.getElementById("pregunta")
const resultadoDiv = document.getElementById("frase-resultado")
const contenedorSec = document.getElementById("contenedor-sec")
const contador = document.getElementById("contador")
const resultado = document.getElementById("resultado")
const resPuntuacion = document.getElementById("puntuacion")
const resNota = document.getElementById("res-nota")


const btnEmpezar = document.getElementById("btn-empezar")
const botonesRespuesta = document.getElementById("botones-respuesta")
const btnSiguiente = document.getElementById("btn-next")
const btnStats = document.getElementById("btn-stats")
const btnSalir = document.getElementById("btn-salir")
const btnStatsRes = document.getElementById("btn-stats-res")
const btnRejugar = document.getElementById("btn-rejugar")


let preguntaActual;
let puntuacion = 0;
let preguntas = [];
let correctas = [];
let incorrectas = [];

// Decofificar carácteres de la API.
function decodeHTMLEntities(text) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  return doc.documentElement.textContent;
}
// funciones para ocultar y borrar.
function ocultarTodo() {
  bienvenida.classList.add("hide")
  questionario.classList.add("hide")
  final.classList.add("hide")
  contenedorSec.classList.add("hide")
  btnSiguiente.classList.add("hide")
  btnSalir.classList.add("hide")
}
function irBienvenida() {
  ocultarTodo()
  bienvenida.classList.remove("hide")
  contador.innerText = "1/10"
}
function irQuestionario() {
  ocultarTodo()
  questionario.classList.remove("hide")
  contenedorSec.classList.remove("hide")
  btnSalir.classList.remove("hide")
}
function borrarDivs() {
  botonesRespuesta.innerHTML = ""
  resultadoDiv.innerHTML = ""
}



// Lógica del Quiz.
function mostrarPregunta(question) {
  pregunta.innerText = decodeHTMLEntities(question)
}

function mostrarRespuestas(incorrectas, correcta) {
  borrarDivs()
  let todasPreguntas = [...incorrectas, correcta]
  todasPreguntas.sort(() => Math.random() - 0.5)
  todasPreguntas.forEach(element => {
    const options = document.createElement("button")
    options.classList.add("btn_respuesta")
    options.innerText = decodeHTMLEntities(element)
    if (correctas.includes(options.innerText)) {
      options.dataset.correct = true
    }

    botonesRespuesta.appendChild(options)
  });
}

function mostrarResCorrecta() {
  const resultado = document.createElement("h2")
  resultado.classList.add("texto_correcta")
  resultado.innerText = "¡Correcta!"
  resultadoDiv.appendChild(resultado)
}

function mostrarResFallida() {
  const resultado = document.createElement("h2")
  resultado.classList.add("texto_fallida")
  resultado.innerText = "¡Esta vez fallaste!"
  resultadoDiv.appendChild(resultado)
}

function validarRespuesta(element) {
  if (element.dataset.correct) {
    mostrarResCorrecta()
    element.classList.add("correcta")
    puntuacion += 10
    console.log(puntuacion)
  } else {
    mostrarResFallida()
    element.classList.add("fallida")
    const restoRespuestas = document.querySelectorAll(".btn_respuesta")
    restoRespuestas.forEach(respuesta => {
      if (respuesta.dataset.correct) {
        respuesta.classList.add("correcta")
      }
    })
  }
}

function mostrarPuntuacion() {
  resPuntuacion.innerText = `${puntuacion}`
  if (puntuacion < 29) {
    resNota.innerText = "¡Revancha, vamos!"
  } else if (puntuacion < 49) {
    resNota.innerText = "¡Casi lo tienes!"
  } else if (puntuacion < 69) {
    resNota.innerText = "¡Bien jugado!"
  } else if (puntuacion < 89) {
    resNota.innerText = "¡Muy crack!"
  } else {
    resNota.innerText = "¡Nivel Leyenda!"
  }
}


async function obtenerPreguntas() {
  try {
    const question = await axios.get(API_URL)
    const questionList = question.data.results

    preguntas = questionList.map(question => question.question);
    correctas = questionList.map(correcta => decodeHTMLEntities(correcta.correct_answer))
    incorrectas = questionList.map(respuestas => respuestas.incorrect_answers)
    incorrectas = incorrectas

    preguntaActual = 0
    puntuacion = 0
    mostrarPregunta(preguntas[preguntaActual])
    mostrarRespuestas(incorrectas[preguntaActual], correctas[preguntaActual])
    irQuestionario()

  } catch (error) {
    console.error(error)
  }
}


function responder(e) {
  document.querySelectorAll(".btn_respuesta").forEach(option => option.classList.add("clicado"))
  btnSiguiente.classList.remove("hide")
  const respuesta = e.target
  validarRespuesta(respuesta)
}


function siguientePregunta() {
  if (preguntas.length > preguntaActual + 1) {
    preguntaActual++
    const numContador = preguntaActual + 1
    contador.innerText = `${numContador}/10`
    btnSiguiente.classList.add("hide")
    mostrarPregunta(preguntas[preguntaActual])
    mostrarRespuestas(incorrectas[preguntaActual], correctas[preguntaActual])
  } else {
    ocultarTodo()
    final.classList.remove("hide")
    btnSalir.classList.remove("hide")
    mostrarPuntuacion()
  }
}

async function resetearJuego() {
  try {
    await obtenerPreguntas()
    puntuacion = 0
    preguntaActual = 0
    contador.innerText = `1/10`
  } catch (error) {
    console.error(error)
  }

}


// EVENTOS.
logo.addEventListener("click", irBienvenida)
btnSalir.addEventListener("click", irBienvenida)
btnEmpezar.addEventListener("click", obtenerPreguntas)
botonesRespuesta.addEventListener("click", responder)
btnSiguiente.addEventListener("click", siguientePregunta)
btnRejugar.addEventListener("click", resetearJuego)

