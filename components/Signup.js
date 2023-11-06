import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const cssStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: 'lightgrey',
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if(email === "") {
    //         setEmailError('Enter your Emailid');
    //         return;
    //     }
    //     else if (!email.includes("@")) {
    //         setEmailError("Invalid email address");
    //         return;
    //     }
    //     else if(password === "") {
    //         setPasswordError("Enter your Password")
    //         return;
    //     }
    //     else if (password.length < 6) {
    //         setPasswordError("Password must be at least 6 characters");
    //         return;
    //     }
    //     setEmailError("");
    //     setPasswordError("");
    // };


    return(
        <div style={cssStyle}>
            <h1 style={{color:'black', backgroundColor:'yellow'}}>SignUp</h1>

            <form method="POST" action="http://localhost:9000/signup">
            <label><b>Email: </b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" onChange={(e) => {setEmail(e.target.value); setEmailError('')}} placeholder="Enter Email" name="email" value={email} autoComplete='off'></input>
                <p>{emailError}</p><br></br>
            <label><b>Password: </b></label>&nbsp;    
                <input type="password" onChange={(e) => {setPassword(e.target.value); setPasswordError("")}} placeholder="Enter Password" name="password" value={password} autoComplete='off'></input>
                <p>{passwordError}</p>
                <br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit" style={{backgroundColor: 'green'}} ><b>SignUp</b></button>
            </form>

            <div><Link to="/"><h6>Have an account?Login</h6></Link>
                 <Link to='/deletemyrecord'><h6>DeleteMyRecord</h6></Link>
                 <Link to='/resetpassword'><h6>UpdatePassword</h6></Link>
            </div>
        </div>
    )
}

export default Signup;


