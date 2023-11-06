
import React, {useState} from "react";
import { Link } from "react-router-dom";

function DeleteMyRecord() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")

    const cssStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: 'lightgrey',
    };

    const deleterecord = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:9000/deletemyrecord', {
                method:'DELETE',
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
            console.log(error);
        }
    }
    return(
        <div style={cssStyle}>
        <h1 style={{color:'black', backgroundColor:'yellow'}}>Delete Account</h1>
        <form>
        <label><b>Email: </b></label>
        <input type="text" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter MailId"></input><br></br><br></br>
        <label><b>Password: </b> </label>
        <input typeof="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter password"></input><br></br><br></br>
        <button type="submit" style={{backgroundColor:'red'}} onClick= {deleterecord}>Delete</button>
        </form>
        <p style={{color:'red'}}>{message}</p>
        <div><Link to="/"><h6>Have an account?Login</h6></Link>
             <Link to='/signup'><h6>New User?Signup</h6></Link>
             <Link to='/resetpassword'><h6>UpdatePassword</h6></Link>
            </div>
        </div>
    )
}

export default DeleteMyRecord;