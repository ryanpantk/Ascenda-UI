import { useState } from 'react';
import { Button, Card, Form, Input, Col, notification, Image, Row } from 'antd';
const axios = require('axios');

let booking = ""

const myStyle={
    height:'100%',
    fontSize:'50px',
    display: 'flex',
    alignItems: 'center'

};

const openNotificationWithIcon = (placement) => {
    notification.error({
      message: `Incomplete`,
      description:
        'Please fill in all required information.',
      placement,
    });
};

const wrongLoginNotification = (placement) => {
    notification.error({
      message: `Your Login Credentials are Incorrect`,
      description:
        'Your booking ID and password can be found from your confirmed booking in your email.',
      placement,
    });
};

const openNotification = (placement) => {
    notification.error({
      message: `Deleted`,
      description:
        "Your Personal Information have been removed from Ascenda's database",
      placement,
    });
};

const triggerNotif = () => openNotificationWithIcon('bottomRight');
const triggerLoginNotif = () => wrongLoginNotification('bottomRight');
const triggerDeleteNotif = () => openNotification('bottomRight');

function validation(values) {
    if (values.password == null || values.bookingID == null) {
        return true;
    }
    return false;
}


export default function DeleteBookingPage(){

    let [check, setCheck] = useState(false);

    let [output, setOutput] = useState({
        "salutation": "NIL",
        "firstName": "NIL",
        "lastName":  "NIL",
        "countryCode":  "NIL",
        "phoneNumber":  "NIL",
        "email":  "NIL",
        "specialRequests":  "NIL",
        "destinationID": "NIL",
        "hotelID": "NIL",
        "bookingID": "NIL",
        "startDate": "NIL",
        "endDate": "NIL",
        "numberOfAdult": "NIL",
        "numberOfChild": "NIL",
        "roomType":"NIL",
        "totalPrice": "NIL",
        "url": "NIL"
    })

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        if (validation(values)) {
             triggerNotif();
         } else {;
            //redux
            booking = values.bookingID;
            let result;
            try {
                result = await axios.post("http://localhost:5000/apis/check-booking-credentials", {bookingID: values.bookingID, password: values.password});
            } catch (error) {
                triggerLoginNotif()
            }
                if (result && result.data && result.data.check === true) {
                booking = values.bookingID;
                setCheck(true)
                const res = await axios.get("http://localhost:5000/apis/viewOneBooking/"+booking);
                setOutput(res.data)
            } 
        }
    };

    async function deletePII() {
        triggerDeleteNotif();
        const result = await axios.patch(`http://localhost:5000/apis//updateOneBooking/${output.bookingID}`, {});
        window.location = "http://localhost:3000/delete-booking" 
    }

    return (
        <div style={{height:"100%", backgroundImage:"url('https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>
            { check===false ?
            <Form style={myStyle} form={form} name="control-hooks" onFinish={onFinish} requiredMark="optional">
                <Col span={8} offset={8}>
                    <Card style={{borderRadius:8, padding:"20px 10px"}}>
                        <Col span={16} offset={4}>
                        <span style={{display:"block", fontWeight: "bold", marginBottom:30, textAlign: "center"}}>View Your Booking</span>
                            <Form.Item name="bookingID" label="Booking ID" required>
                                <Input placeholder="" />
                            </Form.Item>
                            <Form.Item name="password" label="Passwords" required>
                                <Input placeholder="" />
                            </Form.Item>
                            <Button type="primary" shape="default" size="large" htmlType="submit" style={{width: "100%"}}>Show Booking</Button>
                        </Col>
                    </Card>
                </Col>
            </Form>
            :
            <div style= {myStyle}>
                <Col span={8} offset={8}>
                    <Card style={{borderRadius:8, padding:"20px 10px"}}>
                        <Col span={16} offset={4}>
                            <Image 
                                style={{marginBottom:20}}
                                src={output.url}
                                fallback="data:image/png;base64,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"
                            />
                        </Col>
                        <span style={{display:"block", fontWeight: "bold",fontSize: "x-large"}}>{output.hotelName}</span>
                        <span style={{display:"block", fontWeight: "bold",fontSize: "large"}}>{output.roomName}</span>
                        <span style={{display:"block",fontSize: "large", marginTop:20}}>Total Price: ${output.totalPrice}</span>
                        <span style={{display:"block",fontSize: "large"}}>Check-In Date: {output.startDate} </span>
                        <span style={{display:"block",fontSize: "large"}}>Check-Out Date: {output.endDate} </span>
                        <span style={{display:"block",fontSize: "large", marginTop:20}}>Guest Name: {output.firstName} {output.lastName}</span>
                        <span style={{display:"block",fontSize: "large"}}>Phone Number: {output.phoneNumber}</span>
                        <span style={{display:"block",fontSize: "large"}}>Email: {output.email}</span>
                        <span style={{display:"block",fontSize: "large"}}>Number Of Adult: {output.numberOfAdult}</span>
                        <span style={{display:"block",fontSize: "large"}}>Number Of Child: {output.numberOfChild}</span>

                        <Row>
                            <Col span={24} style={{marginTop: 24}}>
                                <Button type="primary" shape="default" size="large" onClick={deletePII} style={{width: "100%"}}>Delete Personal Information</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </div>}
        </div>
    )
}