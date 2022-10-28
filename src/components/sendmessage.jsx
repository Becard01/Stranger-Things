import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { addMessage } from "../api/api.js"
import { fetchPosts } from "../api/api.js";






const Sendmessage = ({tokenNumber, selectpost, setPosts, usernameString}) => {

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
const data = await addMessage(tokenNumber, post, selectpost._id)
console.log (data)


const getPosts = async () => {
    try {
          
          const results = await fetchPosts(tokenNumber)
          console.log (results)
          setPosts(results);
          results.data.posts.map(array => {
            console.log (array.isAuthor)
            if (array.author.username===usernameString){
             return console.log ("myArray", array)
             }
        
          })
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
       <div id= "card" key = {selectpost._id}>   
          
       <div id="postcard">  
       <div id="innercard">
       <div> Title: {selectpost.title}</div>
       <div> Description: {selectpost.description}</div>
       <div> Price: {selectpost.price}</div>
       <div> Location: {selectpost.location}</div>
       <div> Will Deliver? {selectpost.willDeliver}</div>
      
        </div> 
       </div>
       
       </div>
    
       

<div className="addmessagecontainer">
        <div className="addmessage">

            
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

         
        </div>
        </div>
        </>
       )



}

export {Sendmessage};