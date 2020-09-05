'use strict';

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
  const isLeap = (y) => y & 3 || (!(y % 25) && y & 15);

  switch (month) {
    case 4:
    case 6:
    case 9:
    case 11:
      return 31;
    case 2:
      if (isLeap(+year)) {
        return 28;
      } else {
        return 29;
      }
    default:
      return 30;
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

  const countDays = getCountDays(randomMonth, resultYear);
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
