import React, {createContext, useContext, useState, useEffect} from "react"
import { ClimbingJournalContext } from "./ClimbingJournalContext"
import JournalLog from "./components/JournalLog"
import {
    Label, 
    Button
}
    from "reactstrap"

const DAYS = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]
const LOCAL_BE_SERVER_HOST = 'http://localhost:5000'

function daysInMonth(year, month) {
     return new Date(year, month-1, 0).getDate();
}

const ClimbingJournalProvider = (props) => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [userId, setUserId] = useState("6693f55bb46c34a555243fd9")
    return (
        <ClimbingJournalContext.Provider value={{currentDate, setCurrentDate, userId, setUserId}}>
            {props.children}
        </ClimbingJournalContext.Provider>
    )

}

// Search bar
function Calender() {
    // What is this?
    let {currentDate} = useContext(ClimbingJournalContext);
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

    let {currentDate, setCurrentDate} = useContext(ClimbingJournalContext);
    return (
        <div>
        <Button onClick={()=>{
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()-1), 1)
        }}
                className={"prev-month-button"}>Prev</Button>
        <Label>
            {dateString}
        </Label>
            <Button onClick = {() => {
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()+1), 1)
            }}
                className={"next-month-button"}>Next</Button>
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
    let {currentDate, setCurrentDate} = useContext(ClimbingJournalContext);
    return (
        <Button onClick={()=>{
            console.log(day)
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
        }}>{day}</Button>
    )

}

function DaysOfMonth(){
    let {currentDate} = useContext(ClimbingJournalContext);
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


// Parent component containing search bar and product table
function ClimbingJournalBody() {

    let {userId} = useContext(ClimbingJournalContext);
    const [journalLog, setJournalLog] = useState(null);
    useEffect(() => {
        fetch(new URL(`/user/${userId}/logs`, LOCAL_BE_SERVER_HOST)).
        then((response)=>{return response.json()}).
        then((json)=>{setJournalLog(json)})
        }, []
    )
    console.log(journalLog)

    return (
        <div>
            <h1>My Climbing Journal</h1>
            <Calender />
            <JournalLog journalLogData={journalLog}/>
        </div>
    );
}

export {ClimbingJournalContext}

export default function App() {
    return(
        <ClimbingJournalProvider>
        <ClimbingJournalBody />
        </ClimbingJournalProvider>
    )
}
