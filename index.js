// pry = require('pryjs') // Learn does not work with this uncommented
 
let createEmployeeRecord = function(emp){
    return {
        firstName: emp[0],
        familyName: emp[1],
        title: emp[2],
        payPerHour: emp[3],
        timeInEvents: [],
        timeOutEvents: []
    }
 }
  
 let createEmployeeRecords = function(employees) {
    return employees.map(function(employee) {
        // eval(pry.it) Why does pry not iterate through?
        return createEmployeeRecord(employee)
    })
 }
  
  
 let createTimeInEvent = function(dateStamp) {
    let timeIn = {
        type: "TimeIn",
        date: dateStamp.split(" ")[0],
        hour: Number(dateStamp.split(" ")[1])
    }
    this.timeInEvents.push(timeIn)
    return this
 }
  
 let createTimeOutEvent = function(dateStamp) {
    let timeOut = {
        type: "TimeOut",
        date: dateStamp.split(" ")[0],
        hour: Number(dateStamp.split(" ")[1])
    }
    this.timeOutEvents.push(timeOut)
    return this
 }
  
 let hoursWorkedOnDate = function(targetDate) {
    let timeIn = this.timeInEvents.find(timeInEvent => timeInEvent.date === targetDate)
    let timeOut = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date === targetDate)
    return (timeOut.hour - timeIn.hour) / 100
 }
  
 let wagesEarnedOnDate = function(targetDate) {
    return this.payPerHour * hoursWorkedOnDate.call(this, targetDate)
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

 let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(employee) {
        return employee.firstName === firstName
    })
 }
  
 let calculatePayroll = function(employees) {
     let totalWages = employees.reduce(function(wagesCollect, employee) {
        return wagesCollect + allWagesFor.call(employee)
    }, 0)
    return totalWages
 }
 