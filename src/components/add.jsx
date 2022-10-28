import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { addPost } from "../api/api.js"
import { fetchPosts } from "../api/api.js";






const Add = ({tokenNumber, usernameString, setPosts}) => {

const [item, setItem] = useState ("");
const [description, setDescription] = useState ("");
const [price, setPrice] = useState ("");
const [location, setLocation] = useState ("");
const [willdeliver, setWilldeliver] = useState (false);

const navigate = useNavigate()

const handleSetItem = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setItem(newValue);
}

const handleSetDescription = (event) => {
event.preventDefault();
const inputElement = event.target;
const newValue = inputElement.value;
setDescription(newValue);
}

const handleSetPrice = (event) => {
event.preventDefault();
const inputElement = event.target;
const newValue = inputElement.value;
setPrice(newValue);
}

const handleSetLocation = (event) => {
event.preventDefault();
const inputElement = event.target;
const newValue = inputElement.value;
setLocation(newValue);
}
                
const handleWilldeliver = (event) => {
event.preventDefault();
const inputElement = event.target;
const newValue = inputElement.value;
setWilldeliver(newValue);
}

const handleSubmit = async (event) => {
event.preventDefault();

if (willdeliver === "checked") {
    setWilldeliver(true)
    }
else{
    setWilldeliver (false)
}

const post = {title: item,
description: description,
price: price,
location: location,
willDeliver: willdeliver}

try{
const data = await addPost(tokenNumber, post)
console.log ("token", tokenNumber)
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
        <div id="addpostcontainer">
        <div id="addPost">

            <>
           <form id="submitPost" onSubmit={async (event) => {
           handleSubmit(event)
            }}>
            <div id="addPostTitle">
               Create a Post
           </div>
          <fieldset id = "inputs">
         <label htmlFor="item"></label>
         <input 
           id="enteritem" 
           type="text" 
           placeholder="Enter: Name of item for sale" 
           value={item} 
           autoComplete="off"
           required
           onChange={handleSetItem}/>
       
         <label htmlFor="description"></label>
         
         <textarea 
           id="enterdescription" 
           type="text"
           rows='2'
           placeholder="Description of item" 
           value={description}
           required
           onChange={handleSetDescription}/>
           

<label htmlFor="price"></label>
         <input 
           id="enterprice" 
           type="text" 
           placeholder="Price of item" 
           value={price}
           autoComplete="off"
           required
           onChange={handleSetPrice}/>

<label htmlFor="location"></label>
         <input 
           id="enterlocation" 
           type="text" 
           placeholder="Location" 
           value={location}
           autoComplete="off"
           required
           onChange={handleSetLocation}/>
<span> Will deliver?&emsp;

<label htmlFor="willdeliver"></label>
         <input 
           id="enterwilldeliver" 
           type="checkbox" 
           
           value={willdeliver}
           
           onChange={handleWilldeliver}
           />
</span>



       </fieldset>
      
       <button id="registerButton">Submit</button>
         </form>

         </>
        </div>
        </div>
         
       )



}

export {Add};