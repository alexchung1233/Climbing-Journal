import React, {useContext, useState, useEffect} from "react"
import JournalLog from "../components/JournalLog"
import { useAuth } from "@clerk/clerk-react"
import { Datepicker } from "flowbite-react"
import { useNavigate } from "react-router-dom"
import { ClimbingJournalContext } from "../ClimbingJournalContext"

const SERVER_HOST = process.env.SERVER_HOST
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
    const navigate = useNavigate();

    const { userId, isLoaded, getToken } = useAuth()
    let {apiUserId, setApiUserId} = useContext(ClimbingJournalContext);
    useEffect(() => {
        if (isLoaded && !userId) {
          navigate('/sign-in')
        }
      }, [isLoaded])

    if (!isLoaded) return 'Loading...'
    if (userId) {
       fetch(new URL(`/user/auth_user/${userId}`, SERVER_HOST)).
        then((response)=>{return response.json()}).
        then((json)=>{setApiUserId(json._id)}).catch(error => {navigate('/')})
    }    
    let {currentDate, setCurrentDate} = useContext(ClimbingJournalContext);
    const [journalLog, setJournalLog] = useState({});
    console.log(`Current date ${currentDate.toISOString()}`)

    // Get the most recent journal log for the day
    useEffect(() => {
        if(apiUserId){
            let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1);
            fetch(new URL(`/user/${apiUserId}/logs?start_date=${currentDate.toISOString()}&end_date=${endDate.toISOString()}`, SERVER_HOST)).
            then((response)=>{return response.json()}).
            then((json)=>{setJournalLog(json.logs[0])}).catch(error => {console.log(error)})
            }
        }, [currentDate, apiUserId]
    )
    
    if(apiUserId){
        return (
            <div className="journalBodyDiv">
                <Datepicker className ="text-lg" inline onChange={(date)=>{
                    date.setHours(0,0,0,0);
                    setCurrentDate(date);
                    }}/>
                <JournalLog journalLog={journalLog} userId={apiUserId} currentDate={currentDate}/>
            </div>
        );
    }   
    else{
        navigate("/");
    }
}

export {ClimbingJournalContext}

export default function JournalPage() {
    return(
        <ClimbingJournalProvider>
            <ClimbingJournalBody />
        </ClimbingJournalProvider>
    )
}
