const gameField        = document.getElementById('field');
const startButton      = document.getElementById('start');
const fieldItems       = document.getElementsByClassName('game-field__item');
const fieldCovers      = document.getElementsByClassName('game-field__cover');
const fieldImages      = document.getElementsByClassName('game-field__img');
const openedItems      = [];
let fieldCovered       = false;
let imagesHidden       = false;
let checkMatchTimeout  = false;
let fieldCoverTimeout;
let gameTimerStart;

function shuffleItems(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

function setHighscores(startTime) {
    let gameTime = (Date.now() - startTime) / 1000;
    alert('Great! Your result: ' + gameTime + ' seconds');
}


startButton.addEventListener('click', function () {
    clearTimeout(fieldCoverTimeout);

    if (fieldCovered) {
        for (let cover of fieldCovers) {
            cover.style.display = 'none';
        };
        fieldCovered = false;
    };

    if (imagesHidden) {
        for (let img of fieldImages) {
            img.style.display = 'block';
        };
        imagesHidden = false;
    };

    let itemsArray = Array.from(fieldItems);
    shuffleItems(itemsArray);
    for (let i = 0; i < itemsArray.length; i++) {
        itemsArray[i].style.order = i + '';
    };

    fieldCoverTimeout = setTimeout(() => {
        for (let cover of fieldCovers) {
            cover.style.display = 'block';
        };
        for (let img of fieldImages) {
            img.style.display = 'none';
        };
        imagesHidden = true;
        fieldCovered = true;
        gameTimerStart = Date.now();
    }, 2500);
});

gameField.addEventListener('click', function (e) {
    if (checkMatchTimeout) return;

    target = e.target;
    if (target.className !== 'game-field__cover') return;

    if (openedItems.length < 2) {
        target.previousElementSibling.style.display = 'block';
        target.style.display = 'none';
        openedItems.push(target);
    };

    if (openedItems.length == 2) {
        checkMatchTimeout = true
        setTimeout(() => {
            if (openedItems[0].parentElement.className !== openedItems[1].parentElement.className) {
                openedItems[0].style.display = 'block';
                openedItems[0].previousElementSibling.style.display = 'none';
                openedItems[1].style.display = 'block';
                openedItems[1].previousElementSibling.style.display = 'none';
            };
            openedItems.length = 0;
            checkMatchTimeout = false
        }, 1500);
    };

    for (let cover of fieldCovers) {
        if (cover.style.display !== 'none') return;
    };
    setHighscores(gameTimerStart);
});