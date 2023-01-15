import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

function AddEmployeeComponent() {

    const [_firstName, setfirstName]= useState('');
    const [_lastName, setLastName]= useState('');
    const [_emailId, setEmailId]= useState('');
    const navigate  = useNavigate();
    const {id} = useParams();


    const saveOrUpdateEmployee = (e) =>
    {
        e.preventDefault();

        const employee = {_firstName, _lastName, _emailId}

        if(id){
            EmployeeService.updateEmployee(id,employee).then((response)=>
            {
                navigate("/employees");
            })
            .catch(error=>
            {
                console.log(error);
            });
        }
        else
        {
            EmployeeService.createEmployee(employee).then((response) => 
            { 
                console.log(response)
                navigate("/employees");
            })
            .catch(error => 
            {
                console.log(error)
            });
        }
        
    }

    useEffect(() => {
    EmployeeService.getEmployeeById(id).then(response=>
        {
            setfirstName(response.data._firstName)
            setLastName(response.data._lastName)
            setEmailId(response.data._emailId)
        }).catch(error=> console.log(error))  
    
    }, [])
    
const title = () =>{
    if(id){
        return <h2 className='text-center'>Update Employee</h2>
    }else{
        return <h2 className='text-center'>Add Employee</h2>
    }
}
  return (
    <div>
        <br></br>
        <br></br>
        <div className='container'>
            <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        {
                            title()
                        }
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'> First Name :</label>
                                    <input type = "text" placeholder='Enter First Name' name='firstName' className='form-control' value={_firstName} onChange = {(e) => setfirstName(e.target.value)}></input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'> Last Name :</label>
                                    <input type = "text" placeholder='Enter Last Name' name='lastName' className='form-control' value={_lastName} onChange = {(e) => setLastName(e.target.value)}></input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'> Email :</label>
                                    <input type = "email" placeholder='Enter Email' name='emailId' className='form-control' value={_emailId} onChange = {(e) => setEmailId(e.target.value)}></input>
                                </div>
                                <button className='btn btn-success' onClick={(e) => saveOrUpdateEmployee(e)}>Submit</button>
                                <Link to = "/employees" className='btn btn-danger'>Cancel</Link>
                            </form>

                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default AddEmployeeComponent