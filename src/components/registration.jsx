import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api.js"




const Registration = (props) => {

    const {setUsernameString, setPasswordString, usernameString,
    passwordString} = props

    const [usernameLengthOK, setUsernameLengthOK] = useState (false);
    const [passwordLengthOK, setPasswordLengthOK] = useState (false);

    const navigate = useNavigate()

    const handleSetUsername = (event) => {
              event.preventDefault();
              setUsernameLengthOK (false)
              let usernamelength = document.getElementById("usernamelength");
              const inputElement = event.target;
                  const newValue = inputElement.value;
                  console.log ("newValue", newValue)

                  if (newValue.length >= 6) {
                    setUsernameLengthOK(true)}
                  else {
                    usernamelength.classList.remove("usernamevalid");
                    usernamelength.classList.add("usernameinvalid");
                   }

              setUsernameString(newValue);
              usernamelength.classList.remove("usernameinvalid");
              usernamelength.classList.add("usernamevalid");
              
          }
      
    const handleSetPassword = (event) => {
              event.preventDefault();
              setPasswordLengthOK(false)
              let passwordlength = document.getElementById("passwordlength");
              const inputElement = event.target;
                  const newValue = inputElement.value;
                  
                  if (newValue.length >= 6) {
                    setPasswordLengthOK(true)};

              setPasswordString(newValue)
              passwordlength.classList.remove("passwordinvalid");
              passwordlength.classList.add("passwordvalid");
          }
      
    const handleSubmit = async (event) => {
              event.preventDefault();
              

              let usernamelength = document.getElementById("usernamelength");
              let passwordlength = document.getElementById("passwordlength");
              let registrationstatus = document.getElementById("registrationstatus");

              if(usernameLengthOK !== true) {
                usernamelength.classList.remove("usernamevalid");
                usernamelength.classList.add("usernameinvalid");
              } else {
                usernamelength.classList.remove("usernameinvalid");
                usernamelength.classList.add("usernamevalid");
              }

              if(passwordLengthOK !== true) {
                passwordlength.classList.remove("passwordvalid");
                passwordlength.classList.add("passwordinvalid");
              } else {
                passwordlength.classList.remove("passwordinvalid");
                passwordlength.classList.add("passwordvalid");

              }

             
             if (usernameLengthOK === true && passwordLengthOK === true) {
                console.log (usernameString , passwordString)
            try {
              const result = await registerUser(usernameString, passwordString);

              result.success ? registrationSuccess(result): registrationFailure();
              console.log (result);

              if (result.error.name === "UserExists") {
                registrationstatus.classList.remove("userdoesnotexist");
                registrationstatus.classList.add("userexists");
            };
                

                }
                
            catch (error) {
                console.log (error)
                }
            }
    function registrationSuccess(result){
            navigate("/successfulreg")
            setTimeout(() => {
                navigate("/login")
             }, "2500")
            }
        
    function registrationFailure(){
            console.log ('registration failed')
        }
    }



return (
        <div id="register">
           <div id="registerTitle">
               Become a Member
           </div>
           
           <form id="registercredentials" onSubmit={async (event) => {
           handleSubmit(event)
            }}>
   
          <fieldset>
         <label htmlFor="username"></label>
         <input 
           id="enterusername" 
           type="text" 
           placeholder="Username (must be 6 characters long)" 
           value={usernameString} 
           required
           onChange={handleSetUsername}/>
       </fieldset>
       <p id="usernamelength" className="usernamevalid">Minimum <b>6 characters</b></p>
       <fieldset>
         <label htmlFor="password"></label>
         <input 
           id="enterpassword" 
           type="password" 
           placeholder="Password (must be 6 characters long)" 
           value={passwordString}
           required
           onChange={handleSetPassword}/>
       </fieldset>
       <p id="passwordlength" className="passwordvalid">Minimum <b>6 characters</b></p>
       <p id="registrationstatus" className="userdoesnotexist">Username already exists&emsp;&emsp;&emsp;  
       <Link to="/login" id="loginlink">Login Here</Link></p>
         
       <button id="registerButton">Submit</button>
         </form>
         
        </div>
       )
}

export { Registration };




