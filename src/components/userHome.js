import React, { useEffect, useState } from "react";

export default function UserHome({userData}){
    const logOut = () =>{
        window.localStorage.clear();
        window.location.href = "./sign-in";
      };
    return(
        <div className="auth-wrapper">
            <div className="auth-inner"> 
            <div>
            Name <h1>{userData.fname}</h1>
          Email<h1>{userData.email}</h1>
          <button className="btn btn-primary" onClick={logOut}>LogOut</button>  
          </div>    
            </div>
           
        </div>
      );
}   