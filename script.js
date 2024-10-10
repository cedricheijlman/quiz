let currentQuestionIndex = 0;
let correctAnswers = 0;
let questions = [];
let beantwoord = false;
let gebruikersAntwoorden = [];

// Elements for results modal
let resultatenKnop = document.getElementById("resultatenKnop");
let modalOverlay = document.getElementById("modalOverlay");
let wegklikken = document.getElementById("wegklikken");

// Add event listeners for modal
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
      updateProgressBar(); // Initialize progress bar
    })
    .catch((error) => console.error("Error fetching questions:", error));
}

// Function to show the current question
function showQuestion(index) {
  const questionElement = document.getElementById("question-text");
  const optionsElement = document.getElementById("options");
  const volgendeKnop = document.getElementById("volgendeKnop");

  // Display the current question and options
  questionElement.innerText = questions[index].question;
  optionsElement.innerHTML = "";

  questions[index].options.forEach((option, i) => {
    optionsElement.innerHTML += `
            <a class="startKnop" onclick="checkAntwoord(this)" id="option${i}">${option}</a>
        `;
  });

  volgendeKnop.style.display = "none";
  updateProgressBar(); // Update progress bar when showing question
}

// Function to update progress bar
function updateProgressBar() {
  const progressElement = document.getElementById("progress");
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100; // Calculate percentage
  progressElement.style.width = progressPercentage + "%"; // Update progress bar width
}

function checkAntwoord(knop) {
  let antwoordGebruiker = knop.textContent;
  let volgendeKnop = document.getElementById("volgendeKnop");

  if (beantwoord == false) {
    if (questions[currentQuestionIndex].correct_answer == antwoordGebruiker) {
      knop.classList.add("goedeAntwoord");
      beantwoord = true;
      volgendeKnop.style.display = "flex";
      gebruikersAntwoorden.push({ antwoordGebruiker: antwoordGebruiker });
    } else {
      knop.classList.add("fouteAntwoord");
      beantwoord = true;
      volgendeKnop.style.display = "flex";
      gebruikersAntwoorden.push({ antwoordGebruiker: antwoordGebruiker });
    }
  }
}

function naarVolgendeVraag() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1; // Increment question index
    let vraagNummerText = document.getElementById("vraagNummer");
    let volgendeKnop = document.getElementById("volgendeKnop");

    vraagNummerText.textContent = "Vraag " + (currentQuestionIndex + 1);
    volgendeKnop.style.display = "none";
    beantwoord = false;
    showQuestion(currentQuestionIndex); // Show the next question
  }
}

function stuurNaarVolgendePagina(nummer) {
  window.location.href = `quizMain.html?categorieNummer=${nummer}`;
  console.log("test");
}
