/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function(array)
{
    const [firstName, familyName, title, payPerHour] = array
    let result = {firstName, familyName, title, payPerHour}
    result.timeInEvents = []
    result.timeOutEvents = []
    return result
}

let createEmployeeRecords = function(arrays)
{
    return arrays.map(function(array){return createEmployeeRecord(array)})
}

let createTimeInEvent = function(datetime)
{
    let dateInfo = datetime.split(" ")
    let event = {}
    event.date = dateInfo[0]
    event.hour = Number(dateInfo[1])
    event.type = 'TimeIn'
    this.timeInEvents.push(event)
    return this
}

let createTimeOutEvent = function(datetime)
{
    let dateInfo = datetime.split(" ")
    let event = {}
    event.date = dateInfo[0]
    event.hour = Number(dateInfo[1])
    event.type = 'TimeOut'
    this.timeOutEvents.push(event)
    return this
}

let hoursWorkedOnDate = function(date)
{
    let inn = this.timeInEvents.find(function(element){return (element.date == date)})
    let out = this.timeOutEvents.find(function(element){return (element.date == date)})
    let inHour = inn.hour/100
    let outHour = out.hour/100
    return outHour - inHour
}

let wagesEarnedOnDate = function(date)
{
    return this.payPerHour * hoursWorkedOnDate.call(this, date)
}

let calculatePayroll = function(arrays)
{
    return arrays.reduce(function(total, record){return total + allWagesFor.call(record)}, 0)
}

let findEmployeeByFirstName = function(arrays, name)
{
    return arrays.find(function(element){return (element.firstName == name)})
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