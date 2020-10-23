/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function (arr) {
    return ({
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    })
}

let createEmployeeRecords = function(arrOfArr) {
    return arrOfArr.map(function(arr){
        return createEmployeeRecord(arr)
    })
}

let createTimeInEvent = function(date) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.slice(-4)),
        date: date.slice(0, 10)
    })
    return this
}

let createTimeOutEvent = function(date) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.slice(-4)),
        date: date.slice(0, 10)
    })
    return this
}

let hoursWorkedOnDate = function(date) {
    let inEvent = this.timeInEvents.find(function(e) {
        return e.date === date
    })

    let outEvent = this.timeOutEvents.find(function(e) {
        return e.date === date
    })
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(date) {
    return (hoursWorkedOnDate.call(this, date) * this.payPerHour)
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

let calculatePayroll = function(arr) {
    return arr.reduce(function(total, object) {
        return total + allWagesFor.call(object)
    }, 0)
}

let findEmployeeByFirstName= function(arr, firstName) {
    const employee = arr.find(function(e) {
        return e.firstName === firstName
    })
    return employee
}