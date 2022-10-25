






const baseURL= 'https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT'



export async function registerUser (userName, passWord) {

  console.log ("userName",userName, "passWord", passWord)
    try {
    const response = await fetch(`${baseURL}/users/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: `${userName}`,
        password: `${passWord}`
      }
    })})
    const data = await response.json();
    console.log(data)
    return data
  } 
  catch (error) {
    console.error ("There was an error")
  }

}

  export async function loginUser (userName, passWord) {
    
    try {
      const response = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: `${userName}`,
          password: `${passWord}`
        }
      })})
      const data = await response.json();
      console.log(data)
      return data
    } 
    catch (error) {
      console.error ("There was an error")
    }
  
  }

  export async function fetchPosts (tokenNumber){
    console.log ("tokenNumber at time of fetch", tokenNumber)
  try{
  const response = await fetch(`${baseURL}/posts`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenNumber}`
      },
     
      }
  
  
  );
  const data = await response.json();
  return data;
  }
  catch(error) {
    console.error ("There was an error")
  }

  }

  
  
  export async function addPost (tokenNumber, newPost){
    try{
      console.log ("newPost", newPost)
    const response = await fetch(`${baseURL}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenNumber}`
      },
      body: JSON.stringify(
       {post: newPost})
      });
    
const data = await response.json();
    return data;
  }
    catch(error) {
      console.error ("There was an error")
    }
  
    }


    export async function addMessage (tokenNumber, newMessage){
      try{
        console.log ("newMessage", newMessage)
      const response = await fetch(`${baseURL}/posts/  /messages`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenNumber}`
        },
        body: JSON.stringify(
         {post: newMessage})
        });
      
  const data = await response.json();
      return data;
    }
      catch(error) {
        console.error ("There was an error")
      }
    
      }


    
    export async function fetchMessages (tokenNumber){
      try{
      const response = await fetch(`${baseURL}/users/me`, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenNumber}`
        },
       
        });
      
  const data = await response.json();
      return data;
    }
      catch(error) {
        console.error ("There was an error")
      }
    
      }
  
      