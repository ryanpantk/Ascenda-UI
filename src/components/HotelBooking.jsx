import { useState, useEffect, useCallback} from 'react';
import { FlagOutlined, EnvironmentOutlined, BankOutlined, FormOutlined } from '@ant-design/icons';
import { Steps, Card } from 'antd';
import DestinationForm from './DestinationForm.jsx';
import HotelDisplay from './HotelDisplay.jsx';
import HotelRoomDetails from './HotelRoomDetails/HotelRoomDetails.jsx';
import BookingPage from './BookingPage/BookingPage.jsx';
import { store } from '../store.js'
import  { setHotelName, setRoomPrice, setRoomType, setRoomName, setURL } from '../middleware/actions/'

const { Step } = Steps;
const steps = [
  {
    key:0,
    title: 'Pick Destination',
    icon: <FlagOutlined />},
  {
    key:1,
    title: 'Select Hotel',
    icon: <EnvironmentOutlined />  },
  {
    key:2,
    title: 'Select Room',
    icon: <BankOutlined />  },
  {
    key:3,
    title: 'Make Booking',
    icon: <FormOutlined /> },
];

const styles = {
  card: {
    maxHeight: "100%",
    margin: "auto auto",
    display: 'flex'
  },

  cardBody: {
    overflow: "auto",
    width: "100%",
    height: "100%"
  }
};

function HotelBooking() {
  const [current, setCurrent] = useState(0);
  const [destinationData, setDestinationData] = useState( {
    destination: "placeholder",
    checkInDate: "2022-12-30",
    checkOutDate: "2022-12-30",
    rooms: "1",
    adults: "1",
    children: "1"})
  const [hotelData, setHotelData] = useState(null);

  const handleDestinationSubmit = (data) => {
    setDestinationData(data);
  }

  const getDetails = useCallback(async (payload) => {
    let data = await fetch("http://localhost:5000/apis/hotelsDetail", {
      method: 'POST',
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify(payload)
    });
    let response = await data.json()
    setDetails(response)
  }, [])

  const [page, setPage] = useState(null);
  var [details, setDetails] = useState();
  useEffect(() => {
    if (destinationData.destination !== "placeholder") {
      let payload = {}
      payload.url = `https://hotelapi.loyalty.dev/api/hotels?destination_id=${destinationData.destination}`
      getDetails(payload)
    }
  }, [destinationData, getDetails]);

  useEffect(() => {
    if (details != null) {
      setPage(<HotelDisplay GetHotel={handleHotelSelect} DestinationData={destinationData} HotelDetails={details} PageChange={handlePageChange}/>);
      setCurrent(1)
    }
  }, [destinationData, details]);

  const handleStepperClick = (idx) => {
    if(idx < current){
      setCurrent(idx);
    }
  }

  const handleHotelSelect = (hotel) =>{
    store.dispatch(setHotelName(hotel.name));
    setHotelData(hotel);
    setCurrent(2);
    document.getElementsByClassName("scroll")[0].scrollTo({ top: 0, behavior: 'smooth' }) ;
  }

  const handleRoomSelect = (value1, value2, value3, value4) =>{
    store.dispatch(setRoomType(value1));
    store.dispatch(setRoomPrice(value2));
    store.dispatch(setRoomName(value3));
    store.dispatch(setURL(value4));
    document.getElementsByClassName("scroll")[0].scrollTo({ top: 0, behavior: 'smooth' }) ;
    setCurrent(3)
  }

  const handlePageChange = () =>{
    document.getElementsByClassName("scroll")[0].scrollTo({ top: 0, behavior: 'smooth' }) ;
  }
  
  
  return (
      <Card style={{borderRadius: 10, height:'90%', width:'80%', boxSizing: 'border-box', padding:"0px 20px" }} bodyStyle={styles.cardBody}>
        <Steps className="steps-bar modified-steps" current={current} size="small">
          {steps.map((item, idx) => (
            <Step key={item.key} title={item.title} icon={item.icon} onClick={(e) => handleStepperClick(idx)}/>
          ))}
        </Steps>
        <Card  className="scroll steps-content" style={{ background: (current===0) ? "url(https://api.vold.dev.fleava.com/pictures/5bfb719fa60b191fb4f81ea1/the_resort/14e7403f-7a95-4b9e-b175-815c3b325c5c.jpg)" : "white", backgroundSize: 'cover',backgroundRepeat: 'no-repeat', height:'90%', display: "flex",justifyContent: "center",alignItems: (current===0) ? "center" : "flex-start", boxSizing: 'border-box', opacity:1 }} bodyStyle={{width:"100%", display: "flex",justifyContent: "center",alignItems: (current===0) ? "center" : "flex-start"}} >
          {current === 0 && (
            <DestinationForm onSubmit={handleDestinationSubmit} ></DestinationForm>
          )}
          {current === 1 && (
            page
          )}
          {current === 2 && (
            <HotelRoomDetails handleRoomSelect={handleRoomSelect} hotelID={ hotelData.id } hotel= {hotelData}/>
          )}
          {current === 3 && (
            <BookingPage></BookingPage>
          )}
        </Card>
      </Card>
  );
}

export default HotelBooking;