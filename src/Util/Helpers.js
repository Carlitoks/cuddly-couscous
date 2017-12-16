/**
 * @description Seconds to minutes and seconds String
 * 
 * @param {number} s - Time in seconds
 */
export const fmtMSS = s => {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
};
