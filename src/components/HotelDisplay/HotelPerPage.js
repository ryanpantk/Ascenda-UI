const sleep = require('util').promisify(setTimeout)

export async function HotelPerPage(props, HotelDetails){
    var hotelListSlice = [];
    var seen = {};
    const HotelPriceList = props.filter(function(item) {
        return seen.hasOwnProperty(item.id) ? false : (seen[item.id] = true);
    });
    
    if (HotelPriceList.length === 0){
            return hotelListSlice;};
    for (let i=0;i<HotelPriceList.length;i++){
        (async () => {
            await sleep(2000)
        })()
        let hotel = HotelPriceList[i];
        let data = HotelDetails.find(item => item.id === hotel.id);
        if (data == null) {     
            let res = await fetch(`http://localhost:5000/apis/hotelDetail/${hotel.id}`);
            data = await res.json();
        }
        if (data != null) {    
            data["price"]=hotel.lowest_price ;
            data["searchRank"]=hotel.searchRank;
            data["rooms"]=hotel.rooms
            hotelListSlice.push(data);
        }
    }
    return hotelListSlice;
}