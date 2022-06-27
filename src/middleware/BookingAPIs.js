const axios = require('axios');

async function stripeCheckout() {

    let StripePayload = { name: 'John Doe', unit_amount: 1000 };
    let NodePayload = {
        salutation: "Mr",
        firstName: "Ryan",
        lastName: "Pan",
        countryCode: "SG",
        phoneNumber: "97511537",
        email: "ryanpantk@gmail.com",
        specialRequests: "have fun",
        paymentStatus: "unpaid",
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
    let resStripe = await axios.post('http://localhost:5000/apis/create-checkout-session', StripePayload);
    let data = resStripe.data;
    let {url, sessionID} = data;
    NodePayload.stripeID = sessionID;
    let resNode = await axios.post('http://localhost:5000/apis/postBooking', NodePayload);
    console.log(data);
    console.log(resNode);
    window.location = url

}

module.exports = {stripeCheckout}