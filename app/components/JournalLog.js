import React from 'react'
import {
    Form, 
    FormGroup, 
    Label, 
    Input,
    Row,
    Col,
} from 'reactstrap'

const JournalLog= ({journalLogData}) => {
    var notes = ''

    if(journalLogData){
        notes = journalLogData.logs[0]["notes"]
        console.log(journalLogData);
    }

    return (
        <div>
            <Form>
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
                    <Label>Notes</Label>
                    <Input type="textarea" defaultValue={notes}></Input>
                    <p>{notes}</p>
                </Row>
            </Form>
        </div>
    )
}

export default JournalLog