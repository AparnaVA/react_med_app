import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Signup() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [password_confirmation, setPassword_confirmation] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    function registerUser(){
        var user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }
        axios.post('https://medicalstore.mashupstack.com/api/register',user).then(response=>{
            setErrorMessage('');
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Failed to connect to api');
            }
        })
    }
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 style={{color:"blueViolet",textAlign:"center",marginTop:"30px"}}>Register</h1>
                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text"
                        className="form-control"
                        value={name}
                        onInput={(event)=>setName(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text"
                        className="form-control"
                        value={email}
                        onInput={(event)=>setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password"
                        className="form-control"
                        value={password}
                        onInput={(event)=>setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password"
                        className="form-control"
                        value={password_confirmation}
                        onInput={(event)=>setPassword_confirmation(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={registerUser}>Submit</button>
                    </div>
                </div>
                <p style={{marginLeft:"200px"}}>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    </div>
}

export default Signup;