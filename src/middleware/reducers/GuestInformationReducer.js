export const salutationReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETSALUTATION':
            return action.payload || null;
        default:
            return state;
    }
}

export const firstNameReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETFIRST':
            return action.payload || null;
        default:
            return state;
    }
}

export const lastNameReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETLAST':
            return action.payload || null;
        default:
            return state;
    }
}

export const countryCodeReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETCC':
            return action.payload || null;
        default:
            return state;
    }
}

export const phoneNumberReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETPHONE':
            return action.payload || null;
        default:
            return state;
    }
}

export const emailReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETEMAIL':
            return action.payload || null;
        default:
            return state;
    }
}

export const specialRequestReducer = (state = "", action) => {
    switch(action.type) {
        case 'SETSR':
            return action.payload || state;
        default:
            return state;
    }
}

export const destinationReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETDEST':
            return action.payload || null;
        default:
            return state;
    }
}

export const startDateReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETSTART':
            return action.payload || null;
        default:
            return state;
    }
}

export const endDateReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETEND':
            return action.payload || null;
        default:
            return state;
    }
}

export const NumRoomReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETNUMOFROOM':
            return action.payload || null;
        default:
            return state;
    }
}

export const NumAdultReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETNUMOFADULT':
            return action.payload || null;
        default:
            return state;
    }
}

export const NumChildReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETNUMOFCHILD':
            return action.payload || null;
        default:
            return state;
    }
}

export const RoomTypeReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETRT':
            return action.payload || null;
        default:
            return state;
    }
}


