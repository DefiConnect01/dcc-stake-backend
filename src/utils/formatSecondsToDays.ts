export const formatSecondsToDays = (seconds:number) => {
  const days = seconds / 86400;
  return `${days} day${days !== 1 ? 's' : ''}`;
};

// console.log(formatSecondsToDays(2592000)); // "30 days"
export function formatSeconds(seconds:number) {
  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_DAY = 86400;
  const SECONDS_IN_WEEK = SECONDS_IN_DAY * 7;
  const SECONDS_IN_MONTH = SECONDS_IN_DAY * 30; // Approximate

  const months = Math.floor(seconds / SECONDS_IN_MONTH);
  seconds %= SECONDS_IN_MONTH;

  const weeks = Math.floor(seconds / SECONDS_IN_WEEK);
  seconds %= SECONDS_IN_WEEK;

  const days = Math.floor(seconds / SECONDS_IN_DAY);
  seconds %= SECONDS_IN_DAY;

  const hours = Math.floor(seconds / SECONDS_IN_HOUR);
  seconds %= SECONDS_IN_HOUR;

  const minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
  seconds %= SECONDS_IN_MINUTE;

  const parts = [];
  if (months) parts.push(`${months} month${months > 1 ? "s" : ""}`);
  if (weeks) parts.push(`${weeks} week${weeks > 1 ? "s" : ""}`);
  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (seconds) parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);

  return parts.length > 0 ? parts.join(", ") : "0 seconds";
}

// console.log(formatSeconds(2592000)); 
// console.log(formatSeconds(1209600)); 
// console.log(formatSeconds(90061));   
// console.log(formatSeconds(65));      
// console.log(formatSeconds(0));       
