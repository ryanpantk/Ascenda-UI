import HotelBooking from "../components/HotelBooking";
import fetch from "cross-fetch";

const destinationData= {destination:'WD0M',checkinDate:'2022-09-01',checkoutDate:'2022-09-02',guestNumber:2,partnerID:1};

test('API response status test', async()=>{
    let res = await fetch(`http://localhost:5000/apis/hotelsDetail/${destinationData.destination}`);
    expect(res.status).toEqual(200);
})
