
import React from 'react';

export async function GetHotelList(props){
    const{destinationID,checkinDate,checkoutDate,guestNumber,partnerID}=props;
    

    const priceData = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destinationID}&checkin=${checkinDate}&checkout=${checkoutDate}&guests=${guestNumber}&partner_id=${partnerID}`)
    .then(response => response.json());
    
    const HotelPriceList =priceData.hotels;
    var HotelList = [];

    if (HotelPriceList.length === 0){
        return HotelList;};
    for (const hotel in HotelPriceList){
        let data = await fetch(`https://hotelapi.loyalty.dev/api/hotels/${hotel.id}`)
        .then(response => response.json());
        data["price"]=hotel.price;
        data["searchRank"]=hotel.searchRank;
        HotelList.push(data);
            }
        
    
    return HotelList;
}


//`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destinationID}&checkin=${checkinDate}&checkout=${checkoutDate}&guests=${guestNumber}&partner_id=${partnerID}`
//`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destinationID}`

//'https://hotelapi.loyalty.dev/api/',{method:'GET',headers:{accept:`hotels/prices?destination_id=${destinationID}&checkin=${checkinDate}&checkout=${checkoutDate}&guests=${guestNumber}&partner_id=${partnerID}`}}



