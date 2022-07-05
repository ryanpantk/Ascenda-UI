import { countryCodeReducer, emailReducer, firstNameReducer, lastNameReducer, phoneNumberReducer, salutationReducer, specialRequestReducer, destinationReducer, startDateReducer, endDateReducer, NumRoomReducer, NumAdultReducer, NumChildReducer } from './GuestInformationReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    //GuestInformationReducers
    destinationID: destinationReducer,
    startDate: startDateReducer,
    endDate: endDateReducer,
    NumRoom: NumRoomReducer,
    NumAdult: NumAdultReducer,
    NumChild: NumChildReducer,
    salutation: salutationReducer,
    firstName: firstNameReducer,
    lastName: lastNameReducer,
    countryCode: countryCodeReducer,
    phoneNumber: phoneNumberReducer,
    email: emailReducer,
    specialRequest: specialRequestReducer
})

export default rootReducer;