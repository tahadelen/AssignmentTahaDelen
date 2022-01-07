export const checkDateFormat = (dateString: string) => {
    // First check for the pattern
    if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString)) {
        return false;
    }

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);
    var day = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
        return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

export const toDateFromYYYYMMDD = (dateStr: string) => {
    let dateObject = new Date(parseInt(dateStr.substring(0, 4)), parseInt(dateStr.substring(5, 7)) - 1 , parseInt(dateStr.substring(8, 10)));
    if (isDate(dateObject)) {
        return dateObject;
    }
    return null;
}

export const isDate = (arg: object) => {
    return arg instanceof Date;
}