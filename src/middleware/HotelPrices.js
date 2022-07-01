// import { store } from '../store.js'

const axios = require('axios');



// export async function hotePrices() {

//     let hotelPrices = { destination_id: 'WDOM', checkin: '2022-06-18', checkout: '2022-06-19', lang: 'en_US', currency: 'SGD', guests: '1', partner_id: '1', country_code: 'SG'};
//     let resStripe = await axios.post('https://hotelapi.loyalty.dev/api/hotels/diH7 ', hotelPrices)
//     .then ((response) => {
//         name: response.name
//         latitude: response.latitude
//         longitude: response.longitude
        
        


//     });



    
//     let state = store.getState();
//     let NodePayload = {

//         salutation: state.salutation,
//         firstName: state.firstName,
//         lastName: state.lastName,
//         countryCode: state.countryCode,
//         phoneNumber: state.phoneNumber,
//         email: state.email,
//         specialRequests: state.specialRequest,
//         destinationID: "req.body.destinationID",
//         hotelID: "req.body.hotelID",
//         numberOfNights: "req.body.numberOfNights",
//         startDate: "req.body.startDate",
//         endDate: "req.body.endDate",
//         numberOfAdult: "req.body.numberOfAdult",
//         numberOfChild: "req.body.numberOfChild",
//         roomType: "req.body.roomType",
//         averagePrice: "req.body.averagePrice",
//         totalPrice: "req.body.totalPrice"
//     }
//     let data = resStripe.data;
//     let {url, sessionID} = data;
//     NodePayload.stripeID = sessionID;
//     let resNode = await axios.post('http://localhost:5000/apis/postBooking', NodePayload);
//     window.location = url
// }



// }

// let data = axios.get("https://hotelapi.loyalty.dev/api/hotels/diH7");
// console.log(data);


axios
.get("https://hotelapi.loyalty.dev/api/hotels/diH7")
.then(function (response) {
   console.log(JSON.stringify(response.data.name));
});



  


