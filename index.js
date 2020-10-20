// creates and returns an employee record object
function createEmployeeRecord(arr) {
  const employee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}

// creates and returns employee record objects, using an array of arrays
function createEmployeeRecords(nestedArr) {
  return nestedArr.map(arr => createEmployeeRecord(arr))
}

// takes a date stamp and updates the employee record with that date
function createTimeInEvent(stamp) {
  let d = stamp.split(" ")[0]
  let h = parseInt(stamp.split(" ")[1])

  this.timeInEvents.push( {type: "TimeIn", hour: h, date: d} )

  return this
}

// takes a date stamp and updates the employee record with that date
function createTimeOutEvent(stamp) {
  let d = stamp.split(" ")[0]
  let h = parseInt(stamp.split(" ")[1])

  this.timeOutEvents.push( {type: "TimeOut", hour: h, date: d} )

  return this
}

// takes a date stamp and returns the employee's hours worked on that date
function hoursWorkedOnDate(stamp) {
  let timeInObj = this.timeInEvents.find(element => element.date == stamp)
  let timeOutObj = this.timeOutEvents.find(element => element.date == stamp)

  return ((timeOutObj.hour - timeInObj.hour) / 100)
}

// takes a date stamp and returns the employee's pay for that date
function wagesEarnedOnDate(stamp) {
  return this.payPerHour * hoursWorkedOnDate.call(this, stamp)
}

// takes an array of employee objects
// returns the matching employee record or undefined if not found
function findEmployeeByFirstName(arr, name) {
  return arr.find(employee => employee.firstName === name)
}

// takes an array of employee records
// returns sum of all-time wages for all of those employees
function calculatePayroll(arr) {
  return arr.reduce( (tot, employee) => (allWagesFor.call(employee) + tot), 0  )
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
