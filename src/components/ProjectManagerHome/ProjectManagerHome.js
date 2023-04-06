import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../../slices/loginSlice'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearState } from '../../slices/loginSlice';
import Modal from "react-bootstrap/Modal";
import { Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import GetAllProjects from '../GetAllProjects/GetAllProjects';


function ProjectManagerHome() {
  const {userObj} = useSelector(state=>state.login);
  let token = sessionStorage.getItem('token');
  let navigate = useNavigate();
  let [state,setState] = useState("");
  let [projects,setProjects]=useState([]);
  let [updates,setUpdates]=useState([]);
  let [concerns,setConcerns]=useState([]);
  let [deletedConcern,setDeletedConcern]=useState("");
  let [deletedUpdate,setDeletedUpdate]=useState("");
  const [showConcernsModal, setShowConcernsModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditConcernsModal, setShowEditConcernsModal] = useState(false);
  const [modifyToScreen, setModifyToScreen] = useState(state);
  const [modifyConcernToScreen, setModifyConcernToScreen] = useState("");
  const [modifyEditConcernToScreen, setModifyEditConcernToScreen] = useState("");
  useEffect(()=>{
    if(token===null){
      navigate('/login')
    }
    else{
      getData2()
      getData3()
    }
  },[modifyEditConcernToScreen,modifyToScreen,modifyConcernToScreen,showConcernsModal,showModal,showEditConcernsModal, deletedConcern, deletedUpdate])
  const getData2 = async() =>{
    let result=await axios.get(`http://localhost:9999/projectManager-api/get-all-updates/${userObj.specialUsers_id}`,{
      headers: {Authorization: `bearer ${token}`}
    })
    setUpdates(result.data.payload)
    // console.log("update",updates);
    // console.log("result",result);
  }
  const getData3 = async() =>{
    let result=await axios.get(`http://localhost:9999/projectManager-api/get-all-concerns/${userObj.specialUsers_id}`,{
      headers: {Authorization: `bearer ${token}`}
    })
    // console.log("concerns",result);
    setConcerns(result.data.payload)
  }
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openConcernModal = () => setShowConcernsModal(true);
  const closeConcernModal = () => setShowConcernsModal(false);
  const openEditConcernModal = () => setShowEditConcernsModal(true);
  const closeEditConcernModal = () => setShowEditConcernsModal(false);
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch();
  const editUser = () => {
    openModal();
    // set already put data to input fields, this uses name property of react-hook-form
    // set values to input field
  };
  const createConcern = () =>{
    openConcernModal();
  }
  const updateConcern = (index) =>{
    openEditConcernModal();
    setValue("id", concerns[index].id);
    setValue("project", concerns[index].project);
    setValue("concern_description", concerns[index].concern_description);
    setValue("concern_raised_by", concerns[index].concern_raised_by);
    setValue("concern_raised_date", concerns[index].concern_raised_date);
    setValue("concern_severity", concerns[index].concern_severity);
    setValue("concern_from_client", concerns[index].concern_from_client);
    setValue("concern_status", concerns[index].concern_status);
    setValue("concern_mitigated_date", concerns[index].concern_mitigated_date);
    setValue("project_id", concerns[index].project_id);
    setValue("projectManager_id", concerns[index].projectManager_id);
  }
  const deleteConcern = async (id) => {
    let res = await axios.delete(`http://localhost:9999/projectManager-api/delete-project-concern/${id}`,{
      headers: {Authorization: `bearer ${token}`}
    });
    console.log("Deleted object: ", res);
    setDeletedConcern(res.data.Id)
  };
  const deleteUpdate = async (index) => {
    let res = await axios.delete(`http://localhost:9999/projectManager-api/delete-project-update/${index}`,{
      headers: {Authorization: `bearer ${token}`}
    });
    console.log("Deleted object: ", res);
    setDeletedUpdate(res.data.Id)
  };
  const saveUser = async () => {
    closeModal();
    let modifiedUser = getValues();
    // make http put req
    console.log("got values",modifiedUser)
    let res = await axios.post(
      `http://localhost:9999/projectManager-api/create-project-updates`,modifiedUser,{
          headers: {Authorization: `bearer ${token}`}
        }
      );
        // console.log("res value",res)
      // setting the data to screen
      setModifyToScreen(res.data.payload);
  };
  const saveConcern = async () => {
    closeConcernModal();
    let createConcern = getValues();
    // make http put req
    console.log("got values from create concern",createConcern)
    let res = await axios.post(
      `http://localhost:9999/projectManager-api/create-project-concern`,createConcern,{
          headers: {Authorization: `bearer ${token}`}
        }
      );
        // console.log("res value",res)
      // setting the data to screen
    console.log("res from create concern",res)  
    setModifyConcernToScreen(res.data.Id);
  };
  const saveEditConcern = async () => {
    closeEditConcernModal();
    let modifiedUser = getValues();
    // make http put req
      console.log("got values",modifiedUser)
    let res = await axios.put(
      `http://localhost:9999/projectManager-api/update-project-concern/${modifiedUser.id}`,modifiedUser,{
          headers: {Authorization: `bearer ${token}`}
        }
      );
        // console.log("res value for edit concern",res)
      // setting the data to screen
      setModifyEditConcernToScreen(res.data);
  };
  return (
    <div className='row text-dark'>
      <center>
      <p className='display-4 text-white' style={{textShadow:"10px 10px 20px black"}}>Projects</p>
      <GetAllProjects/>
      <hr className='mt-5' style={{border:"solid 1px",color:"white"}}/>
      <p className='display-4 text-white mt-5' style={{marginLeft:"220px",textShadow:"10px 10px 20px black"}}>Updates
      <button className='btn btn-primary float-end mt-4' style={{boxShadow:"5px 5px 20px black"}} onClick={editUser}>+ Create Project Updates</button>
      </p>
      <div className='row text-center p-3'>
        <table class="table table-bordered text-white" style={{border:"white"}}>
          <thead className='text-dark' style={{backgroundColor:"#0074B7"}}>  
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
              <th scope="col">Delete Update</th>
            </tr>
          </thead>
          <tbody>
            {updates?.map((updateObj,index) => (
            <tr>
                <th>{updateObj.id}</th>
                <th>{updateObj.date}</th>
                <td>{updateObj.project_status_update}</td>
                <td>{updateObj.schedule_status}</td>
                <td>{updateObj.resourcing_status}</td>
                <td>{updateObj.quality_status}</td>
                <td>{updateObj.waiting_for_client_inputs}</td>
                <td>{updateObj.project_id}</td>
                <td>{updateObj.projectManager_id}</td>
                <td><button className='btn btn-danger' style={{boxShadow:"2px 2px 5px black"}} onClick={()=>deleteUpdate(index)}>Delete</button></td>
            </tr>
            ))}  
          </tbody>
        </table>
      </div>  
      <hr className='mt-5' style={{border:"solid 1px",color:"white"}}/>
      <p className='display-4 text-white mt-5' style={{marginLeft:"220px",textShadow:"10px 10px 20px black"}}>Concerns
      <button className='btn btn-primary float-end mt-4' style={{boxShadow:"5px 5px 20px black"}} onClick={createConcern}>+ Create Project Concern</button>
      </p>
      <div className='row text-center p-3'>
        <table class="table table-bordered text-white" style={{border:"white"}}>
          <thead className='text-dark' style={{backgroundColor:"#0074B7"}}>  
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Project</th>
                <th scope="col">Concern</th>
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
                <th>{concernObj.id}</th>
                <th>{concernObj.project_name}</th>
                <td>{concernObj.concern_description}</td>
                <td>{concernObj.concern_raised_by}</td>
                <td>{concernObj.concern_raised_date}</td>
                <td>{concernObj.concern_severity}</td>
                <td>{concernObj.concern_from_client}</td>
                <td>{concernObj.concern_status}</td>
                <td>{concernObj.concern_mitigated_date}</td>
                <td>{concernObj.project_id}</td>
                <td>{concernObj.projectManager_id}</td>
                <td><button className='btn btn-warning' style={{boxShadow:"2px 2px 5px black"}} onClick={()=>updateConcern(index)}>Edit</button></td>
                <td><button className='btn btn-danger' style={{boxShadow:"2px 2px 5px black"}} onClick={()=>deleteConcern(index)}>Delete</button></td>
              </tr>
            ))}  
          </tbody>
        </table>
      </div>
      </center>
      <Modal show={showModal} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="p-3 text-light bg-dark" style={{borderRadius:"10px"}}>
            <div className="col">
              <label htmlFor="date">Date</label>
              <input type="date" className="form-control" {...register("date", {required: true,})} />
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="project_status_update">Project Status Update</label>
              <input className="form-control" {...register("project_status_update", {required: true,})}/>
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="schedule_status">Schedule Status</label>
              <select id="schedule_status" className='form-control' {...register("schedule_status", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Red">Red</option>
                <option value="Amber">Amber</option>
                <option value="Green">Green</option>
              </select>
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>  
            <div className="col">
              <label htmlFor="resourcing_status">Resourcing Status</label>
              <select id="resourcing_status" className='form-control' {...register("resourcing_status", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Red">Red</option>
                <option value="Amber">Amber</option>
                <option value="Green">Green</option>
              </select>
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>  
            <div className="col">
              <label htmlFor="quality_status">Quality Status</label>
              <select id="quality_status" className='form-control' {...register("quality_status", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Red">Red</option>
                <option value="Amber">Amber</option>
                <option value="Green">Green</option>
              </select>
              {errors.email && (<span className="text-danger">Email is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="waiting_for_client_inputs">Waiting for Client Inputs</label>
              <select id="waiting_for_client_inputs" className='form-control' {...register("waiting_for_client_inputs", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="project_id">Project Id</label>
              <input type="number" className="form-control" {...register("project_id", { required: true })}/>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="projectManager_id">Project Manager Id</label>
              <input type="number" className="form-control" {...register("projectManager_id", { required: false })}/>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={saveUser}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConcernsModal} onHide={closeConcernModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create Concern</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="p-3 text-light bg-dark" style={{borderRadius:"10px"}}>
            <div className="col">
              <label htmlFor="project_name">Project</label>
              <input type="text" className="form-control" {...register("project_name", {required: true})} />
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="concern_description">Concern</label>
              <input className="form-control" {...register("concern_description", {required: true})} />
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="concern_raised_by">Concern Raised By</label>
              <input type="text" className="form-control" {...register("concern_raised_by", {required: true})}/>
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>  
            <div className="col">
              <label htmlFor="concern_raised_date">Concern Raised Date</label>
              <input type="date" className="form-control" {...register("concern_raised_date", {required: true})}/>
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>  
            <div className="col">
              <label htmlFor="concern_severity">Concern Severity</label>
              <select id="concern_severity" className='form-control' {...register("concern_severity", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {errors.email && (<span className="text-danger">Email is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="concern_from_client">Concern from Client</label>
              <select id="concern_from_client" className='form-control' {...register("concern_from_client", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="concern_status">Concern Status</label>
              <select id="concern_status" className='form-control' {...register("concern_status", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Raised">Raised</option>
                <option value="Remediation Suggested">Remediation Suggested</option>
                <option value="Mitigated">Mitigated</option>
              </select>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="concern_mitigated_date">Concern Mitigated Date</label>
              <input type="date" className="form-control" {...register("concern_mitigated_date", { required: false })}/>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="project_id">Project Id</label>
              <input type="number" className="form-control" {...register("project_id", { required: false })}/>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="projectManager_id">Project Manager Id</label>
              <input type="number" className="form-control" {...register("projectManager_id", { required: false })}/>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={saveConcern}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditConcernsModal} onHide={closeEditConcernModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Concern</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="p-3 text-light bg-dark" style={{borderRadius:"10px"}}>
            <div className="col">
              <label htmlFor="id">Id</label>
              <input type="number" className="form-control" {...register("id", {required: true})} />
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="project_name">Project</label>
              <input type="text" className="form-control" {...register("project_name", {required: true})} />
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="concern_description">Concern</label>
              <input className="form-control" {...register("concern_description", {required: true})} />
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="concern_raised_by">Concern Raised By</label>
              <input type="text" className="form-control" {...register("concern_raised_by", {required: true})}/>
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>  
            <div className="col">
              <label htmlFor="concern_raised_date">Concern Raised Date</label>
              <input type="date" className="form-control" {...register("concern_raised_date", {required: true})}/>
              {errors.name && (<span className="text-danger">Name is required</span>)}
            </div>
            <br/>  
            <div className="col">
              <label htmlFor="concern_severity">Concern Severity</label>
              <input className="form-control" {...register("concern_severity", {required: true,
                  // pattern: {
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message: "Invalid email address!",
                  // },
                })} />
              {errors.email && (<span className="text-danger">Email is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="concern_from_client">Concern from Client</label>
              <input type="text" className="form-control" {...register("concern_from_client", { required: true })}/>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="concern_status">Concern Status</label>
              <input type="text" className="form-control" {...register("concern_status", { required: true })}/>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="concern_mitigated_date">Concern Mitigated Date</label>
              <input type="date" className="form-control" {...register("concern_mitigated_date", { required: false })}/>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="project_id">Project Id</label>
              <input type="number" className="form-control" {...register("project_id", { required: false })}/>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="projectManager_id">Project Manager Id</label>
              <input type="number" className="form-control" {...register("projectManager_id", { required: false })}/>
              {errors.dob && (<span className="text-danger">DOB is required</span>)}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={saveEditConcern}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProjectManagerHome