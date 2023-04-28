import { combineReducers} from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import chatReducer from "./slice/chatSlice";





const rootReducer=combineReducers({
    auth:authReducer,
    chat:chatReducer
})

export default rootReducer