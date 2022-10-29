import React from "react";
import {useNavigate} from "react-router-dom";



const Messages = (props) => {

const {messages, usernameString, setSelectMessage, setSelectMessageID} = props


const navigate= useNavigate()


const messagesToMe = messages.filter((msg) => {
       return (msg.fromUser.username!==usernameString)});


const messagesFromMe = messages.filter((msg) => {
    return (msg.fromUser.username===usernameString)});


function handleSendMessageClick(messageID, message){
  setSelectMessage(message)
    setSelectMessageID(messageID)
   navigate("./reply");
    }


return (
     
       <>
       
        <div className="messagescontainer">
        
        <div className="messageheadercontainer">
            <div className="messageheaderbox">
               
             Messages To Me:
       
            </div>
        </div>
       
      
      {
      messagesToMe.map((messageto, index) => {
       
        return (
            
         <div className= "card" key = {index}> 
        
         <div className="messagecard">
        <div> Title: {messageto.post.title}</div>
        <div> Message: {messageto.content}</div>
        <div> From User: {messageto.fromUser.username}</div>
        <div className= "sendmessagediv" href="#top"><button  className ="sendamessage"
         onClick={() => handleSendMessageClick (messageto.post._id, messageto)}> Send Message </button></div>
        
        </div> 
        
        </div>
        
        
       ) }
        )
        }
        </div>


        <div className="messagescontainer">
        
        <div className="messageheadercontainer">
            <div className="messageheaderbox">
               
             Messages From Me:
       
            </div>
        </div>
       
      
      {
      messagesFromMe.map((message,idx) => {
       
        return (
            
         <div className= "card" key = {idx}> 
        
         <div className="messagecard">
        <div> Title: {message.post.title}</div>
        <div> Message: {message.content}</div>
        <div> From User: {message.fromUser.username}</div>
        
        </div> 
        
        </div>
        
        
       ) }
        )
        }
        </div>
</>

    )
    }

export {Messages};