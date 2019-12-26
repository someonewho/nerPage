import React, {Component} from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Col,
    Row,
} from 'reactstrap';

class NoticeContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NoticeList: null
        };
    }

    componentDidMount() {
        this._getNoticeList()
    }

    _getNoticeList = async () => {
        const NoticeList = await this._getNoticeContents();
        this.setState({
            NoticeList: NoticeList
        })
    }

    _getNoticeContents = () => {
        let url = "http://localhost:5000/api/notice/get_content";
        var id=this.props.match.params.id;
        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        })
            .then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => console.log(err))
    }
    
    _renderNoticeTitle = () => {
        return (
            <p>
                <h3>{this.state.NoticeList.title}</h3>
            </p>
        )
    }

    _renderNoticeContent = () => {
        return (
            <p>
                <h5>{this.state.NoticeList.content}</h5>
            </p>
        )
    }

    render() {
        return (
            <div style={{marginTop: "20px"}}>
                <Card>
                    <CardBody>
                        <Row>
                            <Col md={2}>
                                <h3><strong>제목</strong></h3>
                            </Col>
                            <Col>
                                {this.state.NoticeList ? this._renderNoticeTitle() : ("Loading...")}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>
                        <h3><strong>내용</strong></h3>
                    </CardHeader>
                    <CardBody>
                        {this.state.NoticeList ? this._renderNoticeContent() : ("Loading...")}
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default NoticeContent;

