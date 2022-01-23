import * as Actions from '../action/actionTypes';

var initialState = {};

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case Actions.ADD_USER:
            const { user } = action.payload
            return {
                ...user
            };
        case Actions.REMOVE_USER:
            return {};
        default: 
            return state;
    }
}

export default userReducer;