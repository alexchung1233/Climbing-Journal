import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'; // ES6
import {Formik, FieldArray, Field} from 'formik';
const SERVER_HOST = process.env.SERVER_HOST


function handleJournalLogSubmit(values, logId, userId, currentDate) {
  if(logId){
    fetch(
        new URL(`/user/${userId}/log/${logId}`, SERVER_HOST),
    {
        method: "PATCH",
        body: JSON.stringify({...values}),
        headers: {
            "Content-Type": 'application/json',
        },
    }).
    then((response)=>{return response.json()}).
  catch(e=>{console.log(e)});
}
  else{
    fetch(
        new URL(`/user/${userId}/log`, SERVER_HOST),
    {
        method: "POST",
        body: JSON.stringify({"notes": values.notes, "climbs": values.climbs, "createdAt": currentDate.toISOString()}),
        headers: {
            "Content-Type": 'application/json',
        },
    }).
    then((response)=>{return response.json()}).
    catch(e=>{console.log(e)});
        }  
}

const JournalLog= ({journalLog, userId, currentDate}) => {
    const [logId, setLogId] = useState('')

    useEffect(()=>{
        if(journalLog){
            setLogId(journalLog._id);
        }
        else{
            setLogId('');
        }
    }, [journalLog]);


    return (
        <div>
          <Formik
            initialValues={{ notes: journalLog?.notes || '', climbs: journalLog?.climbs || [{'climb': '', 'description': '', attempts: 0}]}}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setTimeout(() => {
                handleJournalLogSubmit(values, logId, userId, currentDate)
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <button type="submit" disabled={isSubmitting}>
                    Save
                  </button>
                </div>
                <label>Session Notes</label>
                <textarea
                  type="notes"
                  name="notes"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.notes}
                />
                {errors.notes && touched.notes && errors.notes}
                <div>
              <label>Climbs Sent</label>
              <FieldArray name="climbs"
                render={arrayHelpers => (
                <div>
                {values.climbs && values.climbs.length > 0 ? (
                  <div>
                  <label style={{"margin-right": "7.5em"}}>Grade</label>
                  <label style={{"margin-right": "9em"}}>Attempts</label>
                  <label>Description</label>
                  {values.climbs.map((climb, index) => (
                    <div key={index}>
                      <Field name={`climbs.${index}.grade`}/>
                      <Field name={`climbs.${index}.attempts`} className="climb_attempts"/>
                      <Field name={`climbs.${index}.description`} className="climb_description"/>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a climb from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, {"grade": "", "description": "", "attempts": ""})} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))}
                  </div>
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push("")}>
                    Add a Climb(ex. V5)
                  </button>
                )}
              </div>
                )}
              />
             </div>
             </form>
            )} 
          </Formik>
        </div>
    )
}

JournalLog.propTypes = {
    journalLog: PropTypes.object,
    userId: PropTypes.string,
    currentDate: PropTypes.object
}

export default JournalLog