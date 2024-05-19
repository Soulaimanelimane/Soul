import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import { Store } from './Store/strore'

function Chat() {

  return <>
  <Provider store={Store}>
      <App />
  </Provider>
  
  </>
}

export default Chat