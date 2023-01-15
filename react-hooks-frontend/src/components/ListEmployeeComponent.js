import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {

        getAllEmployees();
    }, [])
    
const getAllEmployees = () =>{
    EmployeeService.getAllEmployees().then((response) =>
    {
        setEmployees(response.data);
        console.log(response.data);
    }).catch(error =>{ console.log(error)})

}

const deleteEmployee = (id)=>
{
    EmployeeService.deleteEmployee(id).then((response) => 
    {
        getAllEmployees();
    })
    .catch(error => console.log(error));
}




 


  return (
    <div className='container'>
        <h2 className='text-center'>List Employees</h2>
        <Link to ="/add-employee" className ="btn btn-primary mb-2">Add Employee</Link>
        <table className='table table-bordered table-stripped'>
            <thead>
                <th>Employee ID</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email ID</th>
                <th>Actions</th>

            </thead>
            <tbody>
                {
                    employees.map(
                        employee => 
                        <tr key = {employee._id}>
                               <td>{employee._id}</td>
                               <td>{employee._firstName}</td> 
                               <td>{employee._lastName}</td> 
                               <td>{employee._emailId}</td> 
                               <td>
                                <Link className='btn  btn-info' to = {`/edit-employee/${employee._id}`}>Update</Link>
                                <Link className='btn  btn-danger' onClick={()=>deleteEmployee(employee._id)} style= {{marginLeft:"10px"}}>Delete</Link>
                               </td> 
                               
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent