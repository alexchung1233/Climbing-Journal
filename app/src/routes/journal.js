import React, {createContext, useContext, useState, useEffect} from "react"
import JournalLog from "../components/JournalLog"
import { Navbar, Datepicker } from "flowbite-react"
import { ClimbingJournalContext } from "../ClimbingJournalContext"

const DAYS = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]
const BE_SERVER_HOST = 'http://localhost:8000'
const ClimbingJournalProvider = (props) => {

    var defaultDate = new Date()
    defaultDate.setHours(0,0,0,0)
    const [currentDate, setCurrentDate] = useState(defaultDate);
    const [userId, setUserId] = useState("6693f55bb46c34a555243fd9")
    return (
        <ClimbingJournalContext.Provider value={{currentDate, setCurrentDate, userId, setUserId}}>
            {props.children}
        </ClimbingJournalContext.Provider>
    )

}


// Parent component containing search bar and product table
function ClimbingJournalBody() {

    let {currentDate, setCurrentDate} = useContext(ClimbingJournalContext);
    let {userId} = useContext(ClimbingJournalContext);
    const [journalLogs, setJournalLog] = useState({});
    console.log(`Current date ${currentDate.toISOString()}`)

    // Get the most recent journal log for the day
    useEffect(() => {
        let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1);
        fetch(new URL(`/user/${userId}/logs?start_date=${currentDate.toISOString()}&end_date=${endDate.toISOString()}`, BE_SERVER_HOST)).
        then((response)=>{return response.json()}).
        then((json)=>{setJournalLog(json.logs[0])}).catch(error => {console.log(error)})
        }, [currentDate]
    )
    
    return (
        <div>
            <Datepicker inline onChange={(date)=>{setCurrentDate(date)}}/>
            <h1>{Datepicker.value}</h1>
            <JournalLog journalLog={journalLogs} userId={userId} currentDate={currentDate}/>
        </div>
    );
}

export {ClimbingJournalContext}

export default function JournalPage() {
    return(
        <ClimbingJournalProvider>
            <ClimbingJournalBody />
        </ClimbingJournalProvider>
    )
}
