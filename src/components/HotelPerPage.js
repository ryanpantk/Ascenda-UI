export async function HotelPerPage(props){
    var hotelListSlice = [];
    const HotelPriceList = props;
    
    if (HotelPriceList.length === 0){
            return hotelListSlice;};
    for (let i=0;i<HotelPriceList.length;i++){
        let hotel = HotelPriceList[i];
        let data = await fetch(`https://hotelapi.loyalty.dev/api/hotels/${hotel.id}`)
        .then(response => response.json());
        data["price"]=hotel.price;
        data["searchRank"]=hotel.searchRank;
        hotelListSlice.push(data);
            }
    return hotelListSlice;
}