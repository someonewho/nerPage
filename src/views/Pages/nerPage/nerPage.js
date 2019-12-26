import React, {Component} from 'react';
import {
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    Row,
    Table
} from 'reactstrap';
import Button from "@material-ui/core/Button";

class nerPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            output: {1: 'this', 2: 'is', 3: 'the', 4: 'output', 5: 'state'},
        }
    }

    _renderOutputTable = () => {
        // console.log('Object.entries')
        // console.log(
        //     Object.entries(this.state.output)
        // )
        const render = Object.entries(this.state.output).map((token, _id) => {
            return (
                <tr>
                    <td>{token[0]}</td>
                    <td>{token[1]}</td>
                </tr>
            );
        })
        return render
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        this._getOutput().then(r =>{
            this.setState({
                output: {1: "Correct", 2: "output!"},
            })
        })
    }

    _getOutput = async () => {
        const output = await this._callApi()
        this.setState({
            output: output,
        })
    }
    _callApi = () => {
        let url = "http://localhost:5000/"
        let input = this.state.input

        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({input: input})
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                return data
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form>
                                            <h2 style={{marginBottom: "5%"}}>Named Entity Recognition</h2>
                                            <InputGroup className="mb-3">
                                                <Input type="text" name="input" onChange={this.handleChange}
                                                       placeholder="input" autoComplete="input"/>
                                            </InputGroup>
                                            <Row>
                                                <Col>
                                                    <Button variant="contained"
                                                            size="large"
                                                            color="primary"
                                                            style={{marginTop: "5px", marginBottom: "10px"}}
                                                            onClick={this.handleSubmit}>
                                                        submit
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                    <CardBody>
                                        <h2 style={{marginBottom: "5%"}}>output</h2>
                                        <Table striped>
                                            <thead>
                                            <tr>
                                                <th>token</th>
                                                <th>value</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this._renderOutputTable()}
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default nerPage;
