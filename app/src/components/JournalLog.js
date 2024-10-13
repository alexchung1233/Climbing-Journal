import React, { useEffect, useState } from 'react'
import {
    Form, 
    FormGroup, 
    Label, 
    Input,
    Button,
    Row,
    Col,
} from 'reactstrap'
import { Textarea } from 'flowbite-react';
import PropTypes from 'prop-types'; // ES6
const BE_SERVER_HOST = process.env.SERVER_HOST

const JournalLog= ({journalLog, userId, currentDate}) => {
    console.log(userId);
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
                                    new URL(`/user/${userId}/log/${logId}`, BE_SERVER_HOST),
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
                                    new URL(`/user/${userId}/log`, BE_SERVER_HOST),
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
                    <Label>Session Notes</Label>
                    <Textarea type="textarea" value={notes} required rows={6} onChange={(e)=>{
                        setNotes(e.currentTarget.value);
                    }}></Textarea>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Highest grade</Label>
                            <Textarea placeholder="ex. V4"></Textarea>
                        </FormGroup>

                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Grades sent</Label>
                            <Textarea placeholder="ex. V4,V5"></Textarea>
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