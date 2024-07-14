import React from 'react'
import {
    Form, 
    FormGroup, 
    Label, 
    Input,
    Row,
    Col,
} from 'reactstrap'

const JournalLog= () => {
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
                    <Input type="textarea"></Input>
                </Row>
            </Form>
        </div>
    )
}

export default JournalLog