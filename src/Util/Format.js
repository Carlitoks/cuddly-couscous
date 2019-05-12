export const formatTimerNumber = (num) => {
  if (num == 0) {
    return "00";
  }
  if (num < 10) {
    return `0${num}`;
  }
  return num;
};

export const formatTimerSeconds = (s) => {
  let minutes = parseInt(s / 60, 10);
  let seconds = parseInt(s % 60 , 10);
  return `${formatTimerNumber(minutes)}:${formatTimerNumber(seconds)}`;
};