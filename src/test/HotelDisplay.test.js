import HotelDisplay from "../components/HotelDisplay/HotelDisplay.jsx";
import React from 'react';
import renderer from 'react-test-renderer';
require("@babel/core").transformSync("code", {
    presets: ["@babel/preset-react"],
  });


jest.setTimeout(30000);

it('Render empty hotel list', async()=>{
    const destination= {uid:'WD0M'};
    const checkInDate = new Date(2022,6,1);
    const checkOutDate = new Date(2022,6,2);
    const adults = 2;
    const children =0;
    const handleHotelSelect = (props)=>{return null;}
    const destinationData = {destination,checkInDate,checkOutDate,adults,children};
    const details = {};
    const tree = await renderer.create(<HotelDisplay GetHotel={handleHotelSelect} DestinationData={destinationData} HotelDetails={details}/>).toJSON();
    
    expect(tree).toMatchSnapshot();
})
