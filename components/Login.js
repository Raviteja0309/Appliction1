import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    // let history = useHistory();

    const cssStyle = {
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: 'lightgrey'
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:9000', {
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            if(response.ok){
                const data = await response.json();
                setMessage(data.message);
                setEmail("");
                setPassword('');
                // history.push('/home');
            }else{
                const errorData = await response.json();
                setMessage(errorData.message);
            }
        }
        catch(error){
            console.error(error);
            setMessage('Server Error');
        }
    };

    return(
        <div style={cssStyle}>
            <h1 style={{color:'black', backgroundColor:'yellow'}}>Login</h1>

            <form 
                method="POST" 
                action="http://localhost:9000/">
            <label><b>Email: </b></label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="email" 
                       onChange={(e) => {setEmail(e.target.value)}} 
                       placeholder="Enter Email" name="email" 
                       value={email} 
                       autoComplete='off'>
                </input>
                <br></br><br></br>
            <label><b>Password: </b></label>
            &nbsp;   
                <input type="password" 
                       onChange={(e) => {setPassword(e.target.value)}} 
                       placeholder="Enter Password" name="password" 
                       value={password} 
                       autoComplete='off'>
                </input>
                <br></br><br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit" 
                        style={{backgroundColor: 'green'}} onClick={handleLogin}>
                    <b>Login</b>
                </button>
                <p style={{color:'red'}}>{message}</p>
            </form>

            <div><Link to="/signup"><h6>New user?Signup</h6></Link>
            <Link to='/deletemyrecord'><h6>DeleteMyRecord</h6></Link>
            <Link to='/resetpassword'><h6>UpdatePassword</h6></Link>
            </div>    
        </div>
    )
}

export default Login;


