import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { addMessage } from "../api/api.js"
import { fetchPosts } from "../api/api.js";






const Reply = ({tokenNumber, selectmessage, setPosts, usernameString, selectmessageID}) => {

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
const data = await addMessage(tokenNumber, selectmessage, selectmessageID)
console.log (data)


const getPosts = async () => {
    try {
         const results = await fetchPosts(tokenNumber)
            console.log (results)
          setPosts(results);
         navigate ("/myposts")
        }
      catch (error) {
        console.error(error);
    
      }
    
    }
    getPosts()

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