const adviceNo = document.querySelector('.adviceNo');
const advice = document.querySelector('h1');
const button = document.querySelector('button');

const getAdvice = async () => {
    await fetch('https://api.adviceslip.com/advice')
        .then((response) => response.json())
        .then((data) => {

            advice.textContent = data.slip.advice,
                adviceNo.textContent = data.slip.id
        })

};

getAdvice()
button.onclick = getAdvice