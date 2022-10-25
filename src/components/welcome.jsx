import React, { useState } from "react";
import {BrowserRouter, Route, Link} from "react-router-dom";


const Welcome = (props) => {

    const {usernameString} = props

    
    
    return (
     <div id="welcome">
    
    <p id="welcomeuser1"> Welcome!</p>
    <p id="welcomeuser2"> You are now logged in as</p>
    <p id="welcomeuser3"> {usernameString}</p>
 
 
  </div>
    )
}

export { Welcome };