import { useState,useContext,useEffect } from "react";
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import {BarChart} from "./BarChart.jsx";
import { FaChevronLeft } from "react-icons/fa";
import { UserNameContext } from "./context.jsx";
import axios from "axios";
import "./income.css"
Chart.register(CategoryScale);

export default function Expense()
{
  const [user,setUser] = useContext(UserNameContext);
  const [isExpenseAdded,setIsExpenseAdded] = useState(0);
  const [expenseData,setExpenseData] = useState([]);
  const AddExpenseForm= ()=>{
    setHasBeenClicked(true)
    const [amount,setAmount] = useState(0);
    const [date,setDate] = useState(null);
    const [amountSource,setAmountSource] = useState("");
    const [amountError,setAmountError] = useState("");
    const [dateError,setDateError]  = useState("");
    const [sourceError,setSourceError] = useState("");

    return (
      <div className='AddIncomeSourceForm'>
        <form onSubmit={(e)=>{
          e.preventDefault();
          const stringDate = date.toString();
          axios.post("http://localhost:8080/api/expense",{
            date:stringDate,
            expense: amount,
            on: amountSource
          }).then(()=>{
            alert("Expense Added Successfully");
            setIsExpenseAdded(prev => prev+1);
            setAmount(0);
            setDate(null);
            setAmountSource("");
            setDateError("");
            setAmountError("");
            setSourceError("");
            setHasBeenClicked(false);
          }).catch(err=>{
            alert(err);
          })
          
        }} >
          <FaChevronLeft className="goBack" onClick={()=>{
            setHasBeenClicked(false);
          }}/>
          <div className="amount">
            <label for="amount">Enter Amount Spent:</label><br/>
            <input type="number" id="amount" name="amount" value={amount} 
            onChange={(e)=>{
              setAmount(e.target.value);
              if ((e.target.value)<=0)
              {
                setAmountError("Invalid Amount !!!")
              }
              else
              {
                setAmountError("")
              }
            }} />
            <span className="error">{amountError}</span>
          </div>
          <div className="dateReceived">
            <label for="date">Enter Date:</label><br/>
            <input type="date" id="date" name="date" value={date} 
            onChange={(e)=>{
              setDate(e.target.value);
              let dateToday = new Date();
              dateToday=dateToday.getTime();
              const givenDate = (new Date(e.target.value)).getTime();
              if (givenDate>dateToday)
              {
                setDateError("Date Cannot be in Future");
              }
              else
              {
                setDateError("")
              }
            }} />
            <span className="error">{dateError}</span>
          </div>
          <div className="amountSource">
            <label for="source">You spent your amount on : 
            </label><br/>
            <input type="text" id="source" name="source" value={amountSource}
            onChange={(e)=>{
              setAmountSource(e.target.value);
              if (e.target.value==="")
              {
                setSourceError("Source cannot be Empty");
              }
              else
              {
                setSourceError("")
              }
            }} />
            <span className="error">{sourceError}</span>
          </div>
          <div className="submitButton">
            <button type="submit" disabled={!(sourceError==="" && dateError==="" && amountError==="") || (amount <=0 || date==null || amountSource==="") }>Add Source</button>
          </div>
        </form>
      </div>
    )
  }
    const [chartData,setChartData] = useState({
    labels: expenseData.map((data) => data.date), 
    datasets: [
      {
        label: "You spent",
        data: expenseData.map((data) => data.expense),
        backgroundColor: [
          "rgba(202, 143, 229, 1)",
          "rgb(163, 24, 214)",
        ],
        borderColor: "black",
        borderWidth: 1
      }
    ]
  })
  useEffect(()=>{
    axios.get("http://localhost:8080/api/expense")
    .then((res)=>{
      setExpenseData(res.data);
      setChartData({
    labels: res.data.map((data) => data.date), 
    datasets: [
      {
        label: "You spent",
        data: res.data.map((data) => data.expense),
        backgroundColor: [
          "rgba(202, 143, 229, 1)",
          "rgb(163, 24, 214)",
        ],
        borderColor: "black",
        borderWidth: 1
      }
    ]
  })
     }).catch(err=>{console.log(err)});
  },[isExpenseAdded]);

  const style={
    "maxWidth":"800px",
    "maxHeight":"300px"
  }
  const handleDelete = (_id)=>{
    axios.delete(`http://localhost:8080/api/expense/${_id}`)
    .then(()=>{
      alert("Removed Successfully");
      setIsExpenseAdded(prev => prev-1);
    }).catch(err=>alert(err));
  }
  const [hasBeenClicked,setHasBeenClicked] = useState(false)
  return(
    <div className="Income">{user ? 
      <div className={hasBeenClicked?"contentBlur":"content"}>
        <div className="Chart">
        <h1 className="h1">Expenses</h1>
        {expenseData.length>0 ? <BarChart chartData={chartData} text="Expenses for this month"/> : <p>Enter Some Expenses to get started</p>}
      </div>
      <div className="IncomeSources" >
        <div className="AddIncome">
          <h2>Expenses</h2>
          <button type="button" onClick={AddExpenseForm}>Add Expense</button>
        </div>
        
        {expenseData && expenseData.map((data)=>
        <div className="source" key={data._id}>
          <h3>{data.date}</h3>
          <p>You spent <span className="dataIncomeSpan">₹{data.expense} </span> on <span className="incomeSourceSpan">{data.on}</span></p>
          <button type="button" onClick={()=>handleDelete(data._id)}>Remove</button>
        </div>
        )}
      </div>
      
      </div> : <p>Please Login</p>}
      {hasBeenClicked && <AddExpenseForm />}
    </div>
    
  )
}