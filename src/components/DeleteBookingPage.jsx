import { useState } from 'react';
import {Button, Card} from 'antd';

function generateOTP(){
    let digits = '0123456789';
    var OTP = '';
    for(var i = 0; i < 6; i++){
        OTP += digits[Math.floor(Math.random()*10)];
    }
    console.log(OTP);
    return parseInt(OTP);
}

const styles = {
    card: {
        maxHeight: "100%"
    },

    cardBody: {
        maxHeight: "100%",
        overflow: "auto",
        height: "100%",
    }
};

export default function DeleteBookingPage(){
    const [state, setState] = useState("Get Booking ID");
    const [OTP, setOTP] = useState(0);

    const newOTP = () => {
        setOTP(generateOTP());
    }

    return (
        <Card style={{borderRadius: 10, height:'100%', boxSizing: 'border-box' }} bodyStyle={styles.cardBody}>
            
        </Card>
    )
}