const submit = document.querySelector('button');
const rating = document.querySelector('#rating');
const thanks = document.querySelector('#thank-you');
const displayScore = document.querySelector('.final-rating');

const submiting = () => {
    const score = document.querySelector('input:checked');
    rating.classList.add('hidden');
    thanks.classList.remove('hidden');
    displayScore.innerHTML = `You selected ${ score.value } out of five`;
};

submit.onclick = submiting;
