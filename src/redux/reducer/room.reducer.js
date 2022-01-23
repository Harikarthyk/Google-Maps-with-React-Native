import * as Actions from '../action/actionTypes';

var initialState = {};

const roomReducer = (state = initialState, action) => {
    switch(action.type){
        case Actions.CREATE_ROOM: 
            var payload = action.payload;
            return {
                ...payload
            };
        case Actions.JOIN_ROOM:
            var payload = action.payload;
            return {
                ...payload
            };
        default: 
            return state;

    }
}

export default roomReducer;
