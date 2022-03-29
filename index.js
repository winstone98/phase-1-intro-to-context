// Your code here
function createEmployeeRecord(row ){
    let obj = {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return obj
}

function createEmployeeRecords(array){
    return array.map(createEmployeeRecord(row => row))
}