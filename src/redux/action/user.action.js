import { ADD_USER, REMOVE_USER } from "./actionTypes";

export const addUser = (data) => {
    return{
        type: ADD_USER,
        payload: data
    }
};

export const removeUser = () => {
    return{
        type: REMOVE_USER
    }
};