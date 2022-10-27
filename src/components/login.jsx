import React, { useState } from "react";
import {BrowserRouter, Route, Link, useNavigate} from "react-router-dom";
import { loginUser, fetchPosts, fetchMessages} from "../api/api.js"

const Login = (props) => {

    const {setUsernameString, setPasswordString, usernameString,
    passwordString, setHasToken, setTokenNumber, setPosts, myPosts, setMyPosts,
    tokenNumber, setMessages} = props

    const navigate = useNavigate();
    
     const handleSetUsername = (event) => {
        event.preventDefault();
        setUsernameString("")
        let loginstatus = document.getElementById("loginstatus");

        const inputElement = event.target;
            const newValue = inputElement.value;
            
        setUsernameString(newValue);
        loginstatus.classList.remove("usernamedoesnotexist");
        loginstatus.classList.add("usernameexists");
    }

    const handleSetPassword = (event) => {
        event.preventDefault();
        let loginstatus = document.getElementById("loginstatus");

        const inputElement = event.target;
            const newValue = inputElement.value;
           
        setPasswordString(newValue);
        loginstatus.classList.remove("usernamedoesnotexist");
        loginstatus.classList.add("usernameexists");
    }
    
        
            
        
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const result = await loginUser(usernameString, passwordString)
            
            result.success? loginSuccess(result): loginFailure(result)

            console.log (result)
           }
            catch (error) {
              console.log (error)
              }
        };

     function loginSuccess(result){
        const token = result.data.token
        console.log ("token at time of login", token)
        if (token) {
        
        setHasToken(true)
        setTokenNumber(token)
        navigate("/welcome")


        const getPosts = async () => {
            try {
                  
                  const results = await fetchPosts(token)
                  console.log (results)
                  setPosts(results);
                  results.data.posts.map(array => {
                    console.log (array.isAuthor)
                    if (array.author.username===usernameString){
                     return console.log ("myArray", array)
                     }
                
                  })
                }
              catch (error) {
                console.error(error);
            
              }
            
            }
        
            getPosts()

            const getMessages = async () => {
                try {
                      
                      const results = await fetchMessages(tokenNumber)
                      console.log (results)
                      setMessages(results);
                     }
                  catch (error) {
                    console.error(error);
                
                  }
                
                }
            getMessages()    




        navigateToPost()
        }
        }
     function navigateToPost (){
        
        setTimeout(() => {
            navigate("/posts")
         }, "2000")
         

     }

     

     function loginFailure(result){
        let loginstatus = document.getElementById("loginstatus");
        if (result.error.name === "InvalidCredentials") {
            loginstatus.classList.remove("usernameexists");
            loginstatus.classList.add("usernamedoesnotexist");
              }
        }
    


    
    
    return (
     <div id="login">
        <div id="loginTitle">
            Member Login
        </div>
        
        <form id="submitcredentials" onSubmit={async (event) => {
        handleSubmit(event)
         }}>

       <fieldset>
      <label htmlFor="username"></label>
      <input 
        id="enterusername" 
        type="text" 
        placeholder="Username" 
        value={usernameString} 
        autoComplete="off"
        
        onChange={handleSetUsername}/>
    </fieldset>
    <fieldset>
      <label htmlFor="password"></label>
      <input 
        id="enterpassword" 
        type="password" 
        placeholder="Password" 
        value={passwordString} 
        autoComplete="off"
        onChange={handleSetPassword}/>
    </fieldset>
      
    <button id="loginButton">Log In</button>
      </form>
      <p id="loginstatus" className="usernameexists">Invalid Username or Password</p>
       
      <div id="loginRegister">
            Not a member? <Link to="/registration" id="registerlink">Click Here to Register</Link>
      </div>
        
 
  </div>
    )
}

export { Login };