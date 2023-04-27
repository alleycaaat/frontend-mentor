const rowone = document.querySelector('.one');
const rowtwo = document.querySelector('.two');
const rules = document.querySelector('#rules');
const end = document.querySelector('.results');
const showWinner = document.querySelector('h1');
const user = document.querySelector('#user');
const rowthree = document.querySelector('.three');
const house = document.querySelector('#house');
const score = document.querySelector('.score-card');
const playing = document.querySelector('#game-play');
const beginning = document.querySelector('#start-game');

// ** track the game score
let points = 0;

score.innerText = points;

const markerOptions = [
    'scissors',
    'spock',
    'paper',
    'lizard',
    'rock'
];


const drawGame = () => {
    showWinner.innerText = 'It`s a draw';
    end.classList.toggle('hidden');
};

const determineWinner = (usr, hse) => {
    // ** usr = user's selection hse = dr. house's selection
    if (usr === hse) {
        return drawGame();
    }
    let temp = points;

    const check = (first, second) => {
        return (hse === first || hse === second);
    };

    switch (true) {
        case (usr === 'paper'):
            check('lizard', 'scissors') ? points-- : points++;
            break;
        case (usr === 'rock'):
            check('paper', 'spock') ? points-- : points++;
            break;
        case (usr === 'lizard'):
            check('rock', 'scissors') ? points-- : points++;
            break;
        case (usr === 'spock'):
            check('lizard', 'paper') ? points-- : points++;
            break;
        case (usr === 'scissors'):
            check('spock', 'rock') ? points-- : points++;
            break;
        default:
            return;
    }

    // ** prevent score from going negative
    if (points <= -1) points = 0;
    score.innerText = points;

    // ** need to remove .reveal before adding .winning-marker
    setTimeout(function () {
        house.classList.remove('reveal');
        points <= temp ? glowWinner('house') : glowWinner('house');
    }, 500);

};
const glowWinner = (winner) => {
    let button = document.querySelector(`#${ winner }`);
    end.classList.toggle('hidden');

    button.classList.add('winning-marker');
    winner == 'house' ? showWinner.innerText = 'House wins!' : showWinner.innerText = 'You win!';
};


// ** dr. house makes his choice
const housePick = (val) => {
    let random = Math.floor(Math.random() * (5 - 0) + 0),
        pick = markerOptions[random];
    let button = buildMarker(pick);

    button.classList.add('no-touchy', 'show-marker');
    house.classList.add('reveal');

    house.appendChild(button);

    setTimeout(function () {
        determineWinner(val, pick);
    }, 2100);
};

// ** user makes their choice
const userPick = (val) => {
    let marker = buildMarker(val);

    beginning.classList.toggle('hidden');
    playing.classList.remove('hidden');

    marker.classList.add('no-touchy', 'show-marker');
    marker.classList.add('show-marker');
    user.appendChild(marker);

    housePick(val);
};

// ** reset the selections, must set innerHTML to empty or the selections will stack up
const resetProps = (div) => {
    div.innerHTML = null;
    div.classList.remove('winning-marker');
};

// ** wipe things clean for a new game
const newGame = () => {
    end.classList.toggle('hidden');
    playing.classList.add('hidden');
    beginning.classList.toggle('hidden');

    resetProps(house);
    resetProps(user);
};

const handleClick = (e) => {
    let value = e.currentTarget.value;
    switch (true) {
        case (value === 'rules'):
            rules.classList.remove('hidden');
            break;
        case (value === 'close'):
            rules.classList.add('hidden');
            break;
        case (value === 'play again'):
            newGame();
            break;
        default:
            userPick(value);
    }
};

// ** build the marker buttons: create a button, nested div to show the icon;
const buildMarker = (markerName) => {
    let marker = document.createElement('button');
    const markerDiv = document.createElement('div');
    const icon = document.createElement('img');

    marker.setAttribute('class', `wrap-marker ${ markerName }`);
    marker.value = `${ markerName }`;

    markerDiv.setAttribute('class', 'marker');

    icon.src = `./images/icon-${ markerName }.svg`;
    icon.alt = `${ markerName } icon`;

    markerDiv.append(icon);
    marker.append(markerDiv);

    return marker;
};

const buildBoard = () => {
    rowone.appendChild(buildMarker('scissors'));
    rowtwo.appendChild(buildMarker('spock'));
    rowtwo.appendChild(buildMarker('paper'));
    rowthree.appendChild(buildMarker('lizard'));
    rowthree.appendChild(buildMarker('rock'));
};

buildBoard();

const buttons = document.querySelectorAll('button');

buttons.forEach(btn => {
    btn.addEventListener('click', handleClick);
})
//console.log('build marker:', rowone);