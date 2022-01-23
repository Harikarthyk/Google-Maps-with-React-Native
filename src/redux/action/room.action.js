import { CREATE_ROOM, JOIN_ROOM } from "./actionTypes";

export const CREATE_ROOM = (data) => {
    return{
        type: CREATE_ROOM,
        payload: data
    }
};

export const JOIN_ROOM = (data) => {
    return{
        type: JOIN_ROOM,
        payload: data
    }
};

