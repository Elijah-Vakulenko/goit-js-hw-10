import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as h,i as f}from"./assets/vendor-77e16229.js";let m=[0];h("input#datetime-picker",{dateFormat:"Y-m-d H:i",altInput:!0,altFormat:"F j, Y (h:i K)",enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const e=t[0];e<new Date?(f.error({title:"Alert",message:"Please choose a date in the future",position:"topRight"}),l.disabled=!0):(m=e,l.disabled=!1)}});const l=document.querySelector("button[data-start]");class y{constructor(){this.isActive=!1}start(e){if(this.isActive)return;this.isActive=!0;const n=setInterval(()=>{const a=e-new Date,{days:i,hours:c,minutes:u,seconds:d}=v(a);S(i,c,u,d),a<=0&&clearInterval(n)},1e3)}}const p=new y,o={days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]")};function v(t){const i=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),u=Math.floor(t%864e5%36e5/6e4),d=Math.floor(t%864e5%36e5%6e4/1e3);return{days:i,hours:c,minutes:u,seconds:d}}function S(t,e,n,r){o.days.textContent=s(t),o.hours.textContent=s(e),o.minutes.textContent=s(n),o.seconds.textContent=s(r)}function s(t){return String(t).padStart(2,"0")}l.addEventListener("click",()=>p.start(m));
//# sourceMappingURL=commonHelpers.js.map
