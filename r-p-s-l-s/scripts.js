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
let count = 0,
    winner = '';
score.innerText = count;

const markerOptions = [
    'scissors',
    'spock',
    'paper',
    'lizard',
    'rock'
];

//TODO need to increase marker size on game-play page
const drawGame = () => {
    showWinner.innerText = 'It`s a draw';
    end.classList.toggle('hidden');
};

const displayWinner = (user, house) => {
    if (user === house) {
        return drawGame();
    }
    let temp = count;

    const check = (first, second) => {
        return (house === first || house === second);
    };

    switch (true) {
        case (user === 'paper'):
            check('lizard', 'scissors') ? count-- : count++;
            //(house === 'lizard' || house === 'scissors')

            break;
        case (user === 'rock'):
            check('paper', 'spock') ? count-- : count++;
            // (house === 'paper' || house === 'spock')
            break;
        case (user === 'lizard'):
            check('rock', 'scissors') ? count-- : count++;
            //(house === 'rock' || house === 'scissors') ? count-- : count++;
            break;
        case (user === 'spock'):
            check('lizard', 'paper') ? count-- : count++;
            //(house === 'lizard' || house === 'paper') ? count-- : count++;
            break;
        case (user === 'scissors'):
            check('spock', 'rock') ? count-- : count++;
            //(house === 'spock' || house === 'rock') ? count-- : count++;
            break;
        default:
            return;
    }

    // ** prevent score from going negative, display the score
    if (count <= -1) count = 0;
    score.innerText = count;

    count <= temp ? glowWinner('house') : glowWinner('user');

};
const glowWinner = (winner) => {
    console.log('WINER:', winner);
    let button = document.querySelector(`#${ winner }`);
    end.classList.toggle('hidden');
	
    winner == 'house' ? showWinner.innerText = 'The house wins!' : showWinner.innerText = 'You win!';
    button.classList.add('winning-marker');
};

// ** dr. house makes his choice
const housePick = (val) => {
    let random = Math.floor(Math.random() * (5 - 0) + 0),
        pick = markerOptions[random];
    let button = buildMarker(pick);

    button.classList.add('no-touchy');
    button.classList.add('show-marker');
    house.appendChild(button);
    displayWinner(val, pick);
};

// ** user makes their choice
const userPick = (val) => {
    let marker = buildMarker(val);

    beginning.classList.toggle('hidden');
    playing.classList.remove('hidden');

    marker.classList.add('no-touchy');
    marker.classList.add('show-marker');
    user.appendChild(marker);
    housePick(val);
};
const resetProps = (div) => {
    div.innerHTML = null;
    div.classList.remove('winning-marker');
};
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
