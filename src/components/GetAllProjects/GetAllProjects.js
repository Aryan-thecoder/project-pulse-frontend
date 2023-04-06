import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../../slices/loginSlice'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearState } from '../../slices/loginSlice';
import Modal from "react-bootstrap/Modal";
import { Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
function GetAllProjects() {
    const {userObj} = useSelector(state=>state.login);
    let token = sessionStorage.getItem('token');
    let navigate = useNavigate();
    let [projects,setProjects]=useState([]);
    useEffect(()=>{
        if(token===null){
          navigate('/login')
        }
        else{
            getData()
        }
      },[])
      const getData = async() =>{
        let result="";
        console.log("userObj from get projects",userObj)
        if(userObj.user_role=="Project Manager"){
            result=await axios.get(`http://localhost:9999/projectManager-api/get-projects/${userObj.specialUsers_id}`,{
            headers: {Authorization: `bearer ${token}`}
          })
        }
        else if(userObj.user_role=="Admin"){
            result=await axios.get(`http://localhost:9999/admin-api/get-projects`,{
            headers: {Authorization: `bearer ${token}`}
          })
        }
        else if(userObj.user_role=="GDO Head"){
            result=await axios.get(`http://localhost:9999/gdoHead-api/get-projects/${userObj.specialUsers_id}`,{
            headers: {Authorization: `bearer ${token}`}
          })
        }
        setProjects(result.data.payload)
      }  
  return (
    <div>
        <div className='row text-center p-3'>
        <table class="table table-bordered text-white" style={{border:"white"}}>
          <thead className='text-dark' style={{backgroundColor:"#0074B7"}}>  
            <tr>
              <th scope="col">Project Id</th>
              <th scope="col">Project Name</th>
              <th scope="col">Client</th>
              <th scope="col">Client Account Manager</th>
              <th scope="col">Status</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Fitness Indicator</th>
              <th scope="col">Domain</th>
              <th scope="col">Project Type</th>
              <th scope="col">Team Size</th>
              <th scope="col">GDO Head Id</th>
              <th scope="col">Project Manager Id</th>
              <th scope="col">Project Details</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((projectObj,index) => (
            <tr>
                <th>{projectObj.project_id}</th>
                <td>{projectObj.project_name}</td>
                <td>{projectObj.client}</td>
                <td>{projectObj.client_account_manager}</td>
                <td>{projectObj.project_status}</td>
                <td>{projectObj.project_start_date}</td>
                <td>{projectObj.project_end_date}</td>
                <td>{projectObj.project_fitness_indicator}</td>
                <td>{projectObj.project_domain}</td>
                <td>{projectObj.project_type}</td>
                <td>{projectObj.team_size}</td>
                <td>{projectObj.gdoHead_id}</td>
                <td>{projectObj.projectManager_id}</td>
                <td><button className='btn btn-warning' style={{boxShadow:"2px 2px 5px black"}} onClick={()=>navigate(`/project-details/${projectObj?.project_id}`, { state: projectObj })}>Details</button></td>
              </tr>
            ))}  
          </tbody>
        </table>
      </div>  
    </div>
  )
}

export default GetAllProjects