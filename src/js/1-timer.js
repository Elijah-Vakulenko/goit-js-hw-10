// підключення бібліотеки:

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

//Функція підключення повідомлення за допомогою бібліотеки iziToast з відповідними налаштуваннями:
function showIziToastAlert() {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: "topRight",
        titleColor: 'white',
        messageColor: 'white',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        class: 'iziToast-settings', //додаткову стилізацію запхнув сюди до класу в CSS
      });}

let userSelectedDate = [0];

const startBtn = document.querySelector("button[data-start]"); // ← дістаємо кнопку

// Дістаємо елементи нашого таймера за прописаному в розмітці атрибутами↓
const clockFace = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

startBtn.disabled = true;

//поле інпуту з календарем та форматом відображення дати:

const input = flatpickr('#datetime-picker', {
  enableTime: true, //← підключення до календаря вибору годин і хвилин
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) { //← що відбувається при закритті календарика↓
    
    const selectedDate = selectedDates[0];
 
    if (selectedDate < new Date()) { //якщо обрана дата меньша за поточну, тобто в минулому, тоді↓

     showIziToastAlert(); // ← Викликаємо алерт iziToast
     startBtn.disabled = true; // ← вимикаємо кнопку бо обрана дата в минулому
    
    } else {
      userSelectedDate = selectedDate; 
      startBtn.disabled = false; // ← якщо дата в майбутньому вмикаємо кнопку
    }
  },
});

class Timer {

  start(selectedDate) {
    startBtn.disabled = true; // ← Вимикаємо кнопку поки йде відлік
    input.element.disabled = true; // ← Вимикаємо поле вибору дати

    //Робимо інтервал зворотнього відліку в 1 сек (1000 мс):
    const countDownInterval = setInterval(() => {
      const currentTime = new Date(); // ← визначаємо поточний час
      const ms = selectedDate - currentTime; // загальний час в мілесекундах дорівнює різниці обраного часу від поточного
      const { days, hours, minutes, seconds } = convertMs(ms);
      updateTimer(days, hours, minutes, seconds);
      
    // Якщо час відліку вже сплив:
      if (ms <= 0) {
        clearInterval(countDownInterval); //очищуємо інтервал
        updateTimer(0, 0, 0, 0); // Обнуляємо лічильник
        startBtn.disabled = false; // Вмикаємо кнопку для можливості повторного використання
        input.element.disabled = false; // Вмикаємо інпут для обирання нової дати
      }
    }, 1000); // крок через який буде повторюватись функція інтервалу
  }
}

const timer = new Timer();

// Конвертор загального часу в мілесекундах у значення таймеру:
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція оновлює значення таймеру, форматуючи функцією addLeadingZero:
function updateTimer(days, hours, minutes, seconds) {
  clockFace.days.textContent = addLeadingZero(days);
  clockFace.hours.textContent = addLeadingZero(hours);
  clockFace.minutes.textContent = addLeadingZero(minutes);
  clockFace.seconds.textContent = addLeadingZero(seconds);
}

// Функція форматує час за шаблоном 00:00:00:00: 
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//на кнопці слухач подій який викликає функцію: 
startBtn.addEventListener('click', () => timer.start(userSelectedDate));