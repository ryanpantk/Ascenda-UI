import { store } from '../store.js'

const axios = require('axios');

export async function stripeCheckout() {

    let StripePayload = { name: 'John Doe', unit_amount: 1000 };
    let resStripe = await axios.post('http://localhost:5000/apis/create-checkout-session', StripePayload)
    let NodePayload = {
        salutation: store.getState().salutation,
        firstName: store.getState().firstName,
        lastName: store.getState().lastName,
        countryCode: store.getState().countryCode,
        phoneNumber: store.getState().phoneNumber,
        email: store.getState().email,
        specialRequests: store.getState().specialRequest,
        destinationID: store.getState().destinationID,
        hotelID: "req.body.hotelID",
        numberOfRoom: store.getState().NumRoom,
        startDate: store.getState().startDate,
        endDate: store.getState().endDate,
        numberOfAdult: store.getState().NumAdult,
        numberOfChild: store.getState().NumChild,
        roomType: "req.body.roomType",
        averagePrice: "req.body.averagePrice",
        totalPrice: "req.body.totalPrice"
    }
    let data = resStripe.data;
    console.log(data);
    let {url, payment_intent} = data;
    NodePayload.stripeID = payment_intent;
    await axios.post('http://localhost:5000/apis/postBooking', NodePayload);
    window.location = url
}