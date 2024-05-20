import React, { useRef } from 'react'

import axios from 'axios'

       
function Inpmsg() {
   
    const msgref = useRef('')
   const Handelmsg = ()=>{
        const content = msgref.current.value ; 
        if (!content) {
            console.error("u should write a message :(") ; 
               
        }else{
        const idmsg = Math.floor(Math.random()*900000)+100000 ;
       const  senter = localStorage.getItem("name") ;
      
        axios.post("https://soul-server-i8u0sup0n-soulaimanelimanes-projects.vercel.app/" ,{idmsg ,content, senter})
        .catch(err => console.error(err))
        
        msgref.current.value =""}
   }
   

    return (<>
       
        <form action="" method="post" >
            <div className="d-flex justify-content-center  align-items-center">

                <div className="col-sm-10 my-2">
                    <input type="text" className="form-control" ref={msgref} autoComplete='off' id="Fullname" required placeholder="type..." />

                </div>
                <div className="d-grid gap-5 my-2 mx-2 ">
                    <button className="btn btn-outline-primary" onClick={Handelmsg} type="button" > send </button>
                </div>

            </div>
        </form>
       

    </>

    )
}

export default Inpmsg