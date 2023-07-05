import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminHome({userData}){
    const [data,setData] = useState([]);

    useEffect(()=>{
       getAllUser();
     }, []);
    const getAllUser = () =>{
        fetch("http://localhost:5050/getAllUser", {
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data, "userData");
              setData(data.data);
            });
    }
//logout function

    const logOut = () =>{
        window.localStorage.clear();
        window.location.href = "./sign-in";
      };
//deleting user

      const deleteUser = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
          fetch("http://localhost:5050/deleteUser", {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              userid: id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              alert(data.data);
              getAllUser();
             })
             .catch((error)=>{
                console.log(error);
                alert("an error occured while deleting the user");
             });
        } else {
        alert("deletion cancelled");
            
        }
      };
    
    //   const deleteUser = (id, name) =>{
    // if (window.confirm(`Are you sure want to delete ${name}`))
    // { 
    //     fetch("http://localhost:5050/deleteUser",{
    //               method:"POST",
    //               crossDomain:true,
    //               headers:{
    //                 "Content-Type":"application/json",
    //                 Accept:"application/json",
    //                 "Access-Control-Allow-Origin":"*",
    //               },
    //               body:JSON.stringify({
    //                userid: id,
    //              }),
    //             })
    //             .then((res)=>res.json())
    //             .then((data)=>{
    //               alert(data.data);
    //             });
    // }
    // else{ }
    // };
     
    return(
        <div className="auth-wrapper">
          <h1>Welcome Admin </h1>
          <table style={{Width:"auto", borderStyle:"solid"}}>
            <tbody>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>UserType</th>
                <th>Delete</th>
            </tr>
            {data && data.map(i=>{
                return(
                    <tr key={i._id}>
                        <td>{i.fname}</td>
                        <td> {i.email} </td>
                        <td>{i.userType }</td>
                <td> 
                    <FontAwesomeIcon icon={faTrash} style={{alignContent:"center"}} 
                    onClick={()=>deleteUser(i._id, i.fname)}/>
                </td>
                    </tr>
                )
            })}
            </tbody>
          </table>
          <br/>
          <button className="btn btn-primary" onClick={logOut}>LogOut</button> 
        </div>
      );
}