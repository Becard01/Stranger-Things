import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { addMessage } from "../api/api.js"
import { fetchMessages } from "../api/api.js";



const Reply = ({tokenNumber, selectmessage, setMessages, selectmessageID}) => {

const [message, setMessage] = useState ("");

const navigate = useNavigate()

const handleSetMessage = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setMessage(newValue);
}

const handleSubmit = async (event) => {
event.preventDefault();

const post = {content: message}

try{
const data = await addMessage(tokenNumber, post, selectmessageID)
console.log (data)

const getMessages = async () => {
  
    try { 
          const results = await fetchMessages(tokenNumber)
          console.log ("results useEffect in Index.js fetchMessages", results)
          setMessages(results.data.messages);
          navigate ("/mymessages")
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

         <div className="addmessagecontainer">
        <div className="addmessage">

            
           <form id="submitMessage" onSubmit={async (event) => {
           handleSubmit(event)
            }}>

        <div> Title: {selectmessage.post.title}</div>
        <div> Message: {selectmessage.content}</div>
        <div> From User: {selectmessage.fromUser.username}</div> 
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
        </div>
        </>
        )
}

export {Reply};