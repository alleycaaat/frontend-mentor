const countdown = new Date(Date.parse(new Date()) + 8 * 24 * 60 * 60 * 1000);
const days = document.querySelector('.days').querySelector('.flip-card');
const hours = document.querySelector('.hours').querySelector('.flip-card');
const minutes = document.querySelector('.minutes').querySelector('.flip-card');
const seconds = document.querySelector('.seconds').querySelector('.flip-card');

// ** get the time totals, return them
function getTimeRemaining(countdown) {
    const now = new Date();
    const diff = countdown - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
        diff,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(countdown) {

    function updateClock() {
        const t = getTimeRemaining(countdown);
        addFlip(days, t.days);
        addFlip(hours, t.hours);
        addFlip(minutes, t.minutes);
        addFlip(seconds, t.seconds);

        if (t.diff <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

const addFlip = (card, t) => {
    // ** confirm time has changed
    const currTime = card.querySelector('.top-half').innerText;
    if (t == currTime) return;

    const topHalf = card.querySelector('.top-half');
    const bottomHalf = card.querySelector('.bottom-half');
    const topFlip = document.createElement('div');
    const bottomFlip = document.createElement('div');

    // ** add animation, populate with current time
    topFlip.classList.add('top-flip');
    topFlip.innerText = currTime;

    bottomFlip.classList.add('bottom-flip');

    // ** animation begins, update top-half to new time
    topFlip.addEventListener('animationstart', () => {
        topHalf.innerText = t;
    });
    // ** animation ends, remove animated div, update bottom animation to new time
    topFlip.addEventListener('animationend', () => {
        topFlip.remove();
        bottomFlip.innerText = t;
    });
    // ** animation ends, update bottom-half to new time, remove animated div
    bottomFlip.addEventListener('animationend', () => {
        bottomHalf.innerText = t;
        bottomFlip.remove();
    });

    card.appendChild(topFlip);
    card.appendChild(bottomFlip);
};

//
initializeClock(countdown);







/*
const countdown = new Date(Date.parse(new Date()) + 12 * 24 * 60 * 60 * 1000);
const cards = document.querySelectorAll('.card');
setInterval(() => {

    var now = new Date();
    var diff = countdown - now;

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    updateCards(days);

    console.log('object');
}, 1000);


const updateCards = (distance) => {

    console.log('distance:');
    newTime(distance)
};

const addFlip = () => {
    cards.forEach((card) => {
        console.log('first');
        const currTime = card.querySelector('.top-half').innerText
        const topHalf = card.querySelector('.top-half');
        const bottomHalf = card.querySelector('.bottom-half');
        const newTop = document.createElement('div');
        const newBottom = document.createElement('div');

        newTop.classList.add('top-flip');
        newTop.innerText = currTime;
        newBottom.classList.add('.bottom-flip');
        topHalf.appendChild(newTop);
        bottomHalf.appendChild(newBottom);
        newBottom.innerText = distance
    });
}
*/