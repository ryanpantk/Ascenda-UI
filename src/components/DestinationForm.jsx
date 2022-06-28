import { useState } from "react";
import DatePicker from "react-datepicker";
import DestinationSearchBar from "./DestinationSearchBar";

import "react-datepicker/dist/react-datepicker.css";

const DestinationForm = () => {
    const [destination, setDestination] = useState('Destination or Hotel');
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(destination);
        console.log(checkInDate);
        console.log(checkOutDate);
        console.log(rooms);
        console.log(adults);
        console.log(children);
    };

    return (
        <div className="destinationForm">
            <h2>Please enter booking details</h2>
            <form onSubmit={handleSubmit}>
                <label>Destination or Hotel</label>
                <DestinationSearchBar
                    onChange={(e) => setDestination(e)}
                ></DestinationSearchBar>
                <label>Check-In</label>
                <DatePicker
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    selectsStart
                    startDate={checkInDate}
                    dateFormat='dd/MM/yy'
                ></DatePicker>
                <label>Check-Out</label>
                <DatePicker
                    selected={Math.max(checkInDate, checkOutDate)}
                    onChange={(date) => setCheckOutDate(date)}
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={checkInDate}
                    dateFormat='dd/MM/yy'
                ></DatePicker>
                <label>Rooms</label>
                <input
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                ></input>
                <label>Adults</label>
                <input
                    type="number"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                ></input>
                <label>Children</label>
                <input
                    type="number"
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                ></input>
                <button type="submit" className="submitButton">Search Hotels</button>
            </form>
        </div>
    );
}

export default DestinationForm;