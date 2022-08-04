import GuestInformationModal from './../components/BookingPage/GuestInformationModal';

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^\S+@\S+\.\S+$/
      );
  };
  
  const validatePhone = (phone) => {
    return /^\d+$/.test(phone)
  }

function validation(values) {
    if (values.salutation == null || values.firstName == null || values.lastName == null|| values.countryCode == null|| values.phoneNumber == null|| values.email == null) {
        return true;
    } 
    if (!validatePhone(values.phoneNumber)) {
        return true;
    }
    if (!validateEmail(values.email)) {
        return true;
    }
    return false;
}

const values = {salutation:'Mr.',firstName:'X',lastName:'Y',countryCode:'123',phoneNumber:'87654321',email:'xyhahaha@gmail.com'}

test('Expected value test',()=>{
    expect(validation(values)).toBeFalsy();
})

test('Null value test',()=>{
    let case1 = values;
    case1.salutation = null;
    expect(validation(case1)).toBeTruthy();

    let case2 = values;
    case2.firstName = null;
    expect(validation(case2)).toBeTruthy();

    let case3 = values;
    case3.lastName = null;
    expect(validation(case3)).toBeTruthy();

    let case4 = values;
    case4.countryCode = null;
    expect(validation(case4)).toBeTruthy();

    let case5 = values;
    case5.phoneNumber = null;
    expect(validation(case5)).toBeTruthy();

    let case6 = values;
    case6.email = null;
    expect(validation(case6)).toBeTruthy();
})

test('Invalid value test',()=>{
    let case1 = values;
    case1.phoneNumber = 'invalid_phone_number'
    expect(validation(case1)).toBeTruthy();

    let case2 = values;
    case2.email = 'invalid_email_address'
    expect(validation(case2)).toBeTruthy();
})