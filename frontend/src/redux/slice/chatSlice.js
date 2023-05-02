import { createSlice } from "@reduxjs/toolkit";


const initialState={
selectedChat:{},

}

const slice=createSlice({
    name:"chat",
    initialState,
    reducers:{
selectTheChat(state,action){
  console.log(action.payload)
  return {
    ...state,
    selectedChat:action.payload
  }
}

    }

})

export const {selectTheChat}= slice.actions

export default slice.reducer