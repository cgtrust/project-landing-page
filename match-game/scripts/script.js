// FF14 Match Game

// Adventurer Elements
const adventurerImages = document.querySelectorAll('.adventurer-images img')
const imagesContainer = document.querySelector('.adventurer-images')
const adventurerName = document.querySelector('.name-adventurer')
const selectionContainer = document.querySelector('.adventurer-select-container')
const chosenAdventurer = document.querySelector('.selected-adventurer img');

// Game Board Elements
const gameBoard = document.querySelector('.game')
const htmlCards = document.querySelectorAll('.card')
const healthBar = document.querySelector('.progress-bar')
const healthStat = document.querySelector('.health')
const max_health = 1000;
let currentHealth = max_health;

// Game Buttons
const charactersButton = document.querySelectorAll('.race-select');
const startGame = document.getElementById('start-btn')

// Game Over
const btnPlayAgain = document.getElementById('btn-play-again')
const gameOver = document.querySelector('.game-over')
const gameMessage = document.querySelector('.complete-game')

// Audio Elements
const crystalTheme = document.querySelector('.myAudio')
const crystalLoop = document.querySelector('.crystal-loop')
const warOfLight = document.querySelector('.game-music')
const victoryFanfare = document.querySelector('.victory-fanfare')
const loseGame = document.querySelector('.lose')
const audioElements = document.querySelectorAll('.audio')

audioElements.forEach(audio => {
    audio.volume = 0.05;
})

// Play music upon loading
window.addEventListener('DOMContentLoaded', (event) => {
    let audio = document.getElementById('myAudio');
    audio.play();
    audio.volume = 0.1;
});

crystalTheme.addEventListener('ended', function() {
    crystalLoop.volume = crystalTheme.volume;
    crystalLoop.play();
})

// Adventurer Objects
const races = {
    hyur: [
        {
            src:'adventurer-hyur-male', 
            alt:'A human male game character with black hair.'
        },
        {
            src:'adventurer-hyur-female', 
            alt:'A human female game character with black hair.'
        }],
    elezen: [
        {
            src:'adventurer-elezen-male',
            alt: 'A tall elf male game character with grey hair.'
        },
        {
            src:'adventurer-elezen-female',
            alt: 'A tall elf female game character with blonde hair.'
        }],
    lalafell: [
        {
            src:'adventurer-lalafell-male',
            alt:'A short elf male game character with blonde hair.'
        },
        {
            src:'adventurer-lalafell-female',
            alt:'A short elf female game character with black hair.'
        }],
    miqote: [
        {
            src:'adventurer-miqote-male',
            alt:'A catboy game character with red hair.'
        },
        {
            src:'adventurer-miqote-female',
            alt:'A catgirl game character with pink hair.'
        }],
    roegadyn: [
        {
            src:'adventurer-roe-male',
            alt:'A large white skinned muscular male game character with black hair.'
        },
        {
            src:'adventurer-roe-female',
            alt:'A large white skinned female game character with white hair.'
        }],
    aura: [
        {
            src:'adventurer-aura-male',
            alt:'A tall male game character with horns and black hair.'
        },
        {
            src:'adventurer-aura-female',
            alt:'A female game character with horns and pink hair.'
        }],
    hrothgar: [
        {
            src:'adventurer-hrothgar-male',
            alt:'A large tiger man game character with brown hair and fur.'
        },
        {
            src:'adventurer-hrothgar-female',
            alt:'A large tiger woman game character with brown hair and fur.'
        }],
    viera: [
        {
            src:'adventurer-viera-male',
            alt:'A tall bunny boy game character with black rabbit ears.'
        },
        {
            src:'adventurer-viera-female',
            alt:'A tall bunny girl game character with white ears and long white hair.'
        }]
}

// Adventurer Selection Buttons
charactersButton.forEach((button) => {
    button.addEventListener('click', function() {
        const id = button.getAttribute('id');
        const racesSelect = races[id];

        racesSelect.forEach((race, index) => {
            adventurerImages[index].src = `./images/${race.src}.png`
            adventurerImages[index].alt = race.alt;
            adventurerImages[index].style.display = 'block';
        }) 
        imagesContainer.classList.remove('isHidden')
        imagesContainer.style.display = 'flex';
    })
})

// Click on chosen adventurer, name form shows
adventurerImages.forEach(function(image) {
    image.addEventListener('click', function() {
        imagesContainer.style.display = 'none';
        selectionContainer.style.display = 'none';
        adventurerName.classList.remove('isHidden');
        adventurerName.style.display = 'block';
        // Update the src of the selected-adventurer
        const imgSource = image.src;
        chosenAdventurer.src = imgSource;
    })
})

// Input adventurer name, hide form
// Show game board with selected adventurer and user name input
const inputFirstName = document.getElementById('adventurer-name-first');
const inputLastName = document.getElementById('adventurer-name-last');
const adventurerNameInput = adventurerName.querySelector('form');

adventurerNameInput.addEventListener('submit', function(e) {
    e.preventDefault();

    document.getElementById('fn').innerHTML = inputFirstName.value;
    document.getElementById('ln').innerHTML = inputLastName.value;
    
    adventurerName.style.display = 'none';
    gameBoard.classList.remove('isHidden');
    clearForm();
}) 

function clearForm() {
    inputFirstName.value = '';
    inputLastName.value = '';
}

// Card objects
const cardElements = document.querySelectorAll('.card');

class Card {
    constructor(path, name, number) {
        this.path = path;
        this.alt = name;
        this.number = number;
    }
}

const cards = [];
// Warror
cards[0] = new Card('images/ff14-card-war.png', 'Warrior', 1);
cards[1] = new Card('images/ff14-card-war.png', 'Warrior', 1);
// Scholar
cards[2] = new Card('images/ff14-card-sch.png', 'Scholar', 2);
cards[3] = new Card('images/ff14-card-sch.png', 'Scholar', 2);
// Ninja
cards[4] = new Card('images/ff14-card-nin.png', 'Ninja', 3);
cards[5] = new Card('images/ff14-card-nin.png', 'Ninja', 3);
// Dancer
cards[6] = new Card('images/ff14-card-dnc.png', 'Dancer', 4);
cards[7] = new Card('images/ff14-card-dnc.png', 'Dancer', 4);
// Black Mage
cards[8] = new Card('images/ff14-card-blm.png', 'Black mage', 5);
cards[9] = new Card('images/ff14-card-blm.png', 'Black mage', 5);

// Start Button
startGame.addEventListener('click', function() {
    let shuffledCards = shuffleCards(cards);
    cardElements.forEach(function(card, i) {
        card.src = shuffledCards [i].path;
    })
    // Disable start button after click
    startGame.disabled = true;
    // Enable card clicking
    console.log(htmlCards);
    htmlCards.forEach((card, i) => {
        const img = new Image();
        img.src = shuffledCards[i].path;
        img.alt = shuffledCards[i].alt;
        // Statement making card array get added the first time
        // And replaced the next times you play game
        if (card.childNodes.length < 4){
            card.appendChild(img);
            card.addEventListener('click', clickCard);
        } else {
            const newImages = card.querySelectorAll('img')
            const newImagesArray = Array.from(newImages);
            const frontImage = newImagesArray.filter(item => {
                return !item.classList.contains('default')
            }) 
        }
    })
    // Audio element change
    if (!crystalTheme.paused) {
        crystalTheme.pause();
    }
    if (!crystalLoop.paused) {
        crystalLoop.pause();
    }
    warOfLight.currentTime = 0;
    warOfLight.play();
})

function shuffleCards() {
    let j, x, i;
    for (i = cards.length -1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = cards[i];
        cards[i] = cards[j];
        cards[j] = x;
    }
    return cards;
}

// Game state variables
let lockCards = false
let flippedCards = []

// Click function
function clickCard() {  
    const defaultCard = this.querySelectorAll('img')[0];
    const cardImage = this.querySelectorAll('img')[1];

    flippedCards.push(this);
    
    defaultCard.classList.add('open-card');
    cardImage.classList.add('open-card');

    setTimeout(function() {
        cardImage.style.zIndex = '6';
    }, 500)

    if (lockCards || this.classList.contains('matched')) {
        return;
    }
    if (flippedCards.length === 2) {
        lockCards = true
        checkMatch();
    }
}

// Matching function
function checkMatch() {
    const firstCard = flippedCards[0];
    const secondCard = flippedCards[1];

    const firstCardImage = firstCard.querySelectorAll('img')[1];
    const secondCardImage = secondCard.querySelectorAll('img')[1];

    const firstCardAlt = firstCardImage.alt;
    const secondCardAlt = secondCardImage.alt;

    if (firstCardAlt === secondCardAlt) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        unflipCards(true);
    } else {
        setTimeout(function() {
            unflipCards();
            lockCards = false;
            flippedCards = [];

            currentHealth -= 250;
            if (currentHealth < 0) {
                currentHealth = 0;
            }
            healthStat.textContent = currentHealth;
            updateHealthBar();
            
        }, 1000);
    } 
    setTimeout(function() {
        endGame();
    },1000)
};

function unflipCards(matched = false) {
    if (matched) {
        flippedCards = [];
        lockCards = false;
    } else {
        flippedCards.forEach(card => {
            const cardImages = card.querySelectorAll('img');
            cardImages.forEach(image => {
                image.classList.remove('open-card');
                image.classList.add('close-card');
                const isDefault = image.classList.contains('default');
                setTimeout(function() {
                    if (isDefault) {
                        image.style.zIndex = '5';
                    } else {
                        image.style.zIndex = '1';
                    }
                    image.classList.remove('close-card');
                }, 500)
            })
        })
        lockCards = false;
        flippedCards = [];
    }
}

function updateHealthBar() {
    const healthPercentage = (currentHealth / max_health) * 100;
            
    healthBar.style.width = healthPercentage + '%';

    healthBar.className = 'progress-bar';
        if (currentHealth >= 100) {
            healthBar.classList.add('full');
        } else if (currentHealth >= 75) {
            healthBar.classList.add('three-quarters')
        } else if (currentHealth >= 50) {
            healthBar.classList.add('half')
         } else if (currentHealth >= 25) {
            healthBar.classList.add('quarter');
        } else {
            healthBar.classList.add('empty');
        }
        setTimeout(function() {
            endGame();
        },1000)
}

function endGame () {
    const health = parseInt(healthStat.textContent);
    const matchedCardsCount = document.querySelectorAll('.matched').length;

    if (health === 0) {
        // Player has lost
        gameBoard.classList.add('isHidden')
        gameOver.classList.remove('isHidden')
        gameMessage.textContent = "Duty Failed!"
        btnPlayAgain.style.display = 'block'
        warOfLight.pause();
        loseGame.play();
    } else if (health > 0 && matchedCardsCount === 10) {
        // Player has won
        gameBoard.classList.add('isHidden')
        gameOver.classList.remove('isHidden')
        btnPlayAgain.style.display = 'block'
        warOfLight.pause();
        victoryFanfare.play();
    } 
}

btnPlayAgain.addEventListener('click', resetGame);

function resetGame() {
    // Reset health and game stats
    currentHealth = max_health;
    healthStat.textContent = currentHealth;
    updateHealthBar();

    // Reset matched cards
    const matchedCards = document.querySelectorAll('.matched');
    matchedCards.forEach(card => card.classList.remove('matched'));

    // Remove open and close classes to all cards
    const allImages = document.querySelectorAll('img');
    allImages.forEach(image => {
        image.classList.remove('open-card');
        image.classList.remove('close-card');
        if (image.classList.contains('default')) {
            image.style.zIndex = '5';
        } else {
            image.style.zIndex = '1';
        }
    })

    // Hide game over message
    gameOver.classList.add('isHidden');

    // Reset flipped cards and game state variables
    flippedCards = [];
    lockCards = false;
    startGame.disabled = false;

    // Show character selection screen
    selectionContainer.style.display = 'block';
    imagesContainer.classList.add('isHidden');
    adventurerName.classList.add('isHidden');
    gameBoard.classList.add('isHidden');

    // Play chracter selection music
    victoryFanfare.pause();
    crystalTheme.play();
}

