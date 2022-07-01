import JSONDATA from "../destinations.json";

const GetDestinationData = props =>{
    const destinationData = props;
    var destinationID = JSONDATA.filter((val) => {
        if (val.term === destinationData.destination){
            return val.uid
        }
        return null;
    })
    const checkinDate = destinationData.checkInDate;
    const checkoutDate = destinationData.checkOutDate;
    const guestNumber = destinationData.adults+destinationData.children;
    const partnerID = '1' ;

    return({destinationID,checkinDate,checkoutDate,guestNumber,partnerID})
}

export default GetDestinationData;