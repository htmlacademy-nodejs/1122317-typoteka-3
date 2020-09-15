'use strict';
const {
  MONTHS
} = require(`./constants`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getCountDays = (month, year) => {
  const COUNT_DAYS_NOT_LEAP_FEBRUARY = 28;
  const COUNT_DAYS_LEAP_FEBRUARY = 29;
  const COUNT_DAYS_MONTH_BIG = 31;
  const COUNT_DAYS_MONTH_SMALL = 30;
  const isLeap = (y) => y & 3 || (!(y % 25) && y & 15);

  switch (month) {
    case MONTHS.april:
    case MONTHS.june:
    case MONTHS.september:
    case MONTHS.november:
      return COUNT_DAYS_MONTH_BIG;
    case MONTHS.february:
      if (isLeap(+year)) {
        return COUNT_DAYS_NOT_LEAP_FEBRUARY;
      } else {
        return COUNT_DAYS_LEAP_FEBRUARY;
      }
    default:
      return COUNT_DAYS_MONTH_SMALL;
  }
};

const getRandomTime = (mahHour, maxMinute, maxSeconds) => {
  const MAX_HOUR = mahHour || 24;
  const MAX_MINUTE = maxMinute || 60;
  const MAX_SECONDS = maxSeconds || 60;

  return ({
    hour: getRandomInt(0, MAX_HOUR),
    minute: getRandomInt(0, MAX_MINUTE),
    second: getRandomInt(0, MAX_SECONDS),
  });
};

const getRandomDate = () => {
  const MAX_DIFF = 3;
  const COUNT_MONTH = 11;

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  const minMonth = currentMonth - MAX_DIFF > 0 ? currentMonth - MAX_DIFF : currentMonth - MAX_DIFF + COUNT_MONTH;

  const randomMonth = getRandomInt(minMonth, currentMonth);
  const resultYear = currentMonth - MAX_DIFF > randomMonth ? currentYear - 1 : currentYear;

  const countDays = getCountDays(randomMonth + 1, resultYear);
  const minDay = currentMonth - randomMonth === MAX_DIFF ? currentDay : 1;
  const randomDay = getRandomInt(minDay, countDays);

  const randomTime = (currentDay === randomDay && currentMonth === randomMonth) ? getRandomTime(currentHour, currentMinute, currentSeconds) : getRandomTime();

  return new Date(resultYear, randomMonth, randomDay, randomTime.hour, randomTime.minute, randomTime.second, 0);
};

module.exports = {
  getRandomInt,
  shuffle,
  getRandomDate
};
