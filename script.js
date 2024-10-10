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
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100; // Calculate percentage
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

      fetch("http://127.0.0.1:5000/check-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correct: "true", // Stuur het als string "true" of "false"
        }),
      })
        .then((response) => response.text()) // Parse as plain text
        .then((data) => {
          console.log("Server response:", data); // Expecting a string ("True" or "False")
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
        .then((response) => response.text()) // Parse as plain text
        .then((data) => {
          console.log("Server response:", data); // Expecting a string ("True" or "False")
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

    localStorage.setItem("Vragen", JSON.stringify(questions));

    window.location.href = "resultatenLijst.html";
  }
}

function stuurNaarVolgendePagina(nummer) {
  window.location.href = `quizMain.html?categorieNummer=${nummer}`;
  console.log("test");
}

function laadResultaten() {
  let antwoordenLijst = document.getElementById("antwoordenLijst");
  let gebruikersantwoorden = localStorage.getItem("gebruikersAntwoorden");
  let vragen = localStorage.getItem("Vragen");
  vragen = JSON.parse(vragen);
  gebruikersantwoorden = JSON.parse(gebruikersantwoorden);
  let aantalGoedeVragen = 0;

  // Loop through the vragen array and generate HTML for each question
  // Loop through the vragen array and generate HTML for each question
  vragen.forEach((vraag, index) => {
    // Create a new div for each vraag
    const vraagDiv = document.createElement("div");
    vraagDiv.classList.add("antwoord");

    // Create a header for the vraag
    const vraagTitle = document.createElement("h5");
    vraagTitle.textContent = `Vraag ${index + 1}: ${vraag.question}`;
    vraagDiv.appendChild(vraagTitle);

    // Create a div to contain the options
    const optieLijst = document.createElement("div");
    optieLijst.classList.add("optieLijst");

    // Get the user's answer for this question
    const gebruikersAntwoord = gebruikersantwoorden[index]?.antwoordGebruiker;

    // Loop through the options and create buttons
    vraag.options.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = option;

      if (option == vraag.correct_answer) {
        optionButton.classList.add("goedeAntwoord");
        optionButton.style.border = "1px solid black";
      }

      // Check if this option is the user's answer and correct or incorrect
      if (option == gebruikersAntwoord) {
        // Highlight the user's answer
        if (option == vraag.correct_answer) {
          optionButton.classList.add("goedeAntwoord"); // Correct answer (green)
          aantalGoedeVragen++;
        } else {
          optionButton.classList.add("fouteAntwoord"); // Incorrect answer (red)
        }
      }

      // Append the button to the optieLijst div
      optieLijst.appendChild(optionButton);
    });

    // Append the options to the vraagDiv
    vraagDiv.appendChild(optieLijst);

    // Append the vraagDiv to the antwoordenLijst container
    antwoordenLijst.appendChild(vraagDiv);
  });

  let aantalVragen = vragen.length;

  let percentageGoedeAntwoorden = (aantalGoedeVragen / aantalVragen) * 100;

  let innerScoreBar = document.getElementById("innerScoreBar");
  let scoreText = document.getElementById("scoreText");

  scoreText.textContent = percentageGoedeAntwoorden + "%";
  innerScoreBar.style.width = `${percentageGoedeAntwoorden}%`;

  if (percentageGoedeAntwoorden < 60) {
    innerScoreBar.style.backgroundColor = "#ff0000";
  } else {
    innerScoreBar.style.backgroundColor = "#008000";
  }
}
