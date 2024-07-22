import React from 'react'
import {
    Form, 
    FormGroup, 
    Label, 
    Input,
    Row,
    Col,
} from 'reactstrap'
import PropTypes from 'prop-types'; // ES6

const JournalLog= ({journalLogs}) => {
    var notes = ''

    if(journalLogs){
        notes = journalLogs[0]["notes"]
        console.log(journalLogs);
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
                    <Label>Session Notes</Label>
                    <Input type="textarea" defaultValue={notes}></Input>
                </Row>
            </Form>
        </div>
    )
}

JournalLog.propTypes = {
    journalLogs: PropTypes.object
}

export default JournalLog