const questions = [
  {
    question: 'У вас есть кот?',
    options: ['Да', 'Нет'],
    answer: 'Да',
  },
  {
    question: 'Если есть, то как его зовут? Если нет, то как бы вы его назвали?',
    options: '',
    answer: '',
  },
  {
    question: 'Сколько раз в день нужно кормить кота?',
    options: ['2 раза в день', 
              '3 раза в день маленькими порциями',
              'по требованию его величества (т.е. всегда)'
            ],
    answer: 'по требованию его величества (т.е. всегда)',
  },
  {
    question: 'Нужно ли ругать кота за его тыгыдык в 2 часа ночи?',
    options: ['конечно, ведь не дает мне отдохнуть', 
              'нет, т.к. я живу у него и не имею права указывать ему',
              'да, ночью нужно спать',
            ],
    answer: 'нет, т.к. я живу у него и не имею права указывать ему',
  },
  {
    question: 'Что нужно сделать, если у кота сбился прицел, и бомба оказалась не в лотке?',
    options: ['быть благодарным, что это хотя бы не в вашем тапке', 
              'поругать кота',
              'молча возмущаться в голове, убирая следы бомбардировки',
            ],
    answer: 'быть благодарным, что это хотя бы не в вашем тапке', 
  },
  {
    question: 'Можно ли шевелиться, если на вас уснул кот?',
    options: ['да', 
              'да',
              'нет',
              'да',
            ],
    answer: 'нет',
  },
  {
    question: 'Как вести себя, если ваша котлета магическим образом оказалась во рту у кота?',
    options: ['забрать себе и поругать кота', 
              'взять новую и не жадничать',
              'извиниться перед котом за то, что ему пришлось самому добывать себе котлету(он не ел с самого рождения)',
            ],
    answer: 'извиниться перед котом за то, что ему пришлось самому добывать себе котлету(он не ел с самого рождения)',
  },
]

let curQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];

const startBtn = document.getElementById('startBtn');
const firstScreen = document.getElementById('firstScreen')
const questionContainer = document.getElementById('questionContainer');
const questionElem = document.getElementById('question');
const optionsElem = document.getElementById('options');
const userAnswerInput = document.getElementById('userAnswerInput');
const nextBtn = document.getElementById('nextBtn');
const lastScreenElem = document.getElementById('lastScreen');
const resultTestElem = document.getElementById('resultTest');
const restartBtn = document.getElementById('restartBtn');

startBtn.addEventListener('click', startTest);
nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', restartTest);

questionContainer.style.display = 'none';
lastScreenElem.style.display = 'none';

function startTest(){
  firstScreen.style.display = 'none';
  questionContainer.style.display = 'flex';
  score = 0;
  curQuestionIndex = 0;
  showQuestion()
}

function showQuestion(){
  const currentQuestion = questions[curQuestionIndex];
  questionElem.innerText = currentQuestion.question;

  if (currentQuestion.options.length > 1) {
    userAnswerInput.style.display = 'none';
    optionsElem.innerHTML = '';
    currentQuestion.options.forEach(option => {
      const checkboxContainer = document.createElement('div');

      const optionCheckbox = document.createElement('input');
      optionCheckbox.type = 'checkbox';
      optionCheckbox.id = option;
      optionCheckbox.value = option;
      optionCheckbox.innerText = option;

      const optionLabel = document.createElement('label');
      optionLabel.htmlFor = option;
      optionLabel.innerText = option;

      checkboxContainer.appendChild(optionCheckbox);
      checkboxContainer.appendChild(optionLabel);
      optionsElem.appendChild(checkboxContainer);

      //optionCheckbox.addEventListener('click', () => handleAnswer(option));
    });
  } else {
    userAnswerInput.value = '';
    userAnswerInput.style.display = 'block';
    optionsElem.innerHTML = '';
  }
}

// function handleAnswer(selectedAnswer) {
//   const currentQuestion = questions[curQuestionIndex];

//   if(currentQuestion.question === 'У вас есть кот?') {
//     selectedAnswer === currentQuestion.answer ? score++ : alert('-1 балл за отсутствие кота!')
//   }

//   if (userAnswerInput.style.display === 'none') {
//     if (selectedAnswer === currentQuestion.answer) {
//       score++;
//     }
//   } else {
//       userAnswerInput.value.trim() === currentQuestion.answer ? score++ : score++ ;
//   }

//   curQuestionIndex++;
//   curQuestionIndex < questions.length ? showQuestion() : showResult();
// }

function handleNext(){
  const currentQuestion = questions[curQuestionIndex];
  const optionCheckboxes = optionsElem.querySelectorAll('input[type = "checkbox"]');
  selectedAnswers = [];
  optionCheckboxes.forEach(optionCheckbox => {
    if (optionCheckbox.ariaChecked) {
      selectedAnswers.push(optionCheckbox.value)
    }
  });

  if(currentQuestion.question === 'У вас есть кот?') {
    selectedAnswers.includes(currentQuestion.answer) === currentQuestion.answer ? score++ : alert('-1 балл за отсутствие кота!')
  } else {
    selectedAnswers.forEach(answer => {
      if(answer === currentQuestion.answer){
        score++;
      }
    })
  }

  curQuestionIndex++;
  curQuestionIndex < questions.length ? showQuestion() : showResult();
}

function showResult() {
  questionContainer.style.display = 'none';
  lastScreenElem.style.display = 'flex';
  resultTestElem.innerText = `Ваш результат: ${score} из ${questions.length}`;
  restartBtn.style.display = 'block';
}

function restartTest() {
  restartBtn.style.display = 'none';
  lastScreenElem.style.display = 'none'
  resultTestElem.innerText = '';
  questionContainer.style.display = 'none';
  firstScreen.style.display = 'flex'
  startBtn.style.display = 'block';
}