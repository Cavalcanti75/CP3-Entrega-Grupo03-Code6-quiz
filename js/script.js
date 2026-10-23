// CODE6 QUIZ CP1: quiz inicial com cinco perguntas de desenvolvimento web.
// As perguntas ficam neste arquivo para funcionar também sem servidor local.
const questions = [
  {
    category: "Fundamentos Web",
    question: "Qual linguagem é usada para estruturar o conteúdo de uma página web?",
    options: ["CSS", "HTML", "SQL", "Python"],
    answer: 1,
    explanation: "HTML organiza o conteúdo da página com elementos como títulos, parágrafos, links e imagens.",
    source: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content"
  },
  {
    category: "Estilo e design",
    question: "Qual tecnologia controla principalmente as cores, fontes e o layout de uma página?",
    options: ["CSS", "HTML", "Git", "MySQL"],
    answer: 0,
    explanation: "CSS define a aparência visual dos elementos HTML, como cores, fontes e espaçamentos.",
    source: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics"
  },
  {
    category: "JavaScript",
    question: "Qual destas tecnologias permite adicionar interatividade a uma página web?",
    options: ["JPEG", "JavaScript", "Figma", "HTTP"],
    answer: 1,
    explanation: "JavaScript permite responder a ações do usuário e alterar o conteúdo de uma página dinamicamente.",
    source: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting"
  },
  {
    category: "Estrutura HTML",
    question: "Qual tag HTML representa o título principal de uma página ou seção?",
    options: ["<p>", "<img>", "<h1>", "<footer>"],
    answer: 2,
    explanation: "A tag h1 representa um título de nível principal. Ela ajuda a organizar semanticamente o conteúdo.",
    source: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Heading_Elements"
  },
  {
    category: "Links e navegação",
    question: "Qual tag HTML é usada para criar um link clicável?",
    options: ["<a>", "<div>", "<button>", "<link>"],
    answer: 0,
    explanation: "A tag a (âncora) cria um link para outra página, arquivo ou endereço, normalmente usando o atributo href.",
    source: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/a"
  }
];

const questionNumber = document.querySelector("#current-number");
const totalNumber = document.querySelector("#total-number");
const progressBar = document.querySelector("#quiz-progress");
const category = document.querySelector("#question-category");
const questionText = document.querySelector("#question-text");
const answersList = document.querySelector("#answers-list");
const feedbackTitle = document.querySelector("#feedback-title");
const feedbackText = document.querySelector("#feedback-text");
const feedbackBox = document.querySelector("#feedback-box");
const nextButton = document.querySelector("#next-button");
const restartButton = document.querySelector("#restart-button");
const prototypeNote = document.querySelector("#prototype-note");

let currentIndex = 0;
let score = 0;
let answered = false;

totalNumber.textContent = questions.length;

function renderQuestion() {
  const question = questions[currentIndex];
  answered = false;
  questionNumber.textContent = currentIndex + 1;
  category.textContent = question.category.toUpperCase();
  questionText.textContent = question.question;
  progressBar.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  answersList.innerHTML = "";
  feedbackBox.classList.remove("is-correct", "is-wrong");
  feedbackTitle.textContent = "Escolha uma alternativa";
  feedbackText.textContent = "Selecione uma resposta para conferir a explicação.";
  nextButton.disabled = true;
  nextButton.hidden = false;
  restartButton.hidden = true;
  nextButton.innerHTML = currentIndex === questions.length - 1
    ? 'Ver resultado <span>→</span>'
    : 'Próxima pergunta <span>→</span>';
  prototypeNote.textContent = `Pergunta ${currentIndex + 1} de ${questions.length}.`;

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.textContent = String.fromCharCode(65 + index);
    const label = document.createElement("span");
    label.className = "answer-label";
    label.textContent = option;
    const symbol = document.createElement("span");
    symbol.className = "answer-symbol";
    symbol.textContent = "＋";
    button.append(letter, label, symbol);
    button.addEventListener("click", () => selectAnswer(index, button));
    answersList.appendChild(button);
  });
}

function selectAnswer(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;
  const question = questions[currentIndex];
  const buttons = [...answersList.querySelectorAll(".answer")];

  buttons.forEach((button, index) => {
    button.disabled = true;
    button.querySelector(".answer-symbol").textContent = index === question.answer ? "✓" : "＋";
    if (index === question.answer) button.classList.add("is-correct");
  });

  if (selectedIndex === question.answer) {
    score++;
    feedbackTitle.textContent = "Resposta correta!";
    feedbackBox.classList.add("is-correct");
  } else {
    selectedButton.classList.add("is-wrong");
    selectedButton.querySelector(".answer-symbol").textContent = "×";
    feedbackTitle.textContent = "Resposta incorreta";
    feedbackBox.classList.add("is-wrong");
  }

  feedbackText.textContent = question.explanation + " ";
  const sourceLink = document.createElement("a");
  sourceLink.href = question.source;
  sourceLink.target = "_blank";
  sourceLink.rel = "noopener noreferrer";
  sourceLink.textContent = "Consultar fonte";
  sourceLink.className = "source-link";
  feedbackText.appendChild(sourceLink);

  nextButton.disabled = false;
  prototypeNote.textContent = "Resposta registrada. Clique em Próxima pergunta para continuar.";
}

function showResult() {
  questionNumber.textContent = questions.length;
  category.textContent = "DESAFIO CONCLUÍDO";
  questionText.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
  answersList.innerHTML = "";
  progressBar.style.width = "100%";
  feedbackBox.classList.remove("is-correct", "is-wrong");
  feedbackTitle.textContent = score === questions.length ? "Excelente resultado!" : "Continue praticando!";
  feedbackText.textContent = score === questions.length
    ? "Você acertou todas as perguntas. Parabéns!"
    : "Revise as explicações e tente novamente para melhorar sua pontuação.";
  nextButton.hidden = true;
  restartButton.hidden = false;
  prototypeNote.textContent = `Pontuação final: ${Math.round((score / questions.length) * 100)}%.`;
}

nextButton.addEventListener("click", () => {
  if (!answered) return;
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    showResult();
  }
});

restartButton.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  renderQuestion();
});

renderQuestion();
