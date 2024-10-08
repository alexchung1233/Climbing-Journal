// Search bar
export function Calender() {
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