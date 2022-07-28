import moment from 'moment';


const GetDestinationData = props =>{
    
    const destinationData = props;
    const destinationID = destinationData.destination;
    const checkinDate = moment(destinationData.checkInDate).format('yyyy-MM-DD');
    const checkoutDate = moment(destinationData.checkOutDate).format('yyyy-MM-DD');
    const guestNumber = destinationData.adults+destinationData.children;
    const partnerID = '1' ;


    return({destinationID,checkinDate,checkoutDate,guestNumber,partnerID})
}

export default GetDestinationData;

