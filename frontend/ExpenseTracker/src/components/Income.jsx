import { useState,useContext,useEffect } from "react";
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import {BarChart} from "./BarChart.jsx";
import { FaChevronLeft } from "react-icons/fa"
import axios from 'axios';
import "./income.css"
import { UserNameContext } from "./context.jsx";
Chart.register(CategoryScale);

export default function Income()
{
  const [incomeData,setIncomeData] = useState([]);
  const [chartData,setChartData] = useState({
    labels: incomeData.map((data) => data.date), 
    datasets: [
      {
        label: "You earned ",
        data: incomeData.map((data) => data.income),
        backgroundColor: [
          "rgba(202, 143, 229, 1)",
          "rgb(163, 24, 214)",
        ],
        borderColor: "black",
        borderWidth: 1
      }
    ]
  })
  const [user,setUser] = useContext(UserNameContext);
  
  const [incomeAdded,setIncomeAdded] = useState(0);
  useEffect(()=>{
    axios.get("http://localhost:8080/api/income")
    .then((res)=>{setIncomeData(res.data);
      setChartData({
        labels: res.data.map((data) => data.date), 
    datasets: [
      {
        label: "You earned ",
        data: res.data.map((data) => data.income),
        backgroundColor: [
          "rgba(202, 143, 229, 1)",
          "rgb(163, 24, 214)",
        ],
        borderColor: "black",
        borderWidth: 1
      }
    ]
      })
    })
    .catch((err)=>{console.error(err)})
  },[incomeAdded])
  
  const AddIncomeForm= ()=>{
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
          axios.post("http://localhost:8080/api/income",{
            date:stringDate,
            income: amount,
            incomeSource: amountSource
          })
          .then(()=>{
            alert("Income Added Successfully");
            setIncomeAdded(prev => prev+1)
            setAmount(0);
            setDate(null);
            setAmountSource("");
            setAmountError("");
            setDateError("");
            setSourceError("");
            setHasBeenClicked(false)
          }).catch(err=>{
            alert(err);
          })
          
        }} >
          <FaChevronLeft className="goBack" onClick={()=>{
            setHasBeenClicked(false);
          }}/>
          <div className="amount">
            <label for="amount">Enter Amount Received:</label><br/>
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
            <label for="date">Enter Date Received:</label><br/>
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
            <label for="source">Enter Source
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
    
  const style={
    "maxWidth":"800px",
    "maxHeight":"300px"
  }
  const handleDelete=(_id)=>{
    axios.delete(`http://localhost:8080/api/income/${_id}`)
    .then(()=>{
      alert("Removed Successfully")
      setIncomeAdded(prev => prev-1);
    }).catch(err=>{
      console.log(err)
    })
  }
  const [hasBeenClicked,setHasBeenClicked] = useState(false)
  return(
    <div className="Income">{user ?
      <div className={hasBeenClicked?"contentBlur":"content"}>
        <div className="Chart">
        <h1 className="h1">Income</h1>
        {incomeData.length>0 ? <BarChart chartData={chartData} text="Income earned this month"/> : <p>Add Some Income source to get started</p>}
      </div>
      <div className="IncomeSources" >
        <div className="AddIncome">
          <h2>Income Sources</h2>
          <button type="button" onClick={AddIncomeForm}>Add Income Source</button>
        </div>
        
        { incomeData.length>0 && incomeData.map((data)=>
        <div className="source" key={data._id}>
          <h3>{data.date}</h3>
          <p>You earned <span className="dataIncomeSpan">₹{data.income} </span> from <span className="incomeSourceSpan">{data.incomeSource}</span></p>
          <button type="button" onClick={()=>handleDelete(data._id)}>Remove</button>
        </div>
        )}
      </div>
      
      </div> : <p>Please Login</p> }
      {hasBeenClicked && <AddIncomeForm />} 
    </div>
    
  )
}