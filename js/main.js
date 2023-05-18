let dateInMs = 1683925200000;

let now = new Date();
let timezoneOffset = now.getTimezoneOffset();
document.getElementById("timezone").value = timezoneOffset;

const urlParams = new URLSearchParams(window.location.search);
const dateParam = urlParams.get('DATE');
const UTCParam = urlParams.get('UTC');
if (dateParam) {
  dateInMs = parseInt(dateParam, 10);
  let dateFromUrl = new Date(dateInMs);
}

if (UTCParam) {
  document.getElementById("timezone").value = UTCParam;
}

let dateFromUrlseconds = new Date(dateInMs).getSeconds();
let dateFromUrlminutes = new Date(dateInMs).getMinutes();
let dateFromUrlhours = new Date(dateInMs).getHours();
let dateFromUrldays = new Date(dateInMs).getDate();
let dateFromUrlmonths = new Date(dateInMs).getMonth() + 1;
let dateFromUrlyears = new Date(dateInMs).getFullYear();

document.getElementById("second").value = dateFromUrlseconds;
document.getElementById("minute").value = dateFromUrlminutes;
document.getElementById("hour").value = dateFromUrlhours;
document.getElementById("day").value = dateFromUrldays;
document.getElementById("month").value = dateFromUrlmonths;
document.getElementById("year").value = dateFromUrlyears;

function calcDateDiff() {

  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value - 1;
  const day = document.getElementById("day").value;
  const hour = document.getElementById("hour").value;
  const minute = document.getElementById("minute").value;
  const second = document.getElementById("second").value;
  const timezone = document.getElementById("timezone").value;
  let collectedTime = new Date(year, month, day, hour, minute, second);
  let currentDate = new Date(now.getTime() + timezoneOffset * 60 * 1000 - timezone * 60 * 1000);

  if (collectedTime < currentDate) {
    document.querySelector(".collected-date").innerText = "От даты " + collectedTime.toLocaleString() + " прошло:";
    dateDiff = currentDate.getTime() - new Date(collectedTime).getTime();
  } else {
    document.querySelector(".collected-date").innerText = "До даты " + collectedTime.toLocaleString() + " пройдет:";
    dateDiff = new Date(collectedTime).getTime() - currentDate.getTime();
  }

  let seconds = Math.floor(dateDiff / 1000);
  let minutes = Math.floor(dateDiff / (1000 * 60));
  let hours = Math.floor(dateDiff / (1000 * 60 * 60));
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let weeks = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 7));
  let months = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 30));
  let years = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
  let dateDiff0UTC = dateDiff + timezoneOffset * 60 * 1000;

  let diffYears = new Date(dateDiff0UTC).getFullYear() - 1970;
  let diffMonths = new Date(dateDiff0UTC).getMonth();
  let diffDays = new Date(dateDiff0UTC).getDate() - 1;
  let diffHours = new Date(dateDiff0UTC).getHours();
  let diffMinutes = new Date(dateDiff0UTC).getMinutes();
  let diffSeconds = new Date(dateDiff0UTC).getSeconds();

  const yearText = diffYears + " " + getPluralForm(diffYears, "год", "года", "лет");
  const monthText = diffMonths + " месяц" + getPluralForm(diffMonths, "", "а", "ев");
  const dayText = diffDays + " д" + getPluralForm(diffDays, "ень", "ня", "ней");
  const hourText = diffHours + " час" + getPluralForm(diffHours, "", "а", "ов");
  const minuteText = diffMinutes + " минут" + getPluralForm(diffMinutes, "у", "ы", "");
  const secondText = diffSeconds + " секунд" + getPluralForm(diffSeconds, "у", "ы", "");

  document.getElementById("timeToNow").innerText = currentDate;
  document.getElementById("seconds").innerText = seconds;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("hours").innerText = hours;
  document.getElementById("days").innerText = days;
  document.getElementById("weeks").innerText = weeks;
  document.getElementById("months").innerText = months;
  document.getElementById("years").innerText = years;
  document.getElementById("timediff").innerText = yearText + " " + monthText + " " + dayText + " " + hourText + " " + minuteText + " " + secondText;

  let saveDate = "DATE=" + collectedTime.getTime();
  let timeZoneSave = document.getElementById("timezone").value;
  let saveUtc = "UTC=" + timeZoneSave;

  document.getElementById("savelink").value = "https://mycounter.org/?" + saveDate + saveUtc;

  let times = {
    timeSec: seconds,
    timeMin: minutes,
    timeHours: hours,
    timeDays: days,
    timeMonths: months,
    timeYears: years
  };
  let itog;
  let itogs = {};

  for (let key in times) {
    let time = times[key];
    let firstDigit = Number(String(time)[0]);
    let numDigits = String(time).length;
    let repeatNumber = Number(String(firstDigit).repeat(numDigits));
    let roundedValue = Math.round(time / Math.pow(10, numDigits - 1)) * Math.pow(10, numDigits - 1);
    let powerOf10 = Math.pow(10, Math.floor(Math.log10(time)));
    let roundedNumber = Math.ceil(time / powerOf10) * powerOf10;
    if (time == roundedNumber) {
      itog = time;
    } else {
      if (time == repeatNumber) {
        itog = repeatNumber;
      } else {
        if (time > repeatNumber) {
          itog = roundedNumber;
        } else {
          itog = repeatNumber;
        }
      }
    }

    itogs[`itog${key.slice(4)}`] = itog;
  }

  let diffItogSec = itogs.itogSec + seconds;
  console.log(Date(diffItogSec));


  document.getElementById("timeSec").innerText = itogs.itogSec;
  document.getElementById("timeMin").innerText = itogs.itogMin;
  document.getElementById("timeHour").innerText = itogs.itogHours;
  document.getElementById("timeDays").innerText = itogs.itogDays;
  document.getElementById("timeMonths").innerText = itogs.itogMonths;
  document.getElementById("timeYears").innerText = itogs.itogYears;

}

function getPluralForm(number, one, two, five) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return one;
  } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
    return two;
  } else {
    return five;
  }
}

document.getElementById("timezone").addEventListener("input", calcDateDiff);
document.getElementById("timeToNow").addEventListener("input", calcDateDiff);
document.getElementById("year").addEventListener("input", calcDateDiff);
document.getElementById("month").addEventListener("input", calcDateDiff);
document.getElementById("day").addEventListener("input", calcDateDiff);
document.getElementById("hour").addEventListener("input", calcDateDiff);
document.getElementById("minute").addEventListener("input", calcDateDiff);
document.getElementById("second").addEventListener("input", calcDateDiff);

window.onload = function () {
  calcDateDiff();
};

const savelink = document.getElementById('copyButton');
const poleField = document.getElementById('savelink');

savelink.addEventListener('click', () => {
  // Выделяем текст в поле
  poleField.select();
  poleField.setSelectionRange(0, 99999); // Для поддержки мобильных устройств

  // Копируем выделенный текст в буфер обмена
  document.execCommand('copy');

  // Очищаем выделение текста
  window.getSelection().removeAllRanges();

  // Изменяем текст кнопки после копирования
  savelink.textContent = 'Скопировано!';
});
