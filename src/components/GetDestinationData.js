import moment from 'moment';


const GetDestinationData = props =>{
    const destinationData = props;
    const destinationID = destinationData.destination.uid;
    const checkinDate = moment(destinationData.checkinDate).format('yyyy-MM-DD');
    const checkoutDate = moment(destinationData.checkinDate).format('yyyy-MM-DD');
    const guestNumber = destinationData.adults+destinationData.children;
    const partnerID = '1' ;

    console.log(checkinDate);

    return({destinationID,checkinDate,checkoutDate,guestNumber,partnerID})
}

export default GetDestinationData;

