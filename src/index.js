import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState, } from "react";
import {BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "./app.css"


import { Header } from "./components/header.jsx";
import { Login } from "./components/login.jsx";
import { Registration } from "./components/registration.jsx";
import { Welcome } from "./components/welcome.jsx";
import { Posts } from "./components/posts.jsx";
import { fetchPosts } from "./api/api.js";
import { Add } from "./components/add.jsx";
import { Messages } from "./components/messages.jsx";
import { Sendmessage } from  "./components/sendmessage.jsx";
import { Success } from "./components/successfulreg.jsx";
import { Myposts } from "./components/myposts.jsx"

function App() {

   // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [usernameString, setUsernameString] = useState("","");
    const [passwordString, setPasswordString] = useState ("","");
    const [userExists, setUserExists] = useState (false)
    const [hasToken, setHasToken] = useState (false)
    const [myPosts, setMyPosts]= useState ([])
    const [messages, setMessages]= useState ([])
    const [messagesToMe, setMessagesToMe]= useState ([])
    const [messagesFromMe, setMessagesFromMe]= useState ([])
  

    const [tokenNumber, setTokenNumber] = useState (
      window.localStorage.getItem("tokenNumber") || "");
      
     
    const [posts, setPosts] = useState([]);


useEffect(() =>{
setPosts([])

//const getPosts = async () => {
//try {
 //     const results = await fetchPosts();
 //     console.log (results)
 //     setPosts(results);
 //     results.data.posts.map(array => {
 //       console.log (array.isAuthor)
 //       if (array.isAuthor===true){
 //        console.log ("myArray", array)
 //        return setMyPosts(myPosts.push(array))
 //       }
 //       else{return null}
 //     })
      
 // }
 // catch (error) {
 //   console.error(error);

 // }

//}
//getPosts()
}, []); 


useEffect(() => {
    window.localStorage.setItem("token", tokenNumber)
  
  }, []);
    


    
    

  
    return (
      
      

      <div className="app">

{<Header  setHasToken = {setHasToken} 
        setUsernameString = {setUsernameString} setPasswordString = {setPasswordString}
        setTokenNumber = {setTokenNumber}  tokenNumber = {tokenNumber} setPosts = {setPosts}/> }

      <Routes>
        
        <Route path="/login" element={<Login setUsernameString = {setUsernameString} 
        setPasswordString = {setPasswordString}
        usernameString = {usernameString} passwordString = {passwordString}
        setHasToken = {setHasToken} setTokenNumber = {setTokenNumber}
        setPosts = {setPosts} setMyPosts ={setMyPosts} myPosts = {myPosts} 
        tokenNumber = {tokenNumber}/>}/>
        
        <Route path="/registration" element={<Registration setUsernameString = {setUsernameString} 
        setPasswordString = {setPasswordString} setUserExists = {setUserExists} 
        usernameString= {usernameString} passwordString = {passwordString} />}/>
       
       <Route path="/" element={tokenNumber?<Navigate replace to="/posts" />:
       <Navigate replace to="/login" />} />
       
       <Route path="/welcome" element={<Welcome usernameString = {usernameString}/>}/>

       <Route path="/successfulreg" element={<Success usernameString = {usernameString}/>}/>

       <Route path="posts/add" element={<Add tokenNumber = {tokenNumber}
       setPosts = {setPosts} setMyPosts ={setMyPosts} myPosts = {myPosts} />}/>

      <Route path="/myposts" element={<Myposts posts = {posts} setPosts = {setPosts} 
        myPosts = {myPosts}/>}/>


       <Route path="/posts" element={<Posts posts = {posts} setPosts = {setPosts} 
        myPosts = {myPosts}/>}/>

       <Route path="mymessages/sendmessage" element={<Sendmessage tokenNumber = {tokenNumber} />}/>

       <Route path="/mymessages" element={<Messages messages = {messages} setMessages = {setMessages} 
        setMessagesToMe = {setMessagesToMe} setMessagesFromMe = {setMessagesFromMe} 
        tokenNumber= {tokenNumber}/>}/> 
        
        </Routes>

       

       </div>
      
       
    );
  
  }
  
 

  ReactDOM.render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>
  , 
  document.getElementById("app"));

  
