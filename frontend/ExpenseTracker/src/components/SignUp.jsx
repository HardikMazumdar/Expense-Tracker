import {useState} from 'react'
import "email-validator";
import "./signup.css"
import { validate } from 'email-validator';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import axios from 'axios'
export default function SignUp(props)
{
    props.function(true)
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [checkPassword,setCheckPassword] = useState("");
    const [nameError,setnameError] = useState("");
    const [emailError,setemailError] = useState("");
    const [passwordError,setpasswordError] = useState("");
    const [checkPasswordError,setCheckPasswordError] = useState("");
    const [type1,setType1]=useState('password');
    const [type2,setType2]=useState('password');
    const [Show1,setShow1] = useState(FiEye);
    const [Show2,setShow2] = useState(FiEye);
    const [color,setColor] = useState("red");
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
        if(e.target.value=== checkPassword)
        {
            setCheckPasswordError("Password Matches !!");
                setColor("green")
        }
        else
        {
            setCheckPasswordError("Password does not match");
            setColor("red")
        }
    }
    const checkPasswordIsMatching=(e)=>{
            setCheckPassword(e.target.value);
            
            if (e.target.value !== password)
            {
                setCheckPasswordError("Password does not match");
                setColor("red")
            }
            else
            {
                setCheckPasswordError("Password Matches !!");
                setColor("green")
            }
    }
    const toggleState1=()=>{
        if (type1==='password')
        {
            setType1('text');
            setShow1(FiEyeOff);
        }
        else
        {
            setType1('password');
            setShow1(FiEye);
        }
    }
    const toggleState2=()=>{
        if (type2==='password')
        {
            setType2('text');
            setShow2(FiEyeOff);
        }
        else
        {
            setType2('password');
            setShow2(FiEye);
        }
    }
    const style={
        "color":color,
    }
    return (
        <div className="SignUpForm">
            <h3>SIGN UP</h3>
            <form method="post" onSubmit={(e)=>{
                e.preventDefault();
                axios.post("http://localhost:8080/api/SignUp",{name,email,password})
                .then((res)=>{
                    alert("User registered successfully")
                    setname("");
                setemail("");
                setpassword("");
                setCheckPassword("");
                setemailError("");
                setnameError("");
                setpasswordError("");
                setCheckPasswordError("");
                setColor("red");
                setType1("password");
                setType2("password");
                setShow1(FiEye);
                setShow2(FiEye);
                }).catch((err)=>{
                    alert(`Error: ${err}`)
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
                    <label htmlFor="pwd">Enter a Password of your Choice</label><br/>
                    <div className="passwordInput">
                        < input type={type1} id="pwd" name="pwd" value={password} onChange={handlePwdChange}  />
                        <span className='icon' onClick={toggleState1}>{Show1}</span>
                    </div>
                    
                    <br/>
                    <span className="error">{passwordError }</span>
                </div>
                
                <div className='password'>
                    <label htmlFor="pwd">Confirm Password:</label><br/>
                    <div className="passwordInput">
                        < input type={type2} id="pwd" name="pwd" value={checkPassword} onChange={checkPasswordIsMatching}  />
                        <span className='icon' onClick={toggleState2} >{Show2}</span>
                    </div>
                    
                    <br/>
                    <span className="error" style={style}>{checkPasswordError }</span>
                </div>
                <div className='submitbutton'>
                    <button type="submit" disabled={(name === "" || password === "" || (email === "" && !(emailError===""))) && !(checkPasswordError=="Password Matches !!") } >Sign Up</button>
                </div>
                
                </form>   
            </div>
    )
}