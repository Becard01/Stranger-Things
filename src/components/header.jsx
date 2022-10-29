import React from "react";
import {Link, useNavigate } from "react-router-dom";
import  {gsap} from 'gsap';



const Header = (props) => {
    const {setHasToken, setUsernameString, setPasswordString, setTokenNumber, 
     tokenNumber} = props;
    
const navigate= useNavigate();

const colors = gsap.to('.title', {
    paused: true,
    duration: 20,
    repeat: -1,
    '--hue': 360,
  })
  
  const doRandom = () => {
    gsap.timeline()
      .to('.title', {
        duration: 0.1,
        opacity: function(){ return gsap.utils.random(.90, .95) },
        delay: function(){ return gsap.utils.random(.1, 2) },
      }).to('.title', {
        duration: 0.1,
        opacity: 1,
        onComplete: function(){
          doRandom()
        }
      })
  }
  colors.play();
  doRandom();


    function logOut(event) {
        event.preventDefault();

        console.log (tokenNumber)
        setHasToken("");
        setUsernameString("");
        setPasswordString("");
        setTokenNumber("");
        
      
       
        
        navigate("/login");


      };
 

   
return (
     <div id="header">
      
      
        <h1 className="title">
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