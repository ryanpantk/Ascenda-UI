
import React from 'react';
//import destinationData from './GetDestinationData.js';


/*const destinationID = destinationData.id;
const checkinDate = destinationData.checkInDate;
const checkoutDate = destinationData.checkOutDate;
const guestNumber = destinationData.adults+destinationData.children;
const partnerID = '1';

//const currency
//const lang

async function GetHotelPriceList(){
    const data = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destinationID}&checkin=${checkinDate}&checkout=${checkoutDate}&guests=${guestNumber}&partner_id=${partnerID}`)
    .then(response => response.json());
    
    const HotelPriceList = data.hotels;
    return HotelPriceList;
        }*/
    


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









