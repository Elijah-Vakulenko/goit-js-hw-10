// підключення бібліотеки

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = [0];

//поле інпуту з календарем та форматом відображення дати

const input = flatpickr('#datetime-picker', {
  // dateFormat: "Y-m-d H:i",
  // altInput: true,
  // altFormat: "F j, Y (h:i K)", //кастомне відображення дати
  enableTime: true, //підключення до календаря вибору годин і хвилин
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  //що відбувається при закритті календарика
  onClose(selectedDates) {
    
    const selectedDate = selectedDates[0];
     
    if (selectedDate < new Date()) {

      //п1дключення пов1домлення за допомогою б1бл1отеки iziToast з в1дпов1жними налаштуваннями.
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: "topRight",
        titleColor: 'white',
        iconColor: '#ffffff',
        messageColor: 'white',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        layout: 2,
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate; 
      startBtn.disabled = false; 
    }
  },
});
 


const startBtn = document.querySelector("button[data-start]");

class Timer {

  constructor(){
    this.isActive = false;
  }



  start(selectedDate) {
    if (this.isActive) {
       return
     }

    this.isActive = true;
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const ms = selectedDate - currentTime;
      const { days, hours, minutes, seconds } = convertMs(ms);
      updateTimer(days, hours, minutes, seconds);
      
    
      if (ms <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
}


const timer = new Timer();

const timerFields = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};


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

function updateTimer(days, hours, minutes, seconds) {
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', () => timer.start(userSelectedDate)); 


