import React from 'react';
import './App.css'
import Inpmsg from './Inpmsg';
import Message from './Message';



function App() {
  var name = localStorage.getItem('name');
  if (!name) {
    name = prompt("enter your name :=")
    localStorage.setItem("name", name)
  }

  return (
    <>
   
      <div className="chat">
        <div className="chat-header clearfix">
          <div className="row">
            <div className="col-lg-6">
              <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" className="profile img" />
              <div className="chat-about">
                <h6 className="m-b-0">{localStorage.getItem('name')}</h6>

              </div>
            </div>

          </div>
        </div>
        <div className="chat-history" style={{ height: '450px' }}>
          <ul className="m-b-0">
            {<Message />}
          </ul>
        </div>
        {<Inpmsg />}
      </div>
    </>

  );
}

export default App;
