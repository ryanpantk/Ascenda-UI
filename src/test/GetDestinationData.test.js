import GetDestinationData from "../components/HotelDisplay/GetDestinationData.js";

const destination= 'WD0M';
const checkInDate = new Date(2022,7,1);
const checkOutDate = new Date(2022,7,2);
const adults = 2;
const children =0;
const guestNumber = "2";

test('Translating destination data test',()=>{
    const test_data = {destination,checkInDate,checkOutDate,guestNumber};
    expect(GetDestinationData(test_data)).toEqual({destinationID:'WD0M',checkinDate:'2022-08-01',checkoutDate:'2022-08-02',guestNumber:"2",partnerID:"1"})
})