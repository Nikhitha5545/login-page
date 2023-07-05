// import React, { Component } from "react";

// export default class UserDetails extends Component {
//     constructor(props){
//         super(props);
//         this.state={
//             userData:"",
//         }
//     }
//     componentDidMount(){
//         fetch("http://localhost:5050/userData",{
//       method:"POST",
//       crossDomain:true,
//       headers:{
//         "Content-Type":"application/json",
//         Accept:"application/json",
//         "Access-Control-Allow-Origin":"*",
//       },
//       body:JSON.stringify({
//         token:window.localStorage.getItem("token"),
//           }),
//     })
//     .then((res)=>res.json())
//     .then((data)=>{
//       console.log(data,"userData");
//       this.setState({userData:data.data});
//       if(data.data === "token expired"){
//         alert("Token expired Login again");
//         window.localStorage.clear();
//         window.location.href="./sign-in"
//       }
//     });
//     }
//     logOut = () => {
//         window.localStorage.clear();
//         window.location.href="./sign-in"

//     };
//     render(){
//        return(
//             <div>
//             Name <h1>{this.state.userData.fname}</h1> 
//             Email<h1>{this.state.userData.email}</h1>
//             <button className="btn btn-primary" onClick={this.logOut}>LogOut</button>
//             </div>
//         )
//     }
// }
import React, { useEffect, useState } from "react";
import UserHome from "./userHome";
import AdminHome from "./adminHome";

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  const [admin,setAdmin] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5050/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if(data.data.userType === "Admin"){
          setAdmin(true);
        }
        
        setUserData(data.data);

        // if (data.data === "token expired") {
        //   alert("Token expired login again");
        //   window.localStorage.clear();
        //   window.location.href = "./sign-in";
        // } 
      });
  }, []);
  
  
    return admin ? <AdminHome /> : <UserHome userData={userData} />;
  //return admin ? <h1>Welcome Admin</h1> : <UserHome userData={userData} />;
   
     

}