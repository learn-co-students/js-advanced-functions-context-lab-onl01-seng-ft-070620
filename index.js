/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(arr) {
    let emp = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return emp
}

function createEmployeeRecords(arr) {
    return arr.map(emp => {
        return createEmployeeRecord(emp)
    })
}

function createTimeInEvent(stamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(stamp.split(" ")[1]),
        date: stamp.split(" ")[0]
    });
    return this;
}

function createTimeOutEvent(stamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(stamp.split(" ")[1]),
        date: stamp.split(" ")[0]
    });
    return this;
}

function hoursWorkedOnDate(targetDate) {
    let outEvent = this.timeOutEvents.find(e => e.date === targetDate);
    let inEvent = this.timeInEvents.find(e => e.date === targetDate);
    return (outEvent.hour - inEvent.hour)/100;
}

function wagesEarnedOnDate(targetDate) {
    // why doesnt this work as 'this.hoursWorkedOnDate()' ?
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour
}

// function allWagesFor() {
//     dateArr = this.timeInEvents.map(function(event, i) {
//         return event.date;
//     })
//     return dateArr.reduce(function(agg, current) {
//         agg += this.wagesEarnedOnDate(current)
//     }, 0)
// }

function calculatePayroll(empArr) {
    return empArr.reduce(function(agg, current) {
        return agg += allWagesFor.call(current)   
    }, 0)
}

function findEmployeeByFirstName(arr, str) {
    return arr.find(e => e.firstName === str)
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}