let createEmployeeRecord = function(empCreds) {
    return {
        firstName: empCreds[0],
        familyName: empCreds[1],
        title: empCreds[2],
        payPerHour: empCreds[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

let sliceHour = function(dateStamp) {
    return parseInt(dateStamp.slice(11))
}

let sliceDate = function(dateStamp) {
    return dateStamp.slice(0, 10)
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

let hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(e => e.date === date).hour
    let timeOut = this.timeOutEvents.find(e => e.date === date).hour
    return (timeOut - timeIn)/100
}

let wagesEarnedOnDate = function(date) {
    return this.payPerHour*hoursWorkedOnDate.call(this, date)
}

let findEmployeeByFirstName = function(employees, firstName) {
    return employees.find(e => e.firstName === firstName)
}

let calculatePayroll = function(employees) {
    return employees.reduce(function(totalPayroll, employee) {
        return allWagesFor.call(employee)+totalPayroll
    }.bind(this), 0)
}

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