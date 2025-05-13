
const bienvenida = document.getElementById("bienvenida")
const questionario = document.getElementById("questionario")
const pregunta = document.getElementById("pregunta")
const contenedorSec = document.getElementById("contenedor-sec")
const contador = document.getElementById("contador")

const btnEmpezar = document.getElementById("btn-empezar")
const btnRespuestaA = document.getElementById("option-a")
const btnNext = document.getElementById("btn-next")
const btnStats = document.getElementById("btn-stats")
const btnSalir = document.getElementById("btn-salir")
console.log(btnRespuestaA)

let currentQuestionIndex;
let score = 0
let questionList = []


// funciones <hide> class.
function hideAll() {
  bienvenida.classList.add("hide")
  questionario.classList.add("hide")
  contenedorSec.classList.add("hide")
  btnNext.classList.add("hide")
  btnSalir.classList.add("hide")
}
function goBienvenida() {
  hideAll()
  bienvenida.classList.remove("hide")
}
function goQuestionario() {
  hideAll()
  questionario.classList.remove("hide")
  contenedorSec.classList.remove("hide")
  btnSalir.classList.remove("hide")
}

function initQuestions() {
  axios.get("https://opentdb.com/api.php?amount=10")
    .then(questions => {
      questionList = questions.data.results
      const question = questionList.map(question => question.question)
      const correcta = questionList.map(correcta => correcta.correct_answer)
      const respuestas = questionList.map(respuestas => respuestas.incorrect_answers)
      showPregunta(question[currentQuestionIndex])
      showRespuesta(correcta[currentQuestionIndex])
      goQuestionario()
      console.log(questionList)
      console.log(question[currentQuestionIndex])
      console.log(correcta[currentQuestionIndex])
      console.log(respuestas[currentQuestionIndex])
      console.log(typeof correcta)
    })
    .catch(err => console.error(err))
}

function showRespuesta(correcta) {
  btnRespuestaA.innerText = correcta
}

function showPregunta(question) {
  pregunta.innerText = question
}


function startQuestionario() {
  initQuestions()
  currentQuestionIndex = 0
}







// EVENTOS.
btnSalir.addEventListener("click", goBienvenida)
btnEmpezar.addEventListener("click", startQuestionario)