import React from "react";

const useCalculateTime = (timestamp) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Monday",
  ];
  const shortWeekdays = ["Sun", "Tue", "Wed", "Thu", "Fri", "Sat","Mon"];
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const now = !timestamp ?  new Date() : new Date(timestamp);
  const date = now.getDate();
  const day = now.getDay();
  const month = now.getMonth();
  const year = now.getFullYear();


  return {
    date: date < 10 ? `0${date}` : date ,
    day: weekdays[day],
    shortWeekdays: shortWeekdays[day],
    monthNum : month > 10 ? month : `0${month +1}`,
    month: months[month - 1],
    shortMonths : shortMonths[month],
    year,
    timestamp: Date.now(),
    fullDateObj: now,
  };
};

export default useCalculateTime;
