import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState,useContext,useEffect} from 'react';
import { UserNameContext } from './context';
import SignUp from './SignUp';
import axios from 'axios';
ChartJS.register(ArcElement, Tooltip, Legend);
export default function  DashBoard()
{
    
    const [user,setUser] = useContext(UserNameContext);
    const [incomeData,setIncomeData] = useState([]);
    const [expenseData,setExpenseData] = useState([]);

    const Dnut = (props)=>{
        const style={
            "maxWidth":"400px",
            "maxHeight":"400px"
        }
        return(
            <div className="dough">
                <Doughnut style={style} data = {{
      labels: props.labels,
      datasets: [
        {
          label: props.label,
          data: props.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1.25,
        },
      ],}} />
            </div>
        )
    }
    
    let totalIncome=0;
    let totalExpenses=0;
   useEffect(()=>{
        axios.get("http://localhost:8080/api/income")
        .then((res)=>{
            setIncomeData(res.data)
        }).catch(err=>{
            console.log(err)
        });
        axios.get("http://localhost:8080/api/expense")
        .then(res=>{
            setExpenseData(res.data);
        }).catch(err=>{
            console.log(err);
        })
    }, [])
    incomeData.forEach((data)=>{
        totalIncome += data.income;
    });
    expenseData.forEach((data)=>{
        totalExpenses += data.expense;
    })
    return (
        
        <div className="Dashboard">
            
             { 
             user ? <div className="mainContent">
                <h1>Hello , {user}</h1>
                <h3>Welcome to Expense Tracker</h3>
                {totalIncome>0 && totalExpenses>0 ? <Dnut className="doughnut" labels={["Income","Expenses","Savings"]} data={[totalIncome,totalExpenses,(totalIncome-totalExpenses)]} label="Monthly Expenditure"/> : <p>You need both income and expenses to generate the chart</p>}
            </div>
            :
            <div className='mainContent'><p>Please Login</p></div>
        }
        
           
        </div>

    )
}