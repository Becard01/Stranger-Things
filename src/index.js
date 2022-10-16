import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import {BrowserRouter, Route, Link} from "react-router-dom";

// These imports won't work until you fix ./components/index.js
//import { } from "./components";

function App() {

    const [,] = useState([false]);
    const [,] = useState({info: {}, records: []});
    const [,] = useState (null)
  
   
  
 //   return (
        {/* <Title /> is static, doesn't need any props */}
        {/*<Title /> */ }
  
        {/* <Search /> needs props for setIsLoading and setSearchResults (trigger <Loading /> on search start/end, and transfer results to preview) */}
        {/* <Search setIsLoading = {setIsLoading} setSearchResults = {setSearchResults} /> */ }
  
       
          
  //    </div>
  //  );
  }
  
 
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("app"));
