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
import PropTypes from 'prop-types'; // ES6

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
                            console.log("Button clicked")
                            if(journalLog){
                                useEffect(() => {
                                        fetch(
                                            new URL(`/user/${userId}/log/${logId}`, LOCAL_BE_SERVER_HOST),
                                        {
                                            method: 'PATCH',
                                            headers: {
                                                "Content-Type": 'application/json',
                                            },
                                        }).
                                        then((response)=>{return response.json()})
                                        }, []
                                    )
                            }
                        }}>Save</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Highest grade</Label>
                            <Input placeholder="ex. V4"></Input>
                        </FormGroup>

                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Grades sent</Label>
                            <Input placeholder="ex. V4,V5"></Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Label>Session Notes</Label>
                    <Input type="textarea" value={notes} onChange={(e)=>{
                        setNotes(e.currentTarget.value);
                    }}></Input>
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