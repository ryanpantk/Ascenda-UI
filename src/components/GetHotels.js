const GetHotelList = async (props)=>{
    const{destinationID,checkinDate,checkoutDate,guestNumber,partnerID}=props;

    let payload = {}
    payload.url = `https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destinationID}&checkin=${checkinDate}&checkout=${checkoutDate}&lang=en_US&currency=SGD&country_code=SG&guests=${guestNumber}&partner_id=${partnerID}`
    const res = await fetch("http://localhost:5000/apis/hotelsPrice", {
        method: 'POST',
        headers: {'Content-Type':'application/json'}, // this line is important, if this content-type is not set it wont work
        body: JSON.stringify(payload)
    });
    const priceData = await res.json();
    console.log(priceData.hotels)
    return priceData.hotels;
    
}

export {GetHotelList};





