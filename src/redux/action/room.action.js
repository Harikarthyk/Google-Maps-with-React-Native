import { CREATE_ROOM, JOIN_ROOM } from "./actionTypes";

export const createRoom = (data) => {
    return{
        type: CREATE_ROOM,
        payload: data
    }
};

export const joinRoom = (data) => {
    return{
        type: JOIN_ROOM,
        payload: data
    }
};

