import { createSlice } from "@reduxjs/toolkit"


const chatSlice = createSlice({
          name : 'Chat',
          initialState :JSON.parse(window.localStorage.getItem("msg")) || [],
          reducers :{
           Addmessage: (state , action)=>{
                const {message} = action.payload;
                state.push({message:message});
                window.localStorage.setItem("msg" , JSON.stringify(state))
          }}
  })
  export const  {Addmessage} = chatSlice.actions
  export default  chatSlice.reducer;