import React, { useState } from "react";
import { Link } from "react-router-dom";

function UpdatePassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const [message, setMessage] = useState("");

    const cssStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: 'lightgrey',
    };

    const resetpassword = async () => {
        try{
            const response = await fetch('http://localhost:9000/resetpassword',{
                method:'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            if(response.ok){
                const data = await response.json();
                setMessage(data.message)
            }
            else{
                const errorData = await response.json();
                setMessage(errorData.message)
            }
        }
        catch(error){
            console.log(error);
        }
    };

    return(
        <div style={cssStyle}>
        <h1 style={{color:'black', backgroundColor:'yellow'}}>Reset your Password</h1>
        <form>
        <label><b>Email: </b></label>
        <input type="text" onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your Email" name="email" value={email}></input><br></br><br></br>
        <label><b>Password: </b></label>
        <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter Password" name="password" value={password}></input><br></br><br />
        <button type="submit" onClick={resetpassword} style={{backgroundColor:'green'}}>Reset</button>
        </form>
        <p style={{color:'red'}}>{message}</p>
        <div><Link to="/"><h6>Have an account?Login</h6></Link>
             <Link to='/signup'><h6>New User?Signup</h6></Link>
             <Link to='/deletemyrecord'><h6>DeleteMyRecord</h6></Link>
            </div>
        </div>
    )
};

export default UpdatePassword;