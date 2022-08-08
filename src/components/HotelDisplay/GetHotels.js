const GetHotelList = async (props)=>{
    const{destinationID,checkinDate,checkoutDate,guestNumber,partnerID}=props;

    let payload = {}
    payload.url = `${destinationID}&checkin=${checkinDate}&checkout=${checkoutDate}&lang=en_US&currency=SGD&country_code=SG&guests=${guestNumber}&partner_id=${partnerID}`
    const res = await CallApi(payload);
    const priceData = await res.json();
    return priceData.hotels;
    
}


const CallApi = async (payload)=>{
    const prom = await fetch(`http://localhost:5000/apis/hotelsPrice/${payload.url}`);
    return prom;
}

export {GetHotelList,CallApi};





