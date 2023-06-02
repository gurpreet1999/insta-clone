


import React from 'react'

import "./Notification.css"


const CustomNotification = () => {
  return (
    <>

     <div class="sidebar">
    
      <div class="sidebar-content">

        <div className='heading'>Notifications</div>
        <div className='date'>Today</div>

        
        <div class="notifi-item">
				<img src="img/avatar1.png" alt="img"/>
				<div class="text">
				   <h4>Elias Abdurrahman</h4>
				   <p>@lorem ipsum dolor sit amet</p>
			    </div> 
			</div>
            <div class="notifi-item">
				<img src="img/avatar1.png" alt="img"/>
				<div class="text">
				   <h4>Elias Abdurrahman</h4>
				   <p>@lorem ipsum dolor sit amet</p>
			    </div> 
			</div>
         
       
  
      </div>
    </div>
 
  <section class="overlay"></section>
  </>
  )



}

export default CustomNotification