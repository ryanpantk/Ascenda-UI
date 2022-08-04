import HotelBooking from "../components/HotelBooking";
import fetch from "cross-fetch";

const destinationData= {destination:'WD0M',checkinDate:'2022-09-01',checkoutDate:'2022-09-02',guestNumber:2,partnerID:1};
let payload = {};
payload.url = `https://hotelapi.loyalty.dev/api/hotels?destination_id=${destinationData.destination}`;

test('API response status test', async()=>{
    let res = await fetch("http://localhost:5000/apis/hotelsDetail", {
      method: 'POST',
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify(payload)
    });
    expect(res.status).toEqual(200);
})
