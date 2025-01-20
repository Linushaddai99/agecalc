import dateFormat from 'dateformat'

type Date = {
    year: number
    month: number
    day: number
}

type Identifier = {
    value: number
    type: 'day' | 'month' | 'year'
}

// console.log(new Date().getFullYear())

// sep, apr, jun, nov = 30days
// feb has 28 days in common years and 29 in leap years
// Any year that is evenly divisible by 4 is a leap year

const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const thirtyDaysMonths = [9, 4, 6, 11];

  // Sort activityKeys based on the index of month names
//   activityKeys.sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));


const isLeapYear = (year: number) => {
    return year % 4 == 0;
}

function daysToYearsMonthsDays(totalDays: number) {
    // Assuming 1 year = 365 days and 1 month = 30 days
    const daysInYear = 365;
    const daysInMonth = 30;

    const years = Math.floor(totalDays / daysInYear);
    const remainingDaysAfterYears = totalDays % daysInYear;

    const months = Math.floor(remainingDaysAfterYears / daysInMonth);
    const days = remainingDaysAfterYears % daysInMonth;

    return { years, months, days };
}

const getAge =(date: Date)=> {
    const todaysDate = new Date()
    const newdate = date.year + ' ' + date.month + ' ' + date.day;

    const birthDate = dateFormat(newdate, 'fullDate');
    const differenceInMilliseconds = todaysDate - birthDate;

    // Convert milliseconds to days
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    daysToYearsMonthsDays(differenceInDays)
}

const checkDate = (date: Date) => {
    const month = monthOrder.find((_, i) => date.month === i + 1);

    if(thirtyDaysMonths.includes(date.month) && date.day > 30) {
        return `Invalid day value for ${month}`
    } else if(date.month === 2 && date.day > 29) {
        return `Invalid day value for ${month}`
    } else if(date.month === 2 && !isLeapYear(date.year) && date.day > 28) {
        return `Invalid day value for ${month}`
    } else {
        getAge(date);
    }
}

const validateValue = (identifier: Identifier) => {
    if(typeof identifier.value === 'string') {
        return `must be a valid ${identifier.type}`
    } else if(identifier.type === 'day' && (identifier.value < 1 || identifier.value > 31)) {
        return `must be a valid ${identifier.type}`
    } else if(identifier.type === 'month' && (identifier.value < 1 || identifier.value > 12)) {
        return `must be a valid ${identifier.type}`
    } else if(identifier.type === 'year' && (String(identifier.value).length !== 4  || identifier.value > new Date().getFullYear())) {
        return `must be a valid ${identifier.type}`
    } else {
        return 'valid'
    }
}