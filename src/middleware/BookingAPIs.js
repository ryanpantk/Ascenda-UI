import { store } from '../store.js'

const axios = require('axios');

export async function stripeCheckout() {

    let StripePayload = { name: 'John Doe', unit_amount: 1000 };
    let resStripe = await axios.post('http://localhost:5000/apis/create-checkout-session', StripePayload);
    let state = store.getState();
    let NodePayload = {
        salutation: state.salutation,
        firstName: state.firstName,
        lastName: state.lastName,
        countryCode: state.countryCode,
        phoneNumber: state.phoneNumber,
        email: state.email,
        specialRequests: state.specialRequest,
        destinationID: "req.body.destinationID",
        hotelID: "req.body.hotelID",
        numberOfNights: "req.body.numberOfNights",
        startDate: "req.body.startDate",
        endDate: "req.body.endDate",
        numberOfAdult: "req.body.numberOfAdult",
        numberOfChild: "req.body.numberOfChild",
        roomType: "req.body.roomType",
        averagePrice: "req.body.averagePrice",
        totalPrice: "req.body.totalPrice"
    }
    let data = resStripe.data;
    let {url, sessionID} = data;
    NodePayload.stripeID = sessionID;
    let resNode = await axios.post('http://localhost:5000/apis/postBooking', NodePayload);
    window.location = url
}