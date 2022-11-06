import { store } from '../store.js'

const axios = require('axios');

export async function stripeCheckout() {

    let StripePayload = { name: "Hotel", unit_amount: store.getState().roomPrice };
    let resStripe = await axios.post('https://breakable-ray-panama-hat.cyclic.app/apis/create-checkout-session', StripePayload)
    let NodePayload = {
        salutation: store.getState().salutation,
        firstName: store.getState().firstName,
        lastName: store.getState().lastName,
        countryCode: store.getState().countryCode,
        phoneNumber: store.getState().phoneNumber,
        email: store.getState().email,
        specialRequests: store.getState().specialRequest,
        destinationID: store.getState().destinationID,
        hotelID: store.getState().hotelID,
        numberOfRoom: store.getState().NumRoom,
        startDate: store.getState().startDate,
        endDate: store.getState().endDate,
        numberOfAdult: store.getState().NumAdult,
        numberOfChild: store.getState().NumChild,
        roomType: store.getState().roomType,
        totalPrice: store.getState().roomPrice,
        hotelName: store.getState().hotelName,
        roomName: store.getState().roomName,
        url: store.getState().url
    }
    let data = resStripe.data;
    let {url, payment_intent} = data;
    NodePayload.stripeID = payment_intent;
    await axios.post('https://breakable-ray-panama-hat.cyclic.app/apis/postBooking', NodePayload);
    window.location = url;
}

export async function hotelListDetails(payload) {
    const hotelListDetails = await fetch(`https://breakable-ray-panama-hat.cyclic.app/apis/hotelsDetail/${payload}`);
    return hotelListDetails
}

export async function viewBooking(payload) {
    const booking = axios.get("https://breakable-ray-panama-hat.cyclic.app/apis/viewOneBooking/" + payload);
    return booking;
}

export async function deleteInformation(payload) {
    await axios.patch(`https://breakable-ray-panama-hat.cyclic.app/apis//updateOneBooking/${payload}`, {});
}

export async function checkBookingCredentials(payload) {
    const checkBooking = axios.post("https://breakable-ray-panama-hat.cyclic.app/apis/check-booking-credentials", payload);
    return checkBooking;
}