import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { addMessage } from "../api/api.js"






const Sendmessage = ({tokenNumber}) => {

const [message, setMessage] = useState ("");

const handleSetMessage = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setMessage(newValue);
}




const handleSubmit = async (event) => {
event.preventDefault();



const post = {message: message}

try{
const data = await addMessage(tokenNumber, post)
console.log ("token", tokenNumber)
console.log (data)

}
catch (error) {
    console.log (error)
    }


}
    

return (
        <div id="addmessagecontainer">
        <div id="addmessage">

            <>
           <form id="submitPost" onSubmit={async (event) => {
           handleSubmit(event)
            }}>
            <div id="sendmessageTitle">
               Send a Message to the Seller
           </div>
          <fieldset id = "inputs">
         <label htmlFor="message"></label>
         <textarea
           id="entermessage" 
           type="text" 
           rows= "5"
           placeholder="Enter Your Message Here" 
           value={message} 
           required
           onChange={handleSetMessage}/>
       
        </fieldset>
      
       <button id="sendMessageButton">Submit</button>
         </form>

         </>
        </div>
        </div>
         
       )



}

export {Sendmessage};