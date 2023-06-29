import Cookies from 'js-cookies'

function testRegex(value, regex) {
    return regex.test(value)
}

export function customRegex(value, option) {
    const options = {
        'phone': {
            regex: /^((09|03|07|08|05)+(\d{8}))$/g,
        },
        'fullName': {
            regex: /^[^!@#$%^&*()_+=\-[\]:'";.?<>|\\0-9]+$/g,
        },
        'email': {
            regex: /^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
        },
        'otp': {
            regex: /^\d{4}$/g,
        },
        'luckyNumber': {
            regex: /^\d{4}$/g,
        }
    }
    return testRegex(value, options[option].regex)
}


export const setCookies = (key,value) => {
    Cookies.setItem(key,value)
}

export const getCookies = (key) => {
     return Cookies.getItem(key)
}


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
