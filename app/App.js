import React, {createContext, useContext, useState} from "react"

const DAYS = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]
function daysInMonth(year, month) {
     return new Date(year, month-1, 0).getDate();
}

const CalenderDateContext = createContext();

const CalenderDateProvider = (props) => {

    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <CalenderDateContext.Provider value={{currentDate, setCurrentDate}}>
            {props.children}
        </CalenderDateContext.Provider>
    )

}

// Search bar
function Calender() {
    // What is this?
    let {currentDate} = useContext(CalenderDateContext);
    console.log(currentDate.toDateString())
    // let currentDate = new Date()
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

    let {currentDate, setCurrentDate} = useContext(CalenderDateContext);
    return (
        <div>
        <button onClick={()=>{
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()-1), 1)
        }}
                className={"prev-month-button"}>Prev</button>
        <p>
            {dateString}
        </p>
            <button onClick = {() => {
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()+1), 1)
            }}
                className={"next-month-button"}>Next</button>
        </div>
    )
}

function CalenderBody(){
    return (
        <table>
            <thead>
                <DaysOfWeekRow/>
            </thead>
            <tbody>
                <DaysOfMonth/>
            </tbody>
        </table>
    )
}
//given a day of the month, find the corresponding day number

function DayButton({day}){
    let {currentDate, setCurrentDate} = useContext(CalenderDateContext);
    return (
        <button onClick={()=>{
            console.log(day)
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
        }}>{day}</button>
    )

}

function DaysOfMonth(){
    let {currentDate} = useContext(CalenderDateContext);
    let currMonth = currentDate.getMonth()
    let currYear = currentDate.getFullYear()
    console.log(`Curr month ${currMonth} curr year ${currYear}`)

    let numOfDays = daysInMonth(currYear, currMonth);
    let firstDay = new Date(currYear, currMonth, 1).getDay()
    let lastDatePrevMonth = new Date(currYear, currMonth-1, 0).getDate() - 1

    let rows = []
    let row =[]

    // Gets the days before the current first day of the month
    for(let prevMonthDay = firstDay; prevMonthDay > 0; prevMonthDay--){
        row.push(
            <th><DayButton day={(lastDatePrevMonth-prevMonthDay).toString()}/></th>
        )
    }
    let currRow = row
    for(let day = 1; day <=numOfDays; day++){
        if(currRow.length === 7){
            rows.push(<tr>{currRow}</tr>);
            currRow = [];
        }
        currRow.push(
            <th><DayButton day={day}/></th>
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
    return(
        <CalenderDateProvider>
         <ClimbingJournalBody />
        </CalenderDateProvider>
    )
}
