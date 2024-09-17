import { userTypes } from "./userTypes";

export const userReducer = (state, action) => {
    switch (action.type) {
        case userTypes.login:
            const userData = {isLogged: true, ...action.payload};
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        case userTypes.logout:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}