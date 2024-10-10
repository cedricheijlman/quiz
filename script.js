let currentQuestionIndex = 0;
let correctAnswers = 0;
let questions = [];

let x = 0;

let resultatenKnop = document.getElementById("resultatenKnop");
let modalOverlay = document.getElementById("modalOverlay");
let wegklikken = document.getElementById("wegklikken");

resultatenKnop.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});
wegklikken.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

// Function to fetch questions for a specific category
function fetchQuestions(categoryId) {
  fetch(`http://127.0.0.1:5000/get-questions/${categoryId}`)
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      showQuestion(currentQuestionIndex); // Show the first question
      console.log(data);
    })
    .catch((error) => console.error("Error fetching questions:", error));
}

// Function to show the current question
function showQuestion(index) {
  const questionElement = document.getElementById("question-text");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next-button");

  // Display the current question and options
  questionElement.innerText = questions[index].question;
  optionsElement.innerHTML = "";

  questions[index].options.forEach((option, i) => {
    optionsElement.innerHTML += `
            <a class="startKnop" id="option${i}">${option}</a>
        `;
  });

  nextButton.style.display = "none";
}
