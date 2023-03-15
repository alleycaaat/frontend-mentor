const fetchData = async () => {
    const addy = 'https://raw.githubusercontent.com/alleycaaat/frontend-mentor/main/time-tracking/data.json';
    try {
        let res = await fetch(addy);
        return await res.json();
    } catch (error) {
        console.log('fetch error:', error);
    }
};
const backgrounds = [
    lightRed = 'hsl(15, 100%, 70%)',
    lightBlue = 'hsl(195, 74%, 62%)',
    lightRed2 = 'hsl(348, 100%, 68%)',
    limeGreen = 'hsl(145, 58%, 55%)',
    violet = 'hsl(264, 64%, 52%)',
    lightOrange = 'hsl(43, 84%, 65%)',
];
const images = [
    './images/icon-work.svg',
    './images/icon-play.svg',
    './images/icon-study.svg',
    './images/icon-exercise.svg',
    './images/icon-social.svg',
    './images/icon-self-care.svg',
];

let count = 0;
let displayChoice = 'weekly';
const buttons = document.querySelectorAll('button');

//create card_upper div
const createUpper = (card) => {
    const upperDiv = document.createElement('div');
    const img = document.createElement('img');
    upperDiv.classList.add('card_upper');

    upperDiv.setAttribute('style', `background: ${ backgrounds[count] } url(${ images[count] }) 90% 50% no-repeat`);

    count++;

    card.appendChild(upperDiv);
};
//create card_lower div
const createLower = (group, card) => {
    const lowerDiv = document.createElement('div');
    let timeframe = group.timeframes[displayChoice];

    lowerDiv.classList.add('card_lower');

    groupUpper(group, lowerDiv);
    groupLower(group, lowerDiv);
    card.appendChild(lowerDiv);
};
//first div in card_lower
//holds the title and the ellipsis
const groupUpper = (group, lowerDiv) => {
    const grouping = document.createElement('div');
    const img = document.createElement('img');

    let h2 = document.createElement('h2');
    h2.innerText = group.title;

    img.setAttribute('src', './images/icon-ellipsis.svg');
    img.setAttribute('alt', 'ellipsis icon');
    grouping.classList.add('uppergrouping');

    grouping.appendChild(h2);
    grouping.appendChild(img);
    lowerDiv.appendChild(grouping);
};
//second div in card_lower
//holds the current hours and previous hours
const groupLower = (group, lowerDiv) => {
    const grouping = document.createElement('div');

    let h3 = document.createElement('h3'),
        h4 = document.createElement('h4');

    grouping.classList.add('lowergrouping');

    h3.classList.add(`${ group.title }`);
    h4.classList.add(`${ group.title }-h4`);

    grouping.appendChild(h3);
    grouping.appendChild(h4);

    lowerDiv.appendChild(grouping);
};
const createSection = (group, main) => {
    const card = document.createElement('section');
    card.classList.add('card');

    createUpper(card);
    createLower(group, card);
    main.appendChild(card);
};
const createSections = (data) => {
    const main = document.querySelector('.section_cards');

    for (const group of data) {
        createSection(group, main);
    }
};
//update the information when a different range is selected
const updateDisplayInfo = (data, displayChoice) => {
    for (const el of data) {
        let title = el.title,
            current = el.timeframes[displayChoice].current,
            previous = el.timeframes[displayChoice].previous,
            range = displayChoice === 'daily' ? 'Yesterday' : `Last ${ displayChoice.slice(0, -2) }`;

        const h3 = document.querySelector(`.${ title }`);
        const h4 = document.querySelector(`.${ title }-h4`);

        h3.textContent = `${ current }hrs`;
        h4.textContent = `${ range } - ${ previous }hrs`;
    }
};
//add functionality to buttons
const buttonFunction = (data) => {
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            updateButtons(e.target);
            displayChoice = e.target.id;
            updateDisplayInfo(data, displayChoice);
        });
    });
};
//change active selection
const updateButtons = (selected) => {
    buttons.forEach((btn) => {
        btn.classList.remove('selected');
    });
    selected.classList.add('selected');
};

const updateDisplay = async () => {
    const data = await fetchData();
    createSections(data);
    updateDisplayInfo(data, displayChoice);
    buttonFunction(data);
};

updateDisplay();