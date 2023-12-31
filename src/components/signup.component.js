import React, { useState } from 'react';
// import app from './firebase_config';
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// const auth = getAuth(app);


export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

        // this.onSignInSubmit=this.onSignInSubmit.bind(this);
        // this.verifyCode=this.verifyCode.bind(this);
     
// onCaptchaVerify(){
 
// window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//   'size': 'invisible',
//   'callback': (response) => {
// this.onSignInSubmit();
//   },
// }, auth);

// }
// onSignInSubmit(){
//   this.onCaptchaVerify();
//   const phoneNumber ="+91" + this.state.mobile;
//   console.log(phoneNumber);
//   const appVerifier = window.recaptchaVerifier;
//   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//   .then((confirmationResult) => {
//     // SMS sent. Prompt user to type the code from the message, then sign the
//     // user in with confirmationResult.confirm(code).
//     window.confirmationResult = confirmationResult;
//     alert("Otp Sended");
//     this.setState({ verifyOtp : true});
//   }).catch((error) => {
//     // Error; SMS not sent
//     // ...
//   });  
// }
// verifyCode(){
//   window.confirmationResult
//   .confirm(this.state.otp)
//   .then((result) => {
//     // User signed in successfully.
//     const user = result.user;
//     console.log(user);
//     alert("verification Done");
//     this.setState({
//       verified:true,
//       verifyOtp:false,
//     })
//   })
//   .catch((error) => {
//     alert("invalid Otp");
//     // User couldn't sign in (bad verification code?)
//     // ...
//   });
// }
//      changeMobile(e){
//       this.setState({mobile:e.target.value},function(){
//         if(this.state.mobile.length===10){
//           this.setState({
//             verifyButton:true,
//           });
//         }
//       });
//      }
     const handleSubmit = (e) => {
      if(userType === "Admin" && secretKey !== "Nikhitha"){
        e.preventDefault();
        alert("Invalid Admin");
      }
      else{
          e.preventDefault();
          // const { fname, lname, email, password} = this.state;
          console.log(fname, lname, email, password);
           fetch("http://localhost:5050/register",{
            method:"POST",
            crossDomain:true,
            headers:{
              "Content-Type":"application/json",
              Accept:"application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body:JSON.stringify({
              fname, 
              lname,
              email,
              password,
              // mobile,
             userType,
            }),
          }).then((res)=>res.json())
          .then((data)=>{
            console.log(data,"userRegister");
            if(data.status === "ok"){
              alert("Registration successfull");
            }
            else{
              alert("Something Went Wrong"); 
            }
          });
        }   
       
      };
     
    return (
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div>
          Register As 
          <input type='radio'
          name="UserType"
          value="User"
          onChange={(e) => setUserType(e.target.value)}
          // onChange={(e)=>this.setState({userType : e.target.value})}
          /> User

          <input type='radio'
          name="UserType"
          value="Admin"
          onChange={(e) => setUserType(e.target.value)}
          // onChange={(e)=>this.setState({userType : e.target.value})}
          /> Admin
        </div>
        {/* <div id="recaptcha-container"></div> */}
           {userType === "Admin" ?  (
           <div className="mb-3">
          <label>Secret Key</label>
          <input
            type="text"
            className="form-control"
            placeholder="Secret Key"
            onChange={(e) => setSecretKey(e.target.value)}
            // onChange={(e)=>this.setState({ secretKey : e.target.value})}
          />
        </div>
        )
        : null}
          
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            // onChange={(e)=>this.setState({ fname : e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name"  
          onChange={(e) => setLname(e.target.value)}
          //onChange={(e)=>this.setState({lname : e.target.value})} 
          />
        </div>
{/*        
        <div className="mb-3">
          <label>Mobile</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Mobile Number"
            onChange={(e)=> this.changeMobile(e)}
             />
             {this.state.verifyButton ? 
            <input type="button" value={this.state.verified?"Verified":"Verify"}
            onClick={this.onSignInSubmit}
            style={{
              backgroundColor:"#0163d2",
              width:"100%",
              padding:8,
              color:"white",
              border:"none",
            }} />
            :null}
           </div> 
           {this.state.verifyOtp ? (
        <div className="mb-3">
          <label>OTP</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter OTP"
            onChange={(e)=>this.setState({otp : e.target.value})} />
           
             <input type="button" value="OTP"
             onClick={this.verifyCode}
             style={{
               backgroundColor:"#0163d2",
               width:"100%",
               padding:8,
               color:"white",
               border:"none",
               }} />
               </div>
           )
               :null} */}

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
           // onChange={(e)=>this.setState({email : e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            //onChange={(e)=>this.setState({password : e.target.value})}
          />
        </div>

    


        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
