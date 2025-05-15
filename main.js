
const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple"
const bienvenida = document.getElementById("bienvenida")
const questionario = document.getElementById("questionario")
const pregunta = document.getElementById("pregunta")
const botonesRespuesta = document.getElementById("botones-respuesta")
const contenedorSec = document.getElementById("contenedor-sec")
const contador = document.getElementById("contador")

const btnEmpezar = document.getElementById("btn-empezar")
const btnNext = document.getElementById("btn-next")
const btnStats = document.getElementById("btn-stats")
const btnSalir = document.getElementById("btn-salir")


let preguntaActual;
let puntuacion = 0;
let preguntas = [];
let correctas = [];
let incorrectas = [];


// funciones <hide> class.
function ocultarTodo() {
  bienvenida.classList.add("hide")
  questionario.classList.add("hide")
  contenedorSec.classList.add("hide")
  // btnNext.classList.add("hide")
  btnSalir.classList.add("hide")
}
function irBienvenida() {
  ocultarTodo()
  bienvenida.classList.remove("hide")
}
function irQuestionario() {
  ocultarTodo()
  questionario.classList.remove("hide")
  contenedorSec.classList.remove("hide")
  btnSalir.classList.remove("hide")
}
// Decofificar carácteres de la API.
function decodeHTMLEntities(text) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  return doc.documentElement.textContent;
}



function mostrarPregunta(question) {
  pregunta.innerText = decodeHTMLEntities(question)
}

function mostrarRespuestas(incorrectas, correcta) {
  botonesRespuesta.innerHTML = ""
  let todasPreguntas = [...incorrectas, correcta]
  todasPreguntas.forEach(element => {
    const options = document.createElement("button")
    options.classList.add("btn_respuesta")
    options.innerText = decodeHTMLEntities(element)
    botonesRespuesta.appendChild(options)
  });
}

async function obtenerPreguntas() {
  try {
    const question = await axios.get(API_URL)
    const questionList = question.data.results

    preguntas = questionList.map(question => question.question);
    correctas = questionList.map(correcta => correcta.correct_answer)
    incorrectas = questionList.map(respuestas => respuestas.incorrect_answers)

    preguntaActual = 0
    mostrarPregunta(preguntas[preguntaActual])
    mostrarRespuestas(incorrectas[preguntaActual], correctas[preguntaActual])
    irQuestionario()

    console.log(preguntas)
    console.log(correctas)
    console.log(incorrectas)
  } catch (error) {
    console.error(error)
  }
}


function siguientePregunta() {
  preguntaActual++

  mostrarPregunta(preguntas[preguntaActual])
  mostrarRespuestas(incorrectas[preguntaActual], correctas[preguntaActual])
}






// EVENTOS.
btnSalir.addEventListener("click", irBienvenida)
btnEmpezar.addEventListener("click", obtenerPreguntas)
btnNext.addEventListener("click", siguientePregunta)