import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { editPost } from "../api/api.js"
import { fetchPosts } from "../api/api.js";



const Edit = ({tokenNumber, selectpost, posts, setPosts, usernameString}) => {

const [edititem, setEditItem] = useState (selectpost.title);
const [editdescription, setEditDescription] = useState (selectpost.description);
const [editprice, setEditPrice] = useState (selectpost.price);
const [editlocation, setEditLocation] = useState (selectpost.location);
const [editwilldeliver, setEditWilldeliver] = useState (selectpost.willDeliver);



const navigate = useNavigate()
        
    
    const handleEditSetItem = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setEditItem(newValue);
    }
    
    const handleEditSetDescription = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setEditDescription(newValue);
    }
    
    const handleEditSetPrice = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setEditPrice(newValue);
    }
    
    const handleEditSetLocation = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setEditLocation(newValue);
    }
                    
    const handleEditWilldeliver = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setEditWilldeliver(newValue);
    }
    
    const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (editwilldeliver === "checked") {
        setEditWilldeliver(true)
        }
    else{
        setEditWilldeliver (false)
    }
    
    const editedpost = {title: edititem,
    description: editdescription,
    price: editprice,
    location: editlocation,
    willDeliver: editwilldeliver}
    
    try{
    const data = await editPost(tokenNumber, editedpost, selectpost._id)
    
    console.log ("editeddata", data)
    console.log ("is this an array?", posts)

  // const newPostArray = posts.data.posts.filter((eachpost) => eachpost._id !== data.post._id)
 
  const dataArray = [data]
  console.log ("posts", posts)
  console.log (selectpost._id)
  const index = posts.data.posts.includes(selectpost._id);
  console.log ("index of _id", index)
  
 // const newArray = posts.data.posts.splice(index, 1, dataArray);
//  console.log ("newArray", newArray)
 //  setPosts(newArray);
   console.log ("posts", posts)
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
       
    
            <div id="editpostcontainer">
            <div id="editPost">
    
                <>
        
               <form id="submitPost" onSubmit={async (event) => {
               handleSubmit(event)
                }}>
                <div id="editPostTitle">
                   Edit Post
               </div>
              <fieldset id = "inputs">
             <label htmlFor="item"></label>
             <input 
               id="enteritem" 
               type="text" 
               placeholder="Enter: Name of item for sale" 
               value={edititem} 
               
               required
               onChange={handleEditSetItem}/>
           
             <label htmlFor="description"></label>
             
             <textarea 
               id="enterdescription" 
               type="text"
               rows='2'
               placeholder="Description of item" 
               value={editdescription}
               required
               onChange={handleEditSetDescription}/>
               
    
    <label htmlFor="price"></label>
             <input 
               id="enterprice" 
               type="text" 
               placeholder="Price of item" 
               value={editprice}
               autoComplete="off"
               required
               onChange={handleEditSetPrice}/>
    
    <label htmlFor="location"></label>
             <input 
               id="enterlocation" 
               type="text" 
               placeholder="Location" 
               value={editlocation}
               autoComplete="off"
               required
               onChange={handleEditSetLocation}/>
    <span> Will deliver?&emsp;
    
    <label htmlFor="willdeliver"></label>
             <input 
               id="enterwilldeliver" 
               type="checkbox" 
               
               value={editwilldeliver}
               
               onChange={handleEditWilldeliver}
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

export {Edit};