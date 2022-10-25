import React from "react";



const Success = (props) => {

    const {usernameString} = props

    
    
    return (
     <div id="success">
    
    <p id="welcomeuser4"> Success!</p>
    <p id="welcomeuser5"> You are now registered as</p>
    <p id="welcomeuser6"> {usernameString}, Please Log In</p>
 
 
  </div>
    )
}

export { Success };