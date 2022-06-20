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

function createEmployeeRecords(array) {
    let records = []
    array.forEach((innerArray) => {
        records.push(createEmployeeRecord(innerArray))
    })
    return records
}

function createTimeInEvent(employee, time) {
    let dateHourArray = time.split(" ")
    let timeInObject = {
        type: "TimeIn",
        hour: parseInt(dateHourArray[1]),
        date: dateHourArray[0]
    }
    employee.timeInEvents.push(timeInObject)
    return employee
}

function createTimeOutEvent(employee, time) {
    let dateHourArray = time.split(" ")
    let timeOutObject = {
        type: "TimeOut",
        hour: parseInt(dateHourArray[1]),
        date: dateHourArray[0]
    }
    employee.timeOutEvents.push(timeOutObject)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const startObject = employee.timeInEvents.find((object) => object["date"] === date)
    const endObject = employee.timeOutEvents.find((object) => object["date"] === date)

    const hoursWorked = (endObject.hour - startObject.hour) / 100

    return hoursWorked
}

function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date)
    const wages = hours * employee.payPerHour

    return wages
}

function allWagesFor(employee) {
    let matchingDates = []
    for (let i = 0; i < employee.timeInEvents.length; i++) {
        for (let j = 0; j < employee.timeOutEvents.length; j++) {
            if (employee.timeInEvents[i].date === employee.timeOutEvents[j].date) {
                matchingDates.push(employee.timeInEvents[i].date)
            }
        }
    }

    let totalWage = []

    matchingDates.forEach((date) => totalWage.push(wagesEarnedOnDate(employee, date)))

    return totalWage.reduce((previous, current) => previous + current)
}

function calculatePayroll(employees) {
    let totalPayOwed = []

    employees.forEach((employee) => totalPayOwed.push(allWagesFor(employee)))

    return totalPayOwed.reduce((previous, current) => previous + current)
}

