import { InferActionsTypes } from './redux-store';
/* import { authAPI } from "../api/api";
import { stopSubmit } from 'redux-form'; */
import { getAuthUserData } from "./auth-reducer";

let initialState = {
    initialized: false,
};
export type initialStateType  = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>


const appReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case 'app/INITIALIZED_SUCCESS':
            {
                return {
                    ...state,
                    initialized: true,
                }
            }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({ type: 'app/INITIALIZED_SUCCESS' } as const) 

}
export const initializeApp = () => async (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        })
}

export default appReducer;