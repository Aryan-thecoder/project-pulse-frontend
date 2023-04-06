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
  console.log("userObj from GDO",userObj.projectManager_id)
  let token = sessionStorage.getItem('token');
  let navigate = useNavigate();
  let [state,setState] = useState("");
  let [team,setTeam] = useState([]);
    // states for modal
  const [showModal, setShowModal] = useState(false);
  const [modifyToScreen, setModifyToScreen] = useState(state);
  useEffect(()=>{
    if(token===null){
      navigate('/login')
    }
    else{
      getTeamData()
    }
  },[])
  const getTeamData = async() =>{
    let result=await axios.get(`http://localhost:9999/gdoHead-api/get-projects/${userObj.projectManager_id}`,{
      headers: {Authorization: `bearer ${token}`}
    })
    setTeam(result.data.payload)
  }
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
      `http://localhost:9999/gdoHead-api/assign-employees`,
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
    <div className='row text-dark'>
      <p className='display-4 text-white mt-5 text-center'>Projects
      <button className='btn btn-primary float-end mt-3 me-3' onClick={editUser}>+ Add Team</button>
      </p>
      <GetAllProjects/>
      {/* <p className='display-4 text-white mt-5'>Team Composition</p>
      <div className='row text-center'>
      <table class="table table-bordered text-white" style={{border:"white"}}>
        <thead className='bg-dark text-white border-white'>
          <tr>
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
      </div> */}
      <Modal show={showModal} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* use edit form */}
          <form className="p-3 text-light bg-dark" style={{borderRadius:"10px"}}>
            {/* register your input into the hook by invoking the "register" function */}

            <div className="col">
              <label htmlFor="resource_name">Resource Name</label>
              <input
                className="form-control"
                {...register("resource_name", {
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
              <label htmlFor="project_role">Project Role</label>
              <select id="project_role" className='form-control' {...register("project_role", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="QA">QA</option>
                <option value="DEV">DEV</option>
                <option value="PRODUCT">PRODUCT</option>
                <option value="MANAGEMENT">MANAGEMENT</option>
                <option value="DEVOPS">DEVOPS</option>
              </select>
              {/* errors will return when field validation fails  */}
              {errors.name && (
                <span className="text-danger">Name is required</span>
              )}
            </div>
              <br/>
              <div className="col">
              <label htmlFor="start_date">Start Date</label>
              <input
                type="date"
                className="form-control"
                {...register("start_date", {
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
              <label htmlFor="end_date">End Date</label>
              <input
              type="date"
                className="form-control"
                {...register("end_date", {
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
              <label htmlFor="status">Status</label>
              <select id="status" className='form-control' {...register("status", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              {/* errors will return when field validation fails  */}
              {errors.email && (
                <span className="text-danger">Email is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="billing_status">Billing Status</label>
              <select id="billing_status" className='form-control' {...register("billing_status", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Billed">Billed</option>
                <option value="Buffer">Buffer</option>
              </select>
              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="customer_exposed_status">Customer Exposed Status</label>
              <select id="customer_exposed_status" className='form-control' {...register("customer_exposed_status", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="allocation_type">Allocation Type</label>
              <select id="allocation_type" className='form-control' {...register("allocation_type", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
              </select>
              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="project_id">Project Id</label>
              <input
                type="text"
                className="form-control"
                {...register("project_id", { required: true })}
              />

              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="emp_id">Emp Id</label>
              <input
                type="text"
                className="form-control"
                {...register("emp_id", { required: true })}
              />

              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
              )}
            </div>
            <br/>
            <br/>

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