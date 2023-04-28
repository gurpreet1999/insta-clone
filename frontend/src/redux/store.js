import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"

import  {persistReducer,persistStore} from "redux-persist" 
import  storage  from "redux-persist/lib/storage"

const persistConfig={
    key:"root",
    storage,
    keyPrefix:"redux-"

}


const store=configureStore({
    reducer:persistReducer(persistConfig,rootReducer),
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck:false,
            immutableCheck:false

        })
    
  

})


const persistor=persistStore(store)


export {persistor,store}