import {Card, Col, Row} from 'antd';

import { useSelector } from 'react-redux';

const fakeData = {
    hotelName: "Fullerton Hotel Singapore",
    roomType: "Deluxe Plus",
    numberOfRoom: 2,
    numberOfAdult: 2,
    numberOfChildren: 2,
    checkinDate: "10/12/2022",
    checkoutDate: "11/12/2022",
    totalCost: 12.40
}

const BookingSummary = () => {
    return (
        <Row>
            <Col span={10} offset={7} style={{marginTop: 16, marginBottom: 16}}>
                <Card title= {<h3> <b> Booking Summary</b></h3>} >
                    <div style={{textAlign: "left"}}>
                        <Row>
                            <span style={{display:"block", fontWeight: "bold",fontSize: "large"}}>{fakeData.hotelName}</span>
                        </Row>
                        <Row>
                            <span style={{display:"block", fontWeight: "bold",fontSize: "medium"}}>{fakeData.roomType}</span>
                        </Row>
                        <Row>
                            <p style={{display:"block", fontWeight: "bold",fontSize: "medium"}}>${fakeData.totalCost.toFixed(2)}</p>
                        </Row>
                        <Row>
                            <Col span={7} offset={0}>
                                <p> <b>Number of Room :</b> {fakeData.numberOfRoom}</p>
                            </Col>
                            <Col span={7} offset={1}>
                                <p><b>Number of Adult:</b> {fakeData.numberOfAdult}</p>
                            </Col>
                            <Col span={7} offset={1}>
                                <p><b>Number of Children:</b> {fakeData.numberOfChildren}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7} offset={0}>
                                <p><b>Check-in Date:</b> {fakeData.checkinDate}</p>
                            </Col>
                            <Col span={7} offset={1}>
                                <p><b>Check-out Date:</b> {fakeData.checkoutDate}</p>
                            </Col>
                        </Row>

                    </div>
                </Card>
            </Col>
        </Row>
    )
}

export default BookingSummary;