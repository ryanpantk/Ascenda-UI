import {Card, Col, Row} from 'antd';
import { store } from '../../store';

const BookingSummary = () => {
    return (
        <Row>
            <Col span={16} offset={4} style={{marginTop: 16, marginBottom: 16}}>
                <Card title= {<h3> <b> Booking Summary</b></h3>} >
                    <div style={{textAlign: "left"}}>
                        <Row>
                            <span style={{display:"block", fontWeight: "bold",fontSize: "large"}}>{store.getState().hotelName}</span>
                        </Row>
                        <Row>
                            <span style={{display:"block", fontWeight: "bold",fontSize: "medium"}}>{store.getState().roomName}</span>
                        </Row>
                        <Row>
                            <p style={{display:"block", fontWeight: "bold",fontSize: "medium"}}>${store.getState().roomPrice.toFixed(2)}</p>
                        </Row>
                        <Row>
                            <Col span={10} offset={0}>
                                <p><b>Check-in Date:</b> {store.getState().startDate}</p>
                            </Col>
                            <Col span={10} offset={2}>
                                <p><b>Check-out Date:</b> {store.getState().endDate}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7} offset={0}>
                                <p> <b>Number of Room :</b> {store.getState().NumRoom}</p>
                            </Col>
                            <Col span={7} offset={1}>
                                <p><b>Number of Adult:</b> {store.getState().NumAdult}</p>
                            </Col>
                            <Col span={7} offset={1}>
                                <p><b>Number of Children:</b> {store.getState().NumChild}</p>
                            </Col>
                        </Row>

                    </div>
                </Card>
            </Col>
        </Row>
    )
}

export default BookingSummary;