// CODE6 QUIZ CP2 — perguntas carregadas de data/perguntas.json.
const $ = (selector) => document.querySelector(selector);

const startScreen = $("#start-screen");
const playScreen = $("#play-screen");
const resultScreen = $("#result-screen");
const nameInput = $("#player-name");
const startButton = $("#start-button");
const startError = $("#start-error");
const loadError = $("#load-error");
const questionNumber = $("#current-number");
const totalNumber = $("#total-number");
const progressBar = $("#quiz-progress");
const progressTrack = $(".progress-track");
const category = $("#question-category");
const questionText = $("#question-text");
const answersList = $("#answers-list");
const feedbackTitle = $("#feedback-title");
const feedbackText = $("#feedback-text");
const feedbackBox = $("#feedback-box");
const nextButton = $("#next-button");
const restartButton = $("#restart-button");
const prototypeNote = $("#prototype-note");

let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let playerName = "";

async function loadQuestions() {
  try {
    const response = await fetch("data/perguntas.json");
    if (!response.ok) throw new Error(`Falha HTTP: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error("O JSON não contém perguntas.");
    questions = data;
    totalNumber.textContent = questions.length;
  } catch (error) {
    console.error("Erro ao carregar perguntas:", error);
    startScreen.hidden = true;
    loadError.hidden = false;
    startButton.disabled = true;
  }
}

function beginGame() {
  const enteredName = nameInput.value.trim();
  if (!enteredName) {
    startError.textContent = "Digite seu nome antes de iniciar.";
    nameInput.focus();
    return;
  }
  playerName = enteredName.slice(0, 24);
  $("#player-label").textContent = playerName;
  startError.textContent = "";
  currentIndex = 0;
  score = 0;
  startScreen.hidden = true;
  resultScreen.hidden = true;
  playScreen.hidden = false;
  renderQuestion();
  questionText.focus?.();
}

function renderQuestion() {
  const question = questions[currentIndex];
  answered = false;
  questionNumber.textContent = currentIndex + 1;
  totalNumber.textContent = questions.length;
  category.textContent = question.categoria.toUpperCase();
  questionText.textContent = question.pergunta;
  progressBar.style.width = `${(currentIndex / questions.length) * 100}%`;
  progressTrack.setAttribute("aria-valuemax", questions.length);
  progressTrack.setAttribute("aria-valuenow", currentIndex);
  answersList.replaceChildren();
  feedbackBox.classList.remove("is-correct", "is-wrong");
  feedbackTitle.textContent = "Escolha uma alternativa";
  feedbackText.textContent = "Selecione uma resposta para conferir a explicação.";
  nextButton.disabled = true;
  nextButton.textContent = currentIndex === questions.length - 1 ? "Ver resultado →" : "Próxima pergunta →";
  prototypeNote.textContent = `Pergunta ${currentIndex + 1} de ${questions.length}. Use Tab para navegar e Enter ou Espaço para selecionar.`;

  question.alternativas.forEach((option, index) => {
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
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = "＋";
    button.append(letter, label, symbol);
    button.addEventListener("click", () => selectAnswer(index, button));
    answersList.appendChild(button);
  });
  answersList.querySelector("button")?.focus();
}

function selectAnswer(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;
  const question = questions[currentIndex];
  const buttons = [...answersList.querySelectorAll(".answer")];

  buttons.forEach((button, index) => {
    button.disabled = true;
    button.querySelector(".answer-symbol").textContent = index === question.resposta ? "✓" : "＋";
    if (index === question.resposta) button.classList.add("is-correct");
  });

  const isCorrect = selectedIndex === question.resposta;
  if (isCorrect) {
    score += 1;
    feedbackTitle.textContent = "Resposta correta!";
    feedbackBox.classList.add("is-correct");
    selectedButton.setAttribute("aria-label", `${selectedButton.innerText}. Resposta correta.`);
  } else {
    selectedButton.classList.add("is-wrong");
    selectedButton.querySelector(".answer-symbol").textContent = "×";
    feedbackTitle.textContent = "Resposta incorreta";
    feedbackBox.classList.add("is-wrong");
  }

  feedbackText.replaceChildren(document.createTextNode(`${question.explicacao} `));
  if (question.fonte) {
    const sourceLink = document.createElement("a");
    sourceLink.href = question.fonte;
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener noreferrer";
    sourceLink.textContent = "Consultar fonte";
    sourceLink.className = "source-link";
    feedbackText.appendChild(sourceLink);
  }
  nextButton.disabled = false;
  prototypeNote.textContent = isCorrect
    ? "Acerto registrado. Você também pode consultar a fonte da explicação."
    : `Resposta registrada. A alternativa correta é ${String.fromCharCode(65 + question.resposta)}. Leia a explicação antes de avançar.`;
  nextButton.focus();
}

function readRanking() {
  try {
    const stored = JSON.parse(sessionStorage.getItem("code6-ranking") || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function saveRanking() {
  const ranking = readRanking();
  ranking.push({
    nome: playerName,
    pontos: score,
    total: questions.length,
    percentual: Math.round((score / questions.length) * 100),
    data: Date.now()
  });
  ranking.sort((a, b) => b.pontos - a.pontos || a.data - b.data);
  sessionStorage.setItem("code6-ranking", JSON.stringify(ranking.slice(0, 5)));
}

function renderRanking() {
  const list = $("#ranking-list");
  list.replaceChildren();
  const ranking = readRanking();
  ranking.forEach((entry, index) => {
    const item = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = `${index + 1}º — ${entry.nome}`;
    const points = document.createElement("strong");
    points.textContent = `${entry.pontos}/${entry.total}`;
    item.append(name, points);
    list.appendChild(item);
  });
  if (!ranking.length) {
    const item = document.createElement("li");
    item.textContent = "Ainda não há resultados nesta sessão.";
    list.appendChild(item);
  }
}

function showResult() {
  playScreen.hidden = true;
  resultScreen.hidden = false;
  $("#result-heading").textContent = `Fim de jogo, ${playerName}!`;
  $("#result-score").textContent = `Pontuação: ${score}/${questions.length} (${Math.round((score / questions.length) * 100)}%)`;
  $("#result-message").textContent = score === questions.length
    ? "Excelente! Você acertou todas as perguntas."
    : "Partida concluída. Confira o ranking e revise os conteúdos para melhorar na próxima tentativa.";
  saveRanking();
  renderRanking();
  restartButton.focus();
}

startButton.addEventListener("click", beginGame);
nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") beginGame();
});
nextButton.addEventListener("click", () => {
  if (!answered) return;
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
});
restartButton.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  playScreen.hidden = false;
  renderQuestion();
});

loadQuestions();
