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

