console.log("Petter")

// Random nummer
let randomNummer = 0;
let andereNummer = 0;
let max = 10;
let min = 1;
let andereGetal = 0;
let randomGetal = 0;

// Score
let spelerPunten = 10;
let computerPunten = 10;
let winningResult = 20;
let losingResult = 0;

// Game timer
const gameTimeout = 2000;

// Knoppen uit HTML halen
const btnHigher = document.querySelector(".button-higher");
const btnLower = document.querySelector(".button-lower");
const result = document.querySelector(".result");

// zorgen dat je de knoppen niet kunt spammen door de knoppen uit te schakelen (disabled)
let actieInUitvoering = false;

function disableButtons() {
    btnHigher.disabled = true;
    btnLower.disabled = true;
}
function enableButtons() {
    btnHigher.disabled = false;
    btnLower.disabled = false;
}

// functie voor de higherbutton
function higherButton() {
    if (actieInUitvoering) {
        return; // als er iets gebeurt (een actie) dan doet hij niks
    }
    actieInUitvoering = true; //zorg dat de actie loopt
    disableButtons(); //schakel de knoppen uit
    if (andereNummer > randomNummer) {
        result.textContent = "Gewonnen";
        andereGetal.textContent = andereNummer;

        setTimeout(function () {
            result.textContent = "";
            andereGetal.textContent = "";
            actieInUitvoering = false; //de actie is klaar
            enableButtons(); //schakel de knoppen weer in
        }, gameTimeout);
        spelerPunten += 1;
        computerPunten -= 1;
        resetgame();
        checkGameStatus();
    } else {
        result.textContent = "Verloren";
        andereGetal.textContent = andereNummer;

        setTimeout(function () {
            result.textContent = "";
            andereGetal.textContent = "";
            actieInUitvoering = false;
            enableButtons();
        }, gameTimeout);
        spelerPunten -= 1;
        computerPunten += 1;
        resetgame();
        checkGameStatus();
    }
}

// functie voor de lowerbutton
function lowerButton() {
    if (actieInUitvoering) {
        return; // als er iets gebeurt (een actie) dan doet hij niks
    }
    actieInUitvoering = true; //zorg dat de actie loopt
    disableButtons(); //schakel de knoppen uit
    if (andereNummer < randomNummer) {
        result.textContent = "Gewonnen";
        andereGetal.textContent = andereNummer;

        setTimeout(function () {
            result.textContent = "";
            andereGetal.textContent = "";
            actieInUitvoering = false; //de actie is klaar
            enableButtons(); //schakel de knoppen weer in
        }, gameTimeout);
        spelerPunten += 1;
        computerPunten -= 1;
        resetgame();
        checkGameStatus();
    } else {
        result.textContent = "Verloren";
        andereGetal.textContent = andereNummer;

        setTimeout(function () {
            result.textContent = "";
            andereGetal.textContent = "";
            actieInUitvoering = false;
            enableButtons();
        }, gameTimeout);
        spelerPunten -= 1;
        computerPunten += 1;
        resetgame();
        checkGameStatus();
    }
}

// Random getal functie
randomizeAlles();
function randomizeAlles() {
    randomNummer = Math.floor(Math.random() * (max - min + 1)) + min;
    //zorgt ervoor dat het niet hetzelfde nummer is, blijft doorgaan totdat het een andere nummer heeft gevonden
    do {
        andereNummer = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (andereNummer === randomNummer);
    // Random getal in scherm
    randomGetal = document.querySelector(".random-number");
    randomGetal.textContent = randomNummer;
    // Andere in scherm
    andereGetal = document.querySelector(".random-number-two");
    // Player punten bijhouden
    let spelerScore = document.querySelector(".player-points");
    spelerScore.textContent = 'Jij: ' + spelerPunten;
    // Computer punten bijhouden
    let npcScore = document.querySelector(".computer-points");
    npcScore.textContent = 'NPC: ' + computerPunten;

    //een console log voor als de docent de antwoorden wilt zien in F12 zodat hij sneller bij het eindscherm komt
    console.log("Even voor als de docent snel naar het eindscherm wilt gaan: " + randomNummer);
    console.log("Even voor als de docent snel naar het eindscherm wilt gaan: " + andereNummer);
}

//functie om de game te resetten zodat er nieuwe nummers gegenereerd kunnen worden
function resetgame() {
    randomNummer.textContent = "";
    andereNummer.textContent = "";
    setTimeout(function () {
        randomGetal.textContent = "";
        randomizeAlles();
    }, gameTimeout);
}

//functie om te checken of de speler al gewonnen of verloren heeft
function checkGameStatus() {
    if (spelerPunten === winningResult || spelerPunten === losingResult) {
        //een timeout zodat de knop niet meteen in je beeld komt maar na 2 seconden
        setTimeout(function () {
            //laat de play again button zien en de div met de box van het eindscherm
            const playAgainButton = document.querySelector(".button-play-again");
            playAgainButton.style.display = "block";
            const youwonorlostDiv = document.querySelector(".you-won-or-lost");
            youwonorlostDiv.style.display = "block";

            //zorgt dat er you won staat als je wint en you lost als je verliest
            if (spelerPunten === winningResult) {
                youwonorlostDiv.textContent = "You won!";
            } else {
                youwonorlostDiv.textContent = "You lost";
            }

            //zorgt dat de playagain button met de functie resetScore de game reset
            playAgainButton.addEventListener("click", function () {
                resetgame();
                resetScore();
                playAgainButton.style.display = "none"; // zorgt dat de playagainbutton weer ontzichtbaar wordt totdat je weer hebt gewonnen of verloren
                youwonorlostDiv.style.display = "none"; // hetzelfde met de youwonorlost div
            });
        }, gameTimeout
    )};
}

// score reset functie
function resetScore() {
    spelerPunten = 10;
    computerPunten = 10;
}
