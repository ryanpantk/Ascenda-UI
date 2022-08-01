export async function HotelPerPage(props, HotelDetails){
    var hotelListSlice = [];
    const HotelPriceList = props;
    
    if (HotelPriceList.length === 0){
            return hotelListSlice;};
    for (let i=0;i<HotelPriceList.length;i++){
        let hotel = HotelPriceList[i];
        let data = HotelDetails.find(item => item.id === hotel.id);
        data["price"]=hotel.lowest_price ;
        data["searchRank"]=hotel.searchRank;
        data["rooms"]=hotel.rooms
        hotelListSlice.push(data);
    }
    return hotelListSlice;
}