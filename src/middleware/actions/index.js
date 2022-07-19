// Home Page
export const setDest = (item) => {
    return {
        type: 'SETDEST',
        payload: item
    };
};

export const setStartDate = (item) => {
    return {
        type: 'SETSTART',
        payload: item
    };
};

export const setEndDate = (item) => {
    return {
        type: 'SETEND',
        payload: item
    };
};

export const setNumOfRoom = (item) => {
    return {
        type: 'SETNUMOFROOM',
        payload: item
    };
};

export const setNumOfAdult = (item) => {
    return {
        type: 'SETNUMOFADULT',
        payload: item
    };
};

export const setNumOfChild = (item) => {
    return {
        type: 'SETNUMOFCHILD',
        payload: item
    };
};

// Booking Page
export const setFirstName = (item) => {
    return {
        type: 'SETFIRST',
        payload: item
    };
};

export const setLastName = (item) => {
    return {
        type: 'SETLAST',
        payload: item
    };
};

export const setSalutation = (item) => {
    return {
        type: 'SETSALUTATION',
        payload: item
    };
};

export const setCountryCode = (item) => {
    return {
        type: 'SETCC',
        payload: item
    };
};

export const setPhoneNumber= (item) => {
    return {
        type: 'SETPHONE',
        payload: item
    };
};

export const setEmail = (item) => {
    return {
        type: 'SETEMAIL',
        payload: item
    };
};

export const setSpecialRequest = (item) => {
    return {
        type: 'SETSR',
        payload: item
    };
};

export const setRoomType = (item) => {
    return {
        type: 'SETRT',
        payload: item
    };
};