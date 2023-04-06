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

function AdminHome() {
  const {userObj} = useSelector(state=>state.login);
  let token = sessionStorage.getItem('token');
  let navigate = useNavigate();
  let [state,setState] = useState("");
    // states for modal
  const [showModal, setShowModal] = useState(false);
  const [modifyToScreen, setModifyToScreen] = useState(state);
  useEffect(()=>{
    if(token===null){
      navigate('/login')
    }
  },[modifyToScreen])
  // for opening and closing on model
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const {status} = useSelector(state=>state.login)
  let dispatch = useDispatch();
  const logout = ()=>{
    sessionStorage.removeItem("token");
    dispatch(clearState());
    navigate('/login');
  }
  const editUser = () => {
    openModal();
    // set already put data to input fields, this uses name property of react-hook-form
    // set values to input field
  };
  const saveUser = async () => {
    closeModal();
    let modifiedUser = getValues();
    console.log("modifiedUser",modifiedUser);
    // make http put req

    let res = await axios.post(
      `http://localhost:9999/admin-api/create-project`,
      modifiedUser,{
        headers: {Authorization: `bearer ${token}`}
      }
    );

    // logging the object
    console.log(res);

    // setting the data to screen
    setModifyToScreen(res.data.payload);
  };
  return (
    <div>
    <center>
    <div className='row text-dark'>
      <br/>
      <br/>
      <div className='row text-center mt-5'>
        <p className='display-2 text-white'>Projects
        <button className='btn btn-primary float-end mt-4' onClick={editUser}>+ Create New Project</button>
        </p>
        <GetAllProjects/>
      </div> 
      </div> 
      </center>
      <Modal show={showModal} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* use edit form */}
          <form className="p-3 text-light bg-dark" style={{borderRadius:"10px"}}>
            {/* register your input into the hook by invoking the "register" function */}

            <div className="col">
              <label htmlFor="project_id">Project Id</label>
              <input
                className="form-control"
                {...register("project_id", {
                  required: true,
                })} 
              />
              {/* errors will return when field validation fails  */}
              {errors.name && (
                <span className="text-danger">Name is required</span>
              )}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="project_name">Project Name</label>
              <input
                className="form-control"
                {...register("project_name", {
                  required: true,
                })} 
              />
              {/* errors will return when field validation fails  */}
              {errors.name && (
                <span className="text-danger">Name is required</span>
              )}
            </div>
              <br/>
              <div className="col">
              <label htmlFor="client">Client</label>
              <input
                className="form-control"
                {...register("client", {
                  required: true,
                })}
              />
              {/* errors will return when field validation fails  */}
              {errors.name && (
                <span className="text-danger">Name is required</span>
              )}
            </div>
              <br/>  
            <div className="col">
              <label htmlFor="client_account_manager">Client Account Manager</label>
              <input
                className="form-control"
                {...register("client_account_manager", {
                  required: true,
                  // pattern: {
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message: "Invalid email address!",
                  // },
                })} 
              />

              {/* errors will return when field validation fails  */}
              {errors.email && (
                <span className="text-danger">Email is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="project_status">Project Status</label>
              <select id="project_status" className='form-control' {...register("project_status", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Sales">Sales</option>
                <option value="Pre-Sales">Pre-Sales</option>
                <option value="Client Sign Off">Client Sign Off</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Paused">Paused</option>
                <option value="Deferred">Deferred</option>
              </select>
              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="project_start_date">Project Start Date</label>
              <input
                type="date"
                className="form-control"
                {...register("project_start_date", { required: true })}
              />

              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="project_end_date">Project End Date</label>
              <input
                type="date"
                className="form-control"
                {...register("project_end_date", { required: false })}
              />

              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="project_fitness_indicator">Project Fitness Indicator</label>
              <select id="project_fitness_indicator" className='form-control' {...register("project_fitness_indicator", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Red">Red</option>
                <option value="Amber">Amber</option>
                <option value="Green">Green</option>
              </select>
              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="project_domain">Project Domain</label>
              <input
                type="text"
                className="form-control"
                {...register("project_domain", { required: true })}
              />

              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="project_type">Project Type</label>
              <select id="project_type" className='form-control' {...register("project_type", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Development">Development</option>
                <option value="DevOps">DevOps</option>
                <option value="Test Automation">Test Automation</option>
                <option value="Performance Testing">Performance Testing</option>
                <option value="Security">Security</option>
                <option value="Sustenance Engineering">Sustenance Engineering</option>
                <option value="Mobility">Mobility</option>
                <option value="Storage">Storage</option>
              </select>
              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="team_size">Team Size</label>
              <input
                type="number"
                className="form-control"
                {...register("team_size", { required: true })}
              />

              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="gdoHead_id">GDO Head Id</label>
              <input
                type="text"
                className="form-control"
                {...register("gdoHead_id", { required: true })}
              />

              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="projectManager_id">Project Manager Id</label>
              <input
                type="text"
                className="form-control"
                {...register("projectManager_id", { required: true })}
              />

              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">Project Manager required</span>
              )}
            </div>
            <br/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={saveUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AdminHome