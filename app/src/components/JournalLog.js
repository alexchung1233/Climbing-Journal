import React, { useEffect, useState } from 'react'
import {
    Form, 
    FormGroup, 
    Label, 
    Button,
    Row,
    Col,
} from 'reactstrap'
import { Flowbite, Textarea } from 'flowbite-react';
import PropTypes from 'prop-types'; // ES6
const SERVER_HOST = process.env.SERVER_HOST

const JournalLog= ({journalLog, userId, currentDate}) => {
    const [notes, setNotes] = useState('')
    const [logId, setLogId] = useState('')

    useEffect(()=>{
        if(journalLog){
            setNotes(journalLog.notes);
            setLogId(journalLog._id);
        }
        else{
            setNotes('');
            setLogId('');
        }
    }, [journalLog]);


    return (
        <div>
            <Form>
                <Row>
                    <Col>
                        <Button onClick={(e) => {
                            if(journalLog){
                                fetch(
                                    new URL(`/user/${userId}/log/${logId}`, SERVER_HOST),
                                {
                                    method: "PATCH",
                                    body: JSON.stringify({"notes": notes}),
                                    headers: {
                                        "Content-Type": 'application/json',
                                        "Accept": '*/*'
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
                                    body: JSON.stringify({"notes": notes, "createdAt": currentDate.toISOString()}),
                                    headers: {
                                        "Content-Type": 'application/json',
                                        "Accept": '*/*'
                                    },
                                }).
                                then((response)=>{return response.json()}).
                                catch(e=>{console.log(e)});
                            }                                    
                        }}>Save</Button>
                    </Col>
                </Row>
                <Row>
                    <label>Session Notes</label>
                    <textarea type="textarea" value={notes} required rows={6} onChange={(e)=>{
                        setNotes(e.currentTarget.value);
                    }}></textarea>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <label>Highest grade</label>
                            <textarea placeholder="ex. V4"></textarea>
                        </FormGroup>

                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <label>Grades sent</label>
                            <textarea placeholder="ex. V4,V5"></textarea>
                        </FormGroup>
                    </Col>
                </Row>

            </Form>
        </div>
    )
}

JournalLog.propTypes = {
    journalLog: PropTypes.object,
    userId: PropTypes.string,
    currentDate: PropTypes.object
}

export default JournalLog