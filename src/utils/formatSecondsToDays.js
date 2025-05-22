"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSecondsToDays = void 0;
exports.formatSeconds = formatSeconds;
var formatSecondsToDays = function (seconds) {
    var days = seconds / 86400;
    return "".concat(days, " day").concat(days !== 1 ? 's' : '');
};
exports.formatSecondsToDays = formatSecondsToDays;
// console.log(formatSecondsToDays(2592000)); // "30 days"
function formatSeconds(seconds) {
    var SECONDS_IN_MINUTE = 60;
    var SECONDS_IN_HOUR = 3600;
    var SECONDS_IN_DAY = 86400;
    var SECONDS_IN_WEEK = SECONDS_IN_DAY * 7;
    var SECONDS_IN_MONTH = SECONDS_IN_DAY * 30; // Approximate
    var months = Math.floor(seconds / SECONDS_IN_MONTH);
    seconds %= SECONDS_IN_MONTH;
    var weeks = Math.floor(seconds / SECONDS_IN_WEEK);
    seconds %= SECONDS_IN_WEEK;
    var days = Math.floor(seconds / SECONDS_IN_DAY);
    seconds %= SECONDS_IN_DAY;
    var hours = Math.floor(seconds / SECONDS_IN_HOUR);
    seconds %= SECONDS_IN_HOUR;
    var minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
    seconds %= SECONDS_IN_MINUTE;
    var parts = [];
    if (months)
        parts.push("".concat(months, " month").concat(months > 1 ? "s" : ""));
    if (weeks)
        parts.push("".concat(weeks, " week").concat(weeks > 1 ? "s" : ""));
    if (days)
        parts.push("".concat(days, " day").concat(days > 1 ? "s" : ""));
    if (hours)
        parts.push("".concat(hours, " hour").concat(hours > 1 ? "s" : ""));
    if (minutes)
        parts.push("".concat(minutes, " minute").concat(minutes > 1 ? "s" : ""));
    if (seconds)
        parts.push("".concat(seconds, " second").concat(seconds > 1 ? "s" : ""));
    return parts.length > 0 ? parts.join(", ") : "0 seconds";
}
// console.log(formatSeconds(2592000)); 
// console.log(formatSeconds(1209600)); 
// console.log(formatSeconds(90061));   
// console.log(formatSeconds(65));      
// console.log(formatSeconds(0));       
