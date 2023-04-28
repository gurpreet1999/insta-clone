import { createSlice } from "@reduxjs/toolkit";


const initialState={
selectedChat:{},

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

    }

})

export const {logIn,logOut}= slice.actions

export default slice.reducer