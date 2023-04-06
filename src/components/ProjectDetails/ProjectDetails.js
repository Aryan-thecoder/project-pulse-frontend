import React,{useEffect,useState} from 'react'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ProjectDetails() {
  let token = sessionStorage.getItem('token');
  let navigate = useNavigate();
  let {userObj} = useSelector(state=>state.login);
  console.log("userobj",userObj)
  let [top,setTop] = useState({});
  let [details,setDetails]=useState({});
  let [updates,setUpdates] = useState([]);
  let [team,setTeam] = useState([]);
  let [concerns,setConcerns] = useState([]);
  let { state } = useLocation();
  console.log('state in use location',state)
  useEffect(()=>{
    console.log("use effect renders")
    if(token===null){
      navigate('/login')
    }
    else{
      getData()
    }
  },[])
  const getData = async() =>{
    let result;
    if(userObj.user_role==="Project Manager"){
      result=await axios.get(`http://localhost:9999/projectManager-api/get-projects-by-id/projectId/${state.project_id}/projectManagerId/${state.projectManager_id}`,{
        headers: {Authorization: `bearer ${token}`}
      })
    }
    else if(userObj.user_role==="Admin"){
      result=await axios.get(`http://localhost:9999/admin-api/get-projects-by-id/${state.project_id}`,{
        headers: {Authorization: `bearer ${token}`}
      })
    }
    else if(userObj.user_role==="GDO Head"){
      result=await axios.get(`http://localhost:9999/gdoHead-api/get-projects-by-id/projectId/${state.project_id}/gdoId/${state.gdoHead_id}`,{
        headers: {Authorization: `bearer ${token}`}
      })
    }
    if(result.data.payload){
      setDetails(result.data.payload)
      setTeam(result.data.payload.team_compositions);
      setUpdates(result.data.payload.project_updates)
      setConcerns(result.data.payload.project_concerns)
      setTop(result.data)
      console.log("result in project detail",result.data)
      console.log("details in project detail",state)
    }
  }
  console.log("rendering again")
  return (
    <div className='text-white'>
      <center>
        <br/>
        <br/>
      <div className='row'>
        <div className='col'>
        <div class="card text-dark" style={{width: "18rem", boxShadow:"10px 10px 20px black"}}>
        <div class={top.projectFitness==='Amber'?("card-body bg-warning"):((top.projectFitness==='Red'?('card-body bg-danger'):("card-body bg-success")))}>
          <h2 class="card-title">Project Fitness</h2>
          <h5 className='card-text'>{top.projectFitness}</h5>
        </div>
      </div>
        </div>
        <div className='col'>
        <div class="card text-dark" style={{width: "18rem",boxShadow:"10px 10px 20px black",borderRadius:"10px"}}>
        <div class="card-body">
          <h2 class="card-title">Concerns</h2>
          <h5 className='card-text'>{top.concernsIndicator}</h5>
        </div>
      </div>
        </div>
        <div className='col'>
        <div class="card text-dark" style={{width: "18rem",boxShadow:"10px 10px 20px black",borderRadius:"10px"}}>
        <div class="card-body">
          <h2 class="card-title">Team Members</h2>
          <h5 className='card-text'>{top.teamSize}</h5>
        </div>
      </div>
        </div>
      </div>
      </center>
      <div className='row p-3 mt-5'>
      <p className='display-4 text-center mb-4' style={{textShadow:"10px 10px 20px black"}}>Project Details</p>
        <div class="card bg-dark border-secondary" style={{boxShadow:"5px 5px 20px black",borderRadius:"20px"}}>
          <div class="card-body">
            <div className='row'>
              <div className='col'>
              <ul class="list-group">
                <li class="list-group-item bg-dark border-dark text-white"><b>Project Id : </b><b style={{color:"skyblue"}}>{details.project_id}</b></li>
                <li class="list-group-item bg-dark border-dark text-white"><b>Project Name : </b><b style={{color:"skyblue"}}>{details.project_name}</b></li>
                <li class="list-group-item bg-dark border-dark text-white"><b>Client : </b><b style={{color:"skyblue"}}>{details.client}</b></li>
                <li class="list-group-item bg-dark border-dark text-white"><b>Client Account Manager : </b><b style={{color:"skyblue"}}>{details.client_account_manager}</b></li>
                <li class="list-group-item bg-dark border-dark text-white"><b>Project Status : </b><b style={{color:"skyblue"}}>{details.project_status}</b></li>
                </ul>
              </div>
              <div className='col'>
              <ul class="list-group">
              <li class="list-group-item bg-dark border-dark text-white"><b>Project Start Date : </b><b style={{color:"skyblue"}}>{details.project_start_date}</b></li>
              <li class="list-group-item bg-dark border-dark text-white"><b>Project End Date : </b><b style={{color:"skyblue"}}>{details.project_end_date}</b></li>
              <li class="list-group-item bg-dark border-dark text-white"><b>Project Fitness Indicator : </b><b style={{color:"skyblue"}}>{details.project_fitness_indicator}</b></li>
              <li class="list-group-item bg-dark border-dark text-white"><b>Project Domain : </b><b style={{color:"skyblue"}}>{details.project_domain}</b></li>
              <li class="list-group-item bg-dark border-dark text-white"><b>Project Type : </b><b style={{color:"skyblue"}}>{details.project_type}</b></li>
                </ul>
              </div>
              <div className='col'>
              <ul class="list-group">
            <li class="list-group-item bg-dark border-dark text-white"><b>Team Size : </b><b style={{color:"skyblue"}}>{details.team_size}</b></li>
            <li class="list-group-item bg-dark border-dark text-white"><b>GDO Head Id : </b><b style={{color:"skyblue"}}>{details.gdoHead_id}</b></li>
            <li class="list-group-item bg-dark border-dark text-white"><b>Project Manager Id : </b><b style={{color:"skyblue"}}>{details.projectManager_id}</b></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <p className='display-4 text-center' style={{textShadow:"10px 10px 20px black"}}>Project Updates</p>
      <table class="table table-bordered text-white text-center" style={{border:"white"}}>
        <thead className='text-dark' style={{backgroundColor:"skyblue"}}>  
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Date</th>
              <th scope="col">Project Status Update</th>
              <th scope="col">Schedule Status</th>
              <th scope="col">Resourcing Status</th>
              <th scope="col">Quality Status</th>
              <th scope="col">Waiting for Client Inputs</th>
              <th scope="col">Project Id</th>
              <th scope="col">Project Manager Id</th>
              <th scope="col">Edit Update</th>
              <th scope="col">Delete Update</th>
            </tr>
          </thead>
          <tbody>
          {updates?.map((updateObj,index) => (
            <tr>
              <td>{updateObj.id}</td>
              <td>{updateObj.date}</td>
              <td>{updateObj.project_status_update}</td>
              <td>{updateObj.schedule_status}</td>
              <td>{updateObj.resourcing_status}</td>
              <td>{updateObj.quality_status}</td>
              <td>{updateObj.waiting_for_client_inputs}</td>
              <td>{updateObj.project_id}</td>
              <td>{updateObj.projectManager_id}</td>
              <td><button className='btn btn-warning'>Edit</button></td>
              <td><button className='btn btn-danger'>Delete</button></td>
            </tr>
          ))}  
          </tbody>
      </table>
      <br/>
      <p className='display-4 text-center' style={{textShadow:"10px 10px 20px black"}}>Project Concerns</p>
      <table class="table table-bordered text-white text-center" style={{border:"white"}}>
      <thead className='text-dark' style={{backgroundColor:"skyblue"}}>  
          <tr>
          <th scope="col">Id</th>
            <th scope="col">Project</th>
            <th scope="col">Concern Description</th>
            <th scope="col">Concern Raised By</th>
            <th scope="col">Concern Raised Date</th>
            <th scope="col">Concern Severity</th>
            <th scope="col">Concern from Client</th>
            <th scope="col">Concern Status</th>
            <th scope="col">Concern Mitigated Date</th>
            <th scope="col">Project Id</th>
            <th scope="col">Project Manager Id</th>
            <th scope="col">Edit Concern</th>
            <th scope="col">Delete Concern</th>
          </tr>
        </thead>
        <tbody>
        {concerns?.map((concernObj,index) => (
        <tr>
            <td>{concernObj.id}</td>
            <td>{concernObj.project_name}</td>
            <td>{concernObj.concern_description}</td>
            <td>{concernObj.concern_raised_by}</td>
            <td>{concernObj.concern_raised_date}</td>
            <td>{concernObj.concern_severity}</td>
            <td>{concernObj.concern_from_client}</td>
            <td>{concernObj.concern_status}</td>
            <td>{concernObj.concern_mitigated_date}</td>
            <td>{concernObj.project_id}</td>
            <td>{concernObj.projectManager_id}</td>
            <td><button className='btn btn-warning'>Edit</button></td>
            <td><button className='btn btn-danger'>Delete</button></td>
          </tr>
        ))}  
        </tbody>
      </table>
      <br/>
      <p className='display-4 text-white text-center' style={{textShadow:"10px 10px 20px black"}}>Team Composition</p>
      <table class="table table-bordered text-white text-center" style={{border:"white"}}>
        <thead className='border-white text-dark' style={{backgroundColor:"skyblue"}}>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Resource Name</th>
            <th scope="col">Project Role</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Status</th>
            <th scope="col">Billing Status</th>
            <th scope="col">Customer Exposed Status</th>
            <th scope="col">Allocation Type</th>
            <th scope="col">Project Id</th>
            <th scope="col">Emp Id</th>
          </tr>
        </thead>
        <tbody>
        {team?.map((teamObj,index) => (
        <tr>
            <th>{teamObj.id}</th>
            <th>{teamObj.resource_name}</th>
            <td>{teamObj.project_role}</td>
            <td>{teamObj.start_date}</td>
            <td>{teamObj.end_date}</td>
            <td>{teamObj.status}</td>
            <td>{teamObj.billing_status}</td>
            <td>{teamObj.customer_exposed_status}</td>
            <td>{teamObj.allocation_type}</td>
            <td>{teamObj.project_id}</td>
            <td>{teamObj.emp_id}</td>
          </tr>
        ))}  
        </tbody>
      </table>
      </div> 
  )
}




export default ProjectDetails