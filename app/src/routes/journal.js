import React, {useContext, useState, useEffect} from "react"
import JournalLog from "../components/JournalLog"
import { useAuth } from "@clerk/clerk-react"
import { Datepicker } from "flowbite-react"
import { ClimbingJournalContext } from "../ClimbingJournalContext"

const BE_SERVER_HOST = process.env.SERVER_HOST
const ClimbingJournalProvider = (props) => {

    var defaultDate = new Date()
    defaultDate.setHours(0,0,0,0)
    const [currentDate, setCurrentDate] = useState(defaultDate);
    const [apiUserId, setApiUserId] = useState(null)
    return (
        <ClimbingJournalContext.Provider value={{currentDate, setCurrentDate, apiUserId, setApiUserId}}>
            {props.children}
        </ClimbingJournalContext.Provider>
    )

}


// Parent component containing search bar and product table
function ClimbingJournalBody() {

    const { userId, isLoaded } = useAuth()
    let {apiUserId, setApiUserId} = useContext(ClimbingJournalContext);
    useEffect(() => {
        if (isLoaded && !userId) {
          navigate('/sign-in')
        }
      }, [isLoaded])

    if (!isLoaded) return 'Loading...'
    if (userId) {
       fetch(new URL(`/user/auth_user/${userId}`, BE_SERVER_HOST)).
        then((response)=>{return response.json()}).
        then((json)=>{setApiUserId(json._id)}).catch(error => {console.log(error)})
    }
    let {currentDate, setCurrentDate} = useContext(ClimbingJournalContext);
    const [journalLogs, setJournalLog] = useState({});
    console.log(`Current date ${currentDate.toISOString()}`)

    // Get the most recent journal log for the day
    useEffect(() => {
        if(apiUserId){
            let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1);
            fetch(new URL(`/user/${apiUserId}/logs?start_date=${currentDate.toISOString()}&end_date=${endDate.toISOString()}`, BE_SERVER_HOST)).
            then((response)=>{return response.json()}).
            then((json)=>{setJournalLog(json.logs[0])}).catch(error => {console.log(error)})
            }
        }, [currentDate, apiUserId]
    )

    
    return (
        <div>
            <Datepicker inline onChange={(date)=>{setCurrentDate(date)}}/>
            <h1>{Datepicker.value}</h1>
            <JournalLog journalLog={journalLogs} userId={apiUserId} currentDate={currentDate}/>
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
