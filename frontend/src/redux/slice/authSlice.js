import { createSlice } from "@reduxjs/toolkit";


const initialState={
isLoggedIn:false,
user:null,
token:null,
offerForVideoCall:null
}

const slice=createSlice({
    name:"auth",
    initialState,
    reducers:{
logIn(state,action){
  return {
    ...state,
    user:action.payload.user,
    isLoggedIn:true,
    token:action.payload.token
  }
},

logOut(state,action){
return {
...state,
user:null,
isLoggedIn:false,
token:null
}

},

saveOffer(state,action){
  return {
...state,
offerForVideoCall:action.payload
  }
}
    }

})

export const {logIn,logOut,saveOffer}= slice.actions

export default slice.reducer