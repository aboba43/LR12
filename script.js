
    $(document).ready(function () {
        const wordBank = {
            easy: [
                { word: "always", translation: "завжди" },
                { word: "hello", translation: "привіт" },
                { word: "goodbye", translation: "до побачення" },
                { word: "yes", translation: "так" },
                { word: "no", translation: "ні" },
                { word: "cat", translation: "кіт" },
                { word: "dog", translation: "собака" },
                { word: "friend", translation: "друг" },
                { word: "family", translation: "сім'я" },
                { word: "home", translation: "дім" }
            ],
            medium: [
                { word: "important", translation: "важливо" },
                { word: "beautiful", translation: "красивий" },
                { word: "dangerous", translation: "небезпечний" },
                { word: "challenge", translation: "виклик" },
                { word: "knowledge", translation: "знання" },
                { word: "memory", translation: "пам'ять" },
                { word: "decision", translation: "рішення" },
                { word: "freedom", translation: "свобода" },
                { word: "opportunity", translation: "можливість" },
                { word: "strength", translation: "сила" }
            ],
            hard: [
                { word: "phenomenon", translation: "явище" },
                { word: "consequence", translation: "наслідок" },
                { word: "perception", translation: "сприйняття" },
                { word: "philosophy", translation: "філософія" },
                { word: "sustainability", translation: "сталий розвиток" },
                { word: "complexity", translation: "складність" },
                { word: "revolution", translation: "революція" },
                { word: "transformation", translation: "трансформація" },
                { word: "innovation", translation: "інновація" },
                { word: "responsibility", translation: "відповідальність" }
            ]
        };
        

        let difficulty = "easy";
        let step = 1;
        const maxSteps = 10;
        let correctAnswers = 0;
        let wrongAnswers = 0;
        let currentWord = null;

        const $wordCard = $("#card");
        const $inputField = $("#input");
        const $stepCounter = $("#currentStep");
        const $totalSteps = $("#totalSteps");
        const $correctCounter = $("#correctCount");
        const $incorrectCounter = $("#incorrectCount");
        const $modalOverlay = $(".modal-overlay");
        const $modalWindow = $(".modal");
        const $resultsText = $("#results");
        const $closeModalButton = $("#closeModal");

        function startApp() {
            $totalSteps.text(maxSteps);
            $stepCounter.text(step);
            $correctCounter.text(correctAnswers);
            $incorrectCounter.text(wrongAnswers);
            loadRandomWord();
        }

        function loadRandomWord() {
            const words = wordBank[difficulty];
            const randomIndex = Math.floor(Math.random() * words.length);
            currentWord = words[randomIndex];
            $wordCard.text(currentWord.word);
        }

        function verifyAnswer() {
            const userInput = $inputField.val().trim().toLowerCase();
            if (userInput === currentWord.translation.toLowerCase()) {
                correctAnswers++;
                $correctCounter.text(correctAnswers);
            } else {
                wrongAnswers++;
                $incorrectCounter.text(wrongAnswers);
            }

            step++;
            if (step > maxSteps) {
                displayResults();
            } else {
                $stepCounter.text(step);
                $inputField.val("");
                loadRandomWord();
            }
        }

        function displayResults() {
            const level =
                correctAnswers >= 8
                    ? "Високий"
                    : correctAnswers >= 5
                    ? "Середній"
                    : "Низький";

            $resultsText.html(`
                Вірно: ${correctAnswers}<br>
                Невірно: ${wrongAnswers}<br>
                Рівень знань: ${level}
            `);
            $modalOverlay.show();
            $modalWindow.show();
        }

        function restartApp() {
            step = 1;
            correctAnswers = 0;
            wrongAnswers = 0;
            $modalOverlay.hide();
            $modalWindow.hide();
            startApp();
        }

        function changeDifficulty() {
            difficulty = $(this).val();
            restartApp();
        }

        $inputField.on("keypress", function (e) {
            if (e.which === 13) {
                verifyAnswer();
            }
        });

        $("input[name='difficulty']").on("change", changeDifficulty);

        $closeModalButton.on("click", restartApp);

        startApp();
    });
