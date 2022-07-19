

const GetHotelList = async (props)=>{
    const{destinationID,checkinDate,checkoutDate,guestNumber,partnerID}=props;
    
    
    const priceData = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destinationID}&checkin=${checkinDate}&checkout=${checkoutDate}&lang=en_US&currency=SGD&country_code=SG&guests=${guestNumber}&partner_id=${partnerID}`)
    .then(response => response.json())
    .catch(err=>console.log(err));
    
    console.log(priceData.completed)
    //console.log(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destinationID}&checkin=${checkinDate}&checkout=${checkoutDate}&lang=en_US&currency=SGD&country_code=SG&guests=${guestNumber}&partner_id=${partnerID}`)
   
    return priceData.hotels;
    
}

export {GetHotelList};





