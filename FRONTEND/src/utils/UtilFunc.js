// USER RELATED

export function CheckEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function CheckName(name) {
    const regex = /^[a-zA-Z\p{L}\s\- ]+$/u;
    return regex.test(name);
}

export function CheckPassConfirmation(pass, pass2) {
    if (!pass || !pass2) {
        return false;
    }

    if (pass === pass2) {
        return true;
    }
    return false;
}

export function CheckPasswordSafety(pass) {

    // if (pass == '' || pass == undefined) {
    //     return false;
    // }

    let hasUpperCase = /[A-Z]/.test(pass);
    let hasLowerCase = /[a-z]/.test(pass);
    let hasNumbers = /\d/.test(pass);

    if (pass.length >= 8 && hasLowerCase && hasNumbers && hasUpperCase) {
        return true;
    }
    return false;
}

// DATES/PLANNING RELATED

export function GenerateDaysofMonth({ month, ignoreWeekEnd = false, year = new Date(Date.now()).getFullYear() }) {
    const dayTable = {
        0: "Dimanche",
        1: "Lundi",
        2: "Mardi",
        3: "Mercredi",
        4: "Jeudi",
        5: "Vendredi",
        6: "Samedi"
    };

    const monthTable = {
        0: "JANV",
        1: "FEV",
        2: "MARS",
        3: "AVR",
        4: "MAI",
        5: "JUIN",
        6: "JUIL",
        7: "AOÛT",
        8: "SEP",
        9: "OCT",
        10: "NOV",
        11: "DEC"
    };

    //const currentyear = new Date(Date.now()).getFullYear();

    let resultDates = [];

    for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {

        let daynum = new Date(year, month - 1, i).getDay();
        let date = new Date(year, month - 1, i).toString();
        let mydate = dayTable[daynum] + " " + i + " " + monthTable[month - 1] + " " + year;
        let dayget = dayTable[daynum];
        let monthget = monthTable[month - 1];

        let pushobj = {
            date: i,
            day: dayget,
            daynum: daynum,
            month: monthget,
            monthnum: month,
            year: year
        }

        if (ignoreWeekEnd) {
            if (daynum != 0 && daynum != 6) {
                resultDates.push(pushobj);
            }
        } else {
            resultDates.push(pushobj);
        }

    }

    //console.log(resultDates);
    return resultDates;
}

//tester
//GenerateDaysofMonth({ month: 12, ignoreWeekEnd: true })

export function GenerateCalendar({ month, year, ignoreWeekEnd = false }) {

    const resultDates = GenerateDaysofMonth({ month: month, year: year });

    let lastMonthData;
    if (month - 1 <= 0) {
        lastMonthData = GenerateDaysofMonth({ month: month + 11, year: resultDates[0].year - 1 });
    } else {
        lastMonthData = GenerateDaysofMonth({ month: month - 1 });
    }

    let nextMonthData;
    if (month + 1 > 12) {
        nextMonthData = GenerateDaysofMonth({ month: 1, year: resultDates[0].year + 1 });
    } else {
        nextMonthData = GenerateDaysofMonth({ month: month + 1 });
    }

    //console.log(lastMonthData[lastMonthData.length - 1]);y
    let prev_add = [];
    let next_add = [];

    if (resultDates[0].daynum > 1 || resultDates[0].daynum == 0) {
        if (ignoreWeekEnd) {

        }
        for (let a = lastMonthData.length - 1; lastMonthData[a].daynum != 0; a--) {
            //console.log(lastMonthData[a]);
            prev_add.push(lastMonthData[a]);
        }
    }

    if (resultDates[resultDates.length - 1].daynum != 0) {
        //console.log(resultDates[resultDates.length - 1]);
        for (let b = 0; nextMonthData[b].daynum != 1; b++) {
            //console.log(nextMonthData[b]);
            next_add.push(nextMonthData[b]);
        }
    }

    let mycalendar = [];
    let weekendFilter = [];

    if (ignoreWeekEnd) {
        for (let e of resultDates) {
            if (e.daynum != 0 && e.daynum != 6) {
                weekendFilter.push(e);
            }
        }
    }

    //console.log(weekendFilter);
    if (prev_add) {
        prev_add.reverse();
        for (let e of prev_add) {
            if (ignoreWeekEnd) {
                if (weekendFilter[0].daynum != 1) {
                    if (e.daynum != 0 && e.daynum != 6) {
                        mycalendar.push(e);
                    }
                }
            } else {
                mycalendar.push(e);
            }
        }
    }

    for (let e of resultDates) {
        if (ignoreWeekEnd) {
            if (e.daynum != 0 && e.daynum != 6) {
                mycalendar.push(e);
            }
        } else {
            mycalendar.push(e);
        }
    }

    if (next_add) {
        for (let e of next_add) {
            if (ignoreWeekEnd) {
                if (e.daynum != 0 && e.daynum != 6) {
                    mycalendar.push(e);
                }
            } else {
                mycalendar.push(e);
            }
        }
    }
    //console.log(next_add);

    // console.log(mycalendar);
    return mycalendar;
}

//GenerateCalendar({ month: 2, ignoreWeekEnd: true })