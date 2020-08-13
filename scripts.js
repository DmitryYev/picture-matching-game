const gameField   = document.getElementById('field');
const startButton = document.getElementById('start');
const fieldItems  = document.getElementsByClassName('game-field__item');
const fieldCovers = document.getElementsByClassName('game-field__cover');
const fieldImages = document.getElementsByClassName('game-field__img');
const openItems   = [];
let fieldCovered  = false;
let imagesHidden  = false;
let fieldCoverTimeout;
let checkMatchTimeout;
let gameTimerStart;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
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
    shuffle(itemsArray);
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
    target = e.target;
    if (target.className !== 'game-field__cover') return;

    if (openItems.length < 2) {
        target.previousElementSibling.style.display = 'block';
        target.style.display = 'none';
        openItems.push(target);
    };

    if (openItems.length == 2) {
        checkMatchTimeout = setTimeout(() => {
            if (openItems[0].parentElement.className !== openItems[1].parentElement.className) {
                openItems[0].style.display = 'block';
                openItems[0].previousElementSibling.style.display = 'none';
                openItems[1].style.display = 'block';
                openItems[1].previousElementSibling.style.display = 'none';
            };
            openItems.length = 0;
        }, 1000);
    };

    for (let cover of fieldCovers) {
        if (cover.style.display !== 'none') return;
    };
    let gameTimerEnd = (Date.now() - gameTimerStart) / 1000;
    alert('Great! Your result: ' + gameTimerEnd + ' seconds');
});