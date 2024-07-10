import React from "react"

const DAYS = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]
function daysInMonth(year, month) {
     return new Date(year, month-1, 0).getDate();
}

// Search bar
function Calender() {

    let currentDate = new Date()
    return (
        <div>
            <CurrentDateTitle dateString={currentDate.toDateString()}/>
            <CalenderBody currMonth={currentDate.getMonth()}
                          currYear={currentDate.getFullYear()}/>
        </div>
    );
}

function CurrentDateTitle({dateString}){
    console.log(`Current month ${dateString}`)
    return (
        <p>
            {dateString}
        </p>
    )
}

function CalenderBody({currMonth, currYear}){
    return (
        <table>
            <thead>
                <DaysOfWeekRow/>
            </thead>
            <tbody>
                <DaysOfMonth currMonth={currMonth} currYear={currYear}/>
            </tbody>
        </table>
    )
}
//given a day of the month, find the corresponding day number


function DaysOfMonth({currMonth, currYear}){
    console.log(`Curr month ${currMonth} curr year ${currYear}`)

    let numOfDays = daysInMonth(currYear, currMonth);
    let firstDay = new Date(currYear, currMonth, 1).getDay()
    let lastDatePrevMonth = new Date(currYear, currMonth-1, 0).getDate() - 1

    let rows = []
    let row =[]

    // Gets the days before the current first day of the month
    for(let prevMonthDay = firstDay; prevMonthDay > 0; prevMonthDay--){
        row.push(
            <th><button>{(lastDatePrevMonth-prevMonthDay).toString()}</button></th>
        )
    }
    let currRow = row
    for(let day = 1; day <=numOfDays; day++){
        if(currRow.length === 7){
            rows.push(<tr>{currRow}</tr>);
            currRow = [];
        }
        currRow.push(
            <th><button>{(day).toString()}</button></th>
        )
    }

    rows.push(<tr>{currRow}</tr>);


    return rows
}

function DaysOfWeekRow() {
    let column_days = []
    for (const day of DAYS) {
        column_days.push(
            <th key={day}>{day}</th>
        )
    }

    return (
        <tr>{column_days}</tr>
    )
}
function JournalLogNotes() {
    return (
        <div>
            <p>Session Notes</p>
            <form>
                <input type="text"></input>
            </form>
        </div>

    )

}

function JournalGradeNotes() {
    return (
        <div>
            <p>Highest grade </p>
            <form>
                <input type="text"></input>
            </form>

            <p>Grade total </p>
            <form>
                <input type="text"></input>
            </form>
        </div>
    )
}

function JournalLog() {
    return (
        <div>
            <JournalGradeNotes/>
            <JournalLogNotes/>
        </div>
    )
}


// Parent component containing search bar and product table
function ClimbingJournalBody() {
    return (
        <div>
            <h1>My Climbing Journal</h1>
            <Calender />
            <JournalLog />
        </div>
    );
}


export default function App() {
    return <ClimbingJournalBody />;
}
