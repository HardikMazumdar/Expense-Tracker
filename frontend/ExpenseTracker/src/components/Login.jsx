import {useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import "email-validator";
import "./login.css"
import { validate } from 'email-validator';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { UserNameContext } from './context';
import axios from 'axios';
export default function Login()
{
    
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [nameError,setnameError] = useState("");
    const [emailError,setemailError] = useState("");
    const [passwordError,setpasswordError] = useState("");
    const [type,setType]=useState('password');
    const [Show,setShow] = useState(FiEye);
    const handleNameChange = (e)=>{
        setname(e.target.value);
        if (e.target.value==="")
        {
            setnameError("Name cannot be left blank")
        }
        else
        {
            setnameError("")
        }
    };
    const handleEmailChange = (e)=>{
        setemail(e.target.value);
        if (validate(e.target.value))
        {
            setemailError("")
        }
        else
        {
            setemailError("Email ID is invalid")
        }
    };
    const handlePwdChange = (e)=>{
        setpassword(e.target.value);
        if(e.target.value === "")
        {
            setpasswordError("Password is compulsory")
        }
        else
        {
            setpasswordError("")
        }
    }
    const toggleState=()=>{
        if (type==='password')
        {
            setType('text');
            setShow(FiEyeOff);
        }
        else
        {
            setType('password');
            setShow(FiEye);
        }
    }
     const navigate= useNavigate();
     const [user,setUser] = useContext(UserNameContext);
    return (
        <div className="loginForm">
            <h3>LOGIN FORM</h3>
            <form method="post" onSubmit={(e)=>{
                e.preventDefault();
                axios.post("http://localhost:8080/api/login",{name,email,password})
                .then(()=>{
                   
                    alert("Logged in Successfully");
                    
                setUser(name);
                setname("");
                setemail("");
                setpassword("");
                setShow(FiEye);
                setnameError("");
                setemailError("");
                setpasswordError("");
                setType("password");
                    navigate("../")

                }).catch((err)=>{
                    alert(err);
                })
                
                
            }} >
                <div className='name'>
                    <label htmlFor="name">Name</label><br/>
                < input type="text" id="name" name="name" value={name} onChange={handleNameChange} placeholder="Enter your name" /><br/>
                <span className="error">{nameError }</span>
                </div>
                
                <div className='email'>
                    <label htmlFor="email">Email</label><br/>
                < input type="email" id="email" name="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" /><br/>
                <span className="error">{emailError }</span>
                </div>
                
                <div className='password'>
                    <label htmlFor="pwd">Password</label><br/>
                    <div className="passwordInput">
                        < input type={type} id="pwd" name="pwd" value={password} onChange={handlePwdChange}  />
                        <span className='icon' onClick={toggleState}>{Show}</span>
                    </div>
                    
                    <br/>
                    <span className="error">{passwordError }</span>
                </div>
                
                <div className='submitbutton'>
                    <button type="submit" disabled={(name === "" || password === "" || (email === "" && !(emailError==="")))} >Submit</button>
                </div>
                
                </form>
                <p id="a1">Don't have an account ? <Link to="/SignUp">Sign Up</Link>   </p>
                
                 
            </div>
    )
}