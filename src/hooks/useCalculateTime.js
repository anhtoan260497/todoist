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
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const shortWeekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
  const day = now.getDay() - 1;
  const month = now.getMonth() - 1;
  const year = now.getFullYear();

  return {
    date: date >= 10 ? date : `0${date}`,
    day: weekdays[day],
    shortWeekdays: shortWeekdays[day],
    monthNum : month > 10 ? month + 2 : `0${month + 2} `,
    month: months[month],
    shortMonths : shortMonths[month],
    year,
    timestamp: Date.now(),
    fullDateObj: now,
  };
};

export default useCalculateTime;
