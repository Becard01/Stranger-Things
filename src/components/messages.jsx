import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import {addMessage} from "../api/api.js"
import { fetchMessages } from "../api/api.js";
import { useGetUniqueKey } from "react-generate-unique-key-for-map";




const Messages = (props) => {

const {messages, setMessages, setMessagesToMe, setMessagesFromMe, tokenNumber, usernameString, 
setSelectPost} = props

const [returnmessage, setReturnMessage] = useState (false)
const [message, setMessage]= useState ("")
const [selectedmessage, setSelectedMessage]= useState("")
const [selectmessageID, setSelectMessageID] = useState("")

const navigate= useNavigate()

const getUniqueKey = useGetUniqueKey();

const messagesToMe = messages.data.messages.filter((msg) => {
       return (msg.fromUser.username!==usernameString)});
console.log ("messagesToMe", messagesToMe);

const messagesFromMe = messages.data.messages.filter((msg) => {
    return (msg.fromUser.username===usernameString)});
console.log ("messagesFromMe", messagesFromMe);




function handleSendMessageClick(messageID, message){
    setReturnMessage(true)
    setSelectedMessage(message)
    setSelectMessageID(messageID)
   // setSelectPost(post);
    }

const handleSetMessage = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setMessage(newValue);
    }


const handleSubmit = async (event) => {
    event.preventDefault();
    setReturnMessage(false)
    const post = {content: message}
    
    try{
    const data = await addMessage(tokenNumber, post, selectmessageID)
    console.log (data)


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


    
    
    }
    catch (error) {
        console.log (error)
        }
    }






    return (
     
       <>
{returnmessage === true? 
         <div className="addmessagecontainer">
        <div className="addmessage">

            
           <form id="submitMessage" onSubmit={async (event) => {
           handleSubmit(event)
            }}>
        <div> Title: {selectedmessage.post.title}</div>
        <div> Message: {selectedmessage.content}</div>
        <div> From User: {selectedmessage.fromUser.username}</div> 
        <div>----</div>   
            <div id="sendmessageTitle">
               Reply:
           </div>
          <fieldset id = "inputs">
         <label htmlFor="message"></label>
         <textarea
           id="entermessage" 
           type="text" 
           rows= "5"
           placeholder="Enter Your Reply Here" 
           value={message} 
           required
           onChange={handleSetMessage}/>
       
        </fieldset>
      
       <button id="sendMessageButton">Submit</button>
         </form>

         
        </div>
        </div>: null
        }




   <div className="messagescontainer">
        
        <div className="messageheadercontainer">
            <div className="messageheaderbox">
               
             Messages To Me:
       
            </div>
        </div>
       
      
      {
      messagesToMe.map((messageto) => {
       
        return (
            
         <div className= "card" key = {getUniqueKey(messageto)}> 
        
         <div className="messagecard">
        <div> Title: {messageto.post.title}</div>
        <div> Message: {messageto.content}</div>
        <div> From User: {messageto.fromUser.username}</div>
        <div className= "sendmessagediv"><button className ="sendamessage"
         onClick={() => handleSendMessageClick (messageto.post._id, messageto)} > Send Message </button></div>
        
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
      messagesFromMe.map((message) => {
       
        return (
            
         <div className= "card" key = {getUniqueKey(message)}> 
        
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