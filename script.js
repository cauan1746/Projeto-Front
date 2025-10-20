const units = ['m', 'km', 'cm', 'mm'];
const conversionRates = {
  m: { km: 0.001, cm: 100, mm: 1000 },
  km: { m: 1000, cm: 100000, mm: 1000000 },
  cm: { m: 0.01, km: 0.00001, mm: 10 },
  mm: { m: 0.001, km: 0.000001, cm: 0.1 }
};

let currentQuestion = {};
let score = 0;

function generateQuestion() {
  const from = units[Math.floor(Math.random() * units.length)];
  let to = units[Math.floor(Math.random() * units.length)];
  while (to === from) {
    to = units[Math.floor(Math.random() * units.length)];
  }

  const value = Math.floor(Math.random() * 100) + 1; // valor entre 1 e 100
  const correctAnswer = +(value * conversionRates[from][to]).toFixed(2);

  currentQuestion = { from, to, value, correctAnswer };

  document.getElementById('question').innerText =
    `Quantos ${to} existem em ${value} ${from}?`;

  document.getElementById('answer').value = '';
  document.getElementById('feedback').innerText = '';
}

function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById('answer').value);
  if (isNaN(userAnswer)) {
    document.getElementById('feedback').innerText = 'Digite um número válido!';
    return;
  }

  const diff = Math.abs(userAnswer - currentQuestion.correctAnswer);

  if (diff < 0.01) {
    score++;
    document.getElementById('feedback').innerText = '✅ Correto! Muito bem!';
  } else {
    document.getElementById('feedback').innerText =
      `❌ Errado! A resposta certa era ${currentQuestion.correctAnswer}`;
  }

  document.getElementById('score').innerText = `Pontuação: ${score}`;
  setTimeout(generateQuestion, 1500);
}

// Inicia o jogo
generateQuestion();

