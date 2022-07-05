import './App.css';
import { useState } from 'react';
import DestinationForm from './components/DestinationForm.jsx';
import BookingPage from './components/BookingPage/BookingPage.jsx';
import { Button, message, Steps } from 'antd';
import HotelDisplay from './components/HotelDisplay.jsx';
const { Step } = Steps;
const steps = [
  {
    title: 'Enter Destination',
  },
  {
    title: 'Choose hotel room',
  },
  {
    title: 'hotel room details',
  },
  {
    title: 'Enter Payment Details',
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [destinationData, setDestinationData] = useState(null);
  const [hotelData, setHotelData] = useState(null);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleDestinationSubmit = (data) => {
    setDestinationData(data);
    next();
  }

  const handleStepperClick = (idx) => {
    if(idx < current){
      setCurrent(idx);
    }
  }

  const handleHotelSelect = (hotel) =>{
    setHotelData(hotel);
    next();
  }

  return (
    <>
      <Steps className="steps-bar" current={current}>
        {steps.map((item, idx) => (
          <Step key={item.title} title={item.title} onClick={(e) => handleStepperClick(idx)}/>
        ))}
      </Steps>
      <div className="steps-content">
        {current === 0 && (
          <DestinationForm onSubmit={(e) => handleDestinationSubmit(e)}></DestinationForm>
        )}
        {current === 1 && (
          <HotelDisplay GetHotel={handleHotelSelect} DestinationData={destinationData}/>
        )}
        {current === 2 && (
          <p>HotelDetails</p>
        )}
        {current === 3 && (
          <BookingPage></BookingPage>
        )}
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >Previous</Button>
        )}
      </div>
    </>
  );
}

export default App;
