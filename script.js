let currentQuestionIndex = 0;
let correctAnswers = 0;
let questions = [];
let beantwoord = false;
let gebruikersAntwoorden = [];

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
            <a class="startKnop" onclick="checkAntwoord(this)" id="option${i}">${option}</a>
        `;
  });

  nextButton.style.display = "none";
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

      fetch("http://127.0.0.1:5000/check-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correct: "true", // Stuur het als string "true" of "false"
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Server response:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      knop.classList.add("fouteAntwoord");
      beantwoord = true;
      volgendeKnop.style.display = "flex";
      gebruikersAntwoorden.push({ antwoordGebruiker: antwoordGebruiker });

      fetch("http://127.0.0.1:5000/check-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correct: "false", // Stuur het als string "true" of "false"
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Server response:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
}

function naarVolgendeVraag() {
  if (currentQuestionIndex < 9) {
    currentQuestionIndex = currentQuestionIndex + 1;
    let vraagNummerText = document.getElementById("vraagNummer");
    let volgendeKnop = document.getElementById("volgendeKnop");

    vraagNummerText.textContent = "Vraag " + (currentQuestionIndex + 1);
    volgendeKnop.style.display = "none";
    beantwoord = false;
    showQuestion(currentQuestionIndex);
  } else {
    localStorage.setItem(
      "gebruikersAntwoorden",
      JSON.stringify(gebruikersAntwoorden)
    );

    window.location.href = "resultatenLijst.html";
  }
}

function stuurNaarVolgendePagina(nummer) {
  window.location.href = `quizMain.html?categorieNummer=${nummer}`;
  console.log("test");
}

function laadResultaten() {}
