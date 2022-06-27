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