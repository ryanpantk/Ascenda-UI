import { countryCodeReducer, emailReducer, firstNameReducer, lastNameReducer, phoneNumberReducer, salutationReducer, specialRequestReducer } from './GuestInformationReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    //GuestInformationReducers
    salutation: salutationReducer,
    firstName: firstNameReducer,
    lastName: lastNameReducer,
    countryCode: countryCodeReducer,
    phoneNumber: phoneNumberReducer,
    email: emailReducer,
    specialRequest: specialRequestReducer
})

export default rootReducer;