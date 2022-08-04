import { GetHotelList,CallApi } from '../components/GetHotels';
import fetch from 'cross-fetch';

const {destinationID,checkinDate,checkoutDate,guestNumber,partnerID} = {destinationID:'WD0M',checkinDate:'2022-09-01',checkoutDate:'2022-09-02',guestNumber:2,partnerID:1};

test('API response status test', async()=>{
    let payload = {}
    payload.url = `https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destinationID}&checkin=${checkinDate}&checkout=${checkoutDate}&lang=en_US&currency=SGD&country_code=SG&guests=${guestNumber}&partner_id=${partnerID}`
    const res = await fetch("http://localhost:5000/apis/hotelsPrice", {
        method: 'POST',
        headers: {'Content-Type':'application/json'}, // this line is important, if this content-type is not set it wont work
        body: JSON.stringify(payload)
    });

    expect(res.status).toEqual(200);
    
})

