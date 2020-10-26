/* Your Code Here */

/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!

As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
*/

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    
    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    
    return payable
}

// function allWagesFor(empObj) {
//     const datesWorked = empObj.timeInEvents.map(clockIn => clockIn.date)
//     const wages = datesWorked.map(date => wagesEarnedOnDate(empObj, date))
    
//     return wages.reduce((wage, total)=> wage += total)
// }

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(nestedArray) {
    return nestedArray.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(timestamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timestamp.split(" ")[1]),
        date: timestamp.split(" ")[0]
    })
    return this
}
createTimeInEvent()

function createTimeOutEvent(timestamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timestamp.split(" ")[1]),
        date: timestamp.split(" ")[0]
    })
    return this
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(obj => obj["date"] === date)
    const timeOut = this.timeOutEvents.find(obj => obj["date"] === date)
    
    return (timeOut["hour"] - timeIn["hour"]) / 100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this["payPerHour"]
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => employee.firstName === name)
}

function calculatePayroll(employees) {
    return employees.reduce((start, total) => start + allWagesFor.call(total), 0)
}
