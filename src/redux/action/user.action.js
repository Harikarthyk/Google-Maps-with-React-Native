import { ADD_USER, REMOVE_USER } from "./actionTypes";

export const ADD_USER = (data) => {
    return{
        type: ADD_USER,
        payload: data
    }
};

export const REMOVE_USER = () => {
    return{
        type: REMOVE_USER
    }
};