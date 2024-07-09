import React from "react"

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
    console.log(`Num of days ${numOfDays}`)
    let firstDay = new Date(currYear, currMonth, 1).getDay()
    console.log(`First day of month ${firstDay}`)
    let lastDatePrevMonth = new Date(currYear, currMonth-1, 0).getDate() - 1

    console.log(lastDatePrevMonth)
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

function DaysOfWeekRow(){
    let column_days = []
    for (const day of DAYS) {
        column_days.push(
            <th>{day}</th>
        )
    }

    return (
        <tr>{column_days}</tr>
    )

}

// Parent component containing search bar and product table
function GymJournalBody({ products }) {
    return (
        <div>
            <Calender />
        </div>
    );
}

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

const MONTHS = ["January", "February", "March", "April", "May", "June"
, "July", "August", "September", "October", "November", "December"
]

const DAYS = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]
export default function App() {
    return <GymJournalBody products={PRODUCTS} />;
}
