//Імпорт бібліотеки повідомлень:
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


// Імпортую форму на яку буде виконуватися сабміт:
const form = document.querySelector('.form');


//Далі створюю функції з алертами залежно від потреби
function showIziToastFulfilledAlert(delay) {
    iziToast.success({
        timeout: delay,
        message: `Fulfilled promise in ${delay}ms`,
        position: "topRight",
        messageColor: 'white',
        backgroundColor: '#59A10D',
        progressBarColor: '#326101',
        class: 'iziToast-settings', //додаткову стилізацію запхнув сюди до класу в CSS
      });}

function showIziToastRejectedAlert(delay) {
    iziToast.error({
        timeout: delay,
        message: `Rejected promise in ${delay}ms`,
        position: "topRight",
        messageColor: 'white',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        class: 'iziToast-settings', //додаткову стилізацію запхнув сюди до класу в CSS
      });
}

function showIziToastCautionAlert() {
      iziToast.warning({
        message: 'The delay must be multiple of a 1000',
        messageColor: 'white',
        position: "topRight",
        backgroundColor: '#FFA000',
        progressBarColor: '#BB7B10',
        class: 'iziToast-settings', //додаткову стилізацію запхнув сюди до класу в CSS
      });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const delay = parseInt(form.elements['delay'].value, 10);
    const state = form.elements['state'].value;
    
    //Тут якщо я ввів число яке не кратне 1000 то при сабміті буде відповідне повідомлення
    if (delay % 1000 !== 0) {
        showIziToastCautionAlert();
        return;
    }
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
    
    promise
        .then((delay) => {
            showIziToastFulfilledAlert(delay);
        })
        .catch((delay) => {
            showIziToastRejectedAlert(delay);
        });
});