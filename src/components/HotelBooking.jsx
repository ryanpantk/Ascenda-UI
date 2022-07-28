import { useState, useEffect } from 'react';
import { FlagOutlined, EnvironmentOutlined, BankOutlined, FormOutlined } from '@ant-design/icons';
import { Steps, Card } from 'antd';
import DestinationForm from './DestinationForm.jsx';
import HotelDisplay from './HotelDisplay.jsx';
import HotelRoomDetails from './HotelRoomDetails/HotelRoomDetails.jsx';
import BookingPage from './BookingPage/BookingPage.jsx';
import { store } from '../store.js'
import  { setRoomType } from '../middleware/actions/'

const { Step } = Steps;
const steps = [
  {
    key:0,
    title: 'Select Destination',
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
    maxHeight: "100%"
  },

  cardBody: {
    maxHeight: "100%",
    overflow: "auto",
    height: "100%",
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

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleDestinationSubmit = (data) => {
    setDestinationData(data);
  }

  const [page, setPage] = useState(null);
  useEffect(() => {
    if (destinationData.destination != "placeholder") {
      console.log(destinationData)
      setPage(<HotelDisplay GetHotel={handleHotelSelect} DestinationData={destinationData} />);
      setCurrent(1)
    }
  }, [destinationData]);

  const handleStepperClick = (idx) => {
    if(idx < current){
      setCurrent(idx);
    }
  }

  const handleHotelSelect = (hotel) =>{
    setHotelData(hotel);
    setCurrent(2);
    document.getElementById("scroll").scrollTo({ top: 0, behavior: 'smooth' }) ;
  }

  const handleRoomSelect = (value1, value2) =>{
    store.dispatch(setRoomType(value1));
    //store.dispatch(setRoomPrice(value2))
    setCurrent(3)
    document.getElementById("scroll").scrollTo({ top: 0, behavior: 'smooth' }) ;
  }

  return (
        <Card style={{borderRadius: 10, height:'100%', boxSizing: 'border-box' }} bodyStyle={styles.cardBody}>
          <Steps className="steps-bar modified-steps" current={current} size="small">
            {steps.map((item, idx) => (
              <Step key={item.key} title={item.title} icon={item.icon} onClick={(e) => handleStepperClick(idx)}/>
            ))}
          </Steps>
          <Card class="scroll" className="steps-content" style={{ background: (current===0) ? "url(https://api.vold.dev.fleava.com/pictures/5bfb719fa60b191fb4f81ea1/the_resort/14e7403f-7a95-4b9e-b175-815c3b325c5c.jpg) no-repeat" : "white", backgroundSize:"cover", height:'90%', boxSizing: 'border-box', opacity:1 }} >
            {current === 0 && (
              <DestinationForm onSubmit={handleDestinationSubmit}></DestinationForm>
            )}
            {current === 1 && (
              page
            )}
            {current === 2 && (
              <HotelRoomDetails handleRoomSelect={handleRoomSelect} hotelID={ hotelData.id }/> 
            )}
            {current === 3 && (
              <BookingPage></BookingPage>
            )}
          </Card>
        </Card>
  );
}

export default HotelBooking;