import HotelRoomDetails from "../components/HotelRoomsPage/HotelRoomDetails";
import fetch from "cross-fetch";
const hotelID = 'lXJq';

const destination = 'RsBU';
const guestNumber = 2;
const checkinDate = '2022-09-04';
const checkoutDate = '2022-09-05'; 

test('GetHotelDetails test',async()=>{
    let payload = {}
    payload.url = `https://hotelapi.loyalty.dev/api/hotels/`
    const res = await fetch(`http://localhost:5000/apis/hotelDetail/${hotelID}`);

    expect(res.status).toEqual(200);
})

test('GetRoomDetails test', async()=>{
    let payload = {}
    payload.url = `https://hotelapi.loyalty.dev/api/hotels/${hotelID}/price?destination_id=${destination}&checkin=${checkinDate}&checkout=${checkoutDate}&lang=en_US&currency=SGD&guests=${guestNumber}&partner_id=1&country_code=SG`

    const res = await fetch("http://localhost:5000/apis/hotelPrice", {
        method: 'POST',
        headers: {'Content-Type':'application/json'}, // this line is important, if this content-type is not set it wont work
        body: JSON.stringify(payload)
    });

    expect(res.status).toEqual(200);
})