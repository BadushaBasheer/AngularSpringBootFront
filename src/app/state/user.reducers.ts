import {createReducer, on} from "@ngrx/store";
import {addUser, deleteUser} from "./user.action";

export const initialState = 0;

export const userReducer = createReducer(
    initialState,
    // @ts-ignore
    on(addUser, state => state + 1),
    on(deleteUser, state => state - 1)
)
