import React, {createContext, useContext, useState, useEffect} from "react"
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
    let {currentDate, setCurrentDate} = useContext(CalenderDateContext);
    return (
        <Button onClick={()=>{
            console.log(day)
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
        }}>{day}</Button>
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
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/journal-logs',{
            headers: {
                'Access-Control-Request-Method': 'GET'
            }
        })
        .then((response) => response.json()).then((json) =>
             {setData(json);console.log(json)}).catch((error) => console.log(error))
    }, []);

    return (
        <div>
            <p>Session Notes</p>
            <form>
                <input type="text" defaultValue={JSON.stringify(data)}></input>
            </form>
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
