import React, { useState } from "react";
import {BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";


const Header = (props) => {
    const {setHasToken, setUsernameString, setPasswordString, setTokenNumber, 
     tokenNumber, setPosts} = props;
    
const navigate= useNavigate();

    function logOut(event) {
        event.preventDefault();

        console.log (tokenNumber)
        setHasToken("");
        setUsernameString("");
        setPasswordString("");
        setTokenNumber("");
        setPosts([])
      
       
        
        navigate("/login");


      };
 

   
return (
     <div id="header">
      
      
        <h1 id="title">
         Stranger Things
        </h1>
      
      {tokenNumber? 
      <>
      <button id="mymessagesbutton"><Link to="/mymessages" id="mymessagelink">MyMessages</Link></button>
      <button id="postsbutton" ><Link to="/posts" id="postlink">Posts</Link></button>
      <button id="logoutbutton" onClick={logOut}>Logout</button> 
      </>
      : console.log ("logged out")}
 
  </div>
    )
}

export { Header };