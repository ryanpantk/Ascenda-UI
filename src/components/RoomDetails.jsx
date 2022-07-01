import {Button, Card, Col, Row} from 'antd';
import {useState} from "react";


// import { useSelector, useDispatch } from 'react-redux';
const fakeData = {
    
    roomtype: "Suite with Double Bed",
    additionalinfo: "Breakfast included",
    refundstatus: "Refundable",
    hotelName: "Fullerton Hotel Singapore",
    roomType: "Deluxe Plus",
    numberOfRoom: 2,
    numberOfAdult: 2,
    numberOfChildren: 2,
    checkinDate: "10/12/2022",
    checkoutDate: "11/12/2022",
    totalCost: 12.40
}






const RoomDetails = () => {
    let roomtype = "hi"
    
    const axios = require('axios');
    
    // const test = (res) => {
    //     roomtype = res;
    // }

    // const [joke,setJoke] = useState("");
        
    axios
    .get("https://hotelapi.loyalty.dev/api/hotels/diH7")
    .then(function (response) {
        roomtype = response.data.name;
        // test(JSON.stringify(response.data.name));
        // setJoke(response.data.name);
    });



    return (
        <Row>
            <Col span={10} offset={7} style={{marginTop: 16, marginBottom: 16}}>
                <Card title= {<h3> <b> RoomDetails</b></h3>} >
                    <div style={{textAlign: "left"}}>
                        <Row>
                            <span style={{display:"block", fontWeight: "bold",fontSize: "large"}}>{roomtype}</span>
                        </Row>
                        <Row>
                            <Col span={7} offset={0}>
                                <span style={{display:"block", fontWeight: "bold",fontSize: "large"}}>{fakeData.additionalinfo}</span>
                            </Col>
                            <Col span={4} offset={10} >
                                <Button type="primary" shape="default" size="large" style={{borderRadius: 15, width:110}} >Select</Button>
                            </Col>
                            
                        </Row>
                        <Row>
                            <span style={{display:"block", fontWeight: "bold",fontSize: "medium"}}>{fakeData.refundstatus}</span>
                        </Row>
                        <Row>
                            <p style={{display:"block", fontWeight: "bold",fontSize: "medium"}}>${fakeData.totalCost.toFixed(2)}</p>
                        </Row>
                        
                        

                    </div>
                </Card>
            </Col>
        </Row>
    )
}

export default RoomDetails;