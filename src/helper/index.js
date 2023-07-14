export function testRegex(value, regex) {
  return regex.test(value);
}

export function customRegex(value, option) {
  const options = {
    phone: {
      regex: /^((09|03|07|08|05)+(\d{8}))$/g,
    },
    fullName: {
      regex: /^[^!@#$%^&*()_+=\-[\]:'";.?<>|\\0-9]+$/g,
    },
    email: {
      regex:
        /^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
    },
    otp: {
      regex: /^\d{4}$/g,
    },
    luckyNumber: {
      regex: /^\d{4}$/g,
    },
  };
  return testRegex(value, options[option].regex);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const allTask = (taskObj) => {
  let taskArr = [];
  for (let item in taskObj) {
    taskArr = [...taskArr, ...taskObj[item]];
  }
  return taskArr;
};

export const checkTaskDateType = (timestamp) => {
  const now = new Date(Date.now());
  const taskDate = new Date(timestamp);
  const nowDateObj = {
    date: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
  };
  const taskDateObj = {
    date: taskDate.getDate(),
    month: taskDate.getMonth(),
    year: taskDate.getFullYear(),
  };

  if (
    taskDateObj.date === nowDateObj.date &&
    taskDateObj.month === nowDateObj.month &&
    taskDateObj.year === nowDateObj.year
  )
    return "today";

  if (taskDate < now && taskDateObj.date < nowDateObj.date) return "overdue";

  if (taskDate > now) return "upcoming";
};
