import Login from "./components/Login"
import Income from "./components/Income";
import Expense from "./components/Expense";
import DashBoard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import { FaBars } from "react-icons/fa";
import { BrowserRouter,Routes,Route, Link } from "react-router-dom";
import { UserNameContext } from "./components/context";
import  "./components/dashboard.css"
import { useState } from "react";

import "./App.css"
function App() {
  const Nav = ()=>{
         return (
             <div>
                 <nav className='NavBar'>
                     <ul >
                         <li> <FaBars /></li>
                         <li className="Logo"> Expense Tracker</li>
                         
                         <li onClick={()=>{
                            
                         }}><Link to="/">DashBoard</Link></li>
                         <li onClick={()=>{
                            
                         }}><Link to="/Income">Income</Link></li>
                         <li onClick={()=>{
                           
                         }}><Link to="/Expenses">Expenses</Link></li>
                         <li onClick={()=>{
                         }}><Link to="/Login">Login</Link></li>
                         
                     </ul>
                 </nav>
             </div>
         )
     }
    const [currentUserName,setCurrentUserName] = useState(null);
  return (
    <>
      {/* <Login /> */}
      {/* <Income /> */}
      {/* <Expense /> */}
      <UserNameContext.Provider value={[currentUserName,setCurrentUserName]}>
        <BrowserRouter>
            <Nav />
            <div className="routes">
                <Routes>
                    <Route path="/" element={<DashBoard />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Income" element={<Income />} />
                    <Route path="/Expenses" element={<Expense />} />
                    <Route path='/SignUp' element={<SignUp />} />
                </Routes>
            </div>
            </BrowserRouter>
      </UserNameContext.Provider>
    
   
    </>
  )
}

export default App
