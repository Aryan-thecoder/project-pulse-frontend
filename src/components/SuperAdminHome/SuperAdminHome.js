import './SuperAdminHome.css'
import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../../slices/loginSlice'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearState } from '../../slices/loginSlice';
import Modal from "react-bootstrap/Modal";
import { Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';

function SuperAdminHome() {
  const {userObj} = useSelector(state=>state.login);
  let token = sessionStorage.getItem('token');
  let navigate = useNavigate();
  let [state,setState] = useState("");
  let [users,setUsers]=useState([])
    // states for modal
  const [showModal, setShowModal] = useState(false);
  const [modifyToScreen, setModifyToScreen] = useState("");
  const [deleted,setDeleted] = useState("");
  useEffect(()=>{
    if(token===null){
      navigate('/login')
    }
    else{
      getData()
    }
  },[modifyToScreen,showModal,deleted])
  const getData = async() =>{
    let result=await axios.get("http://localhost:9999/superAdmin-api/get-all-special-users",{
      headers: {Authorization: `bearer ${token}`}
    })
    setUsers(result.data.payload)
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
  const editUser = (index) => {
    openModal();
    // set already put data to input fields, this uses name property of react-hook-form
    setValue("specialUsers_id", users[index].specialUsers_id);
    setValue("first_name", users[index].first_name);
    setValue("last_name", users[index].last_name);
    setValue("email_id", users[index].email_id);
    setValue("user_role", users[index].user_role);
    // set values to input field
  };
  const saveUser = async () => {
    closeModal();
    let modifiedUser = getValues();
    console.log("modifiedUser",modifiedUser);
    // make http put req

    let res = await axios.put(
      `http://localhost:9999/superAdmin-api/put-role`,
      modifiedUser,{
        headers: {Authorization: `bearer ${token}`}
      }
    );

    // logging the object
    console.log(res.data.payload);

    // setting the data to screen
    setModifyToScreen(res.data.payload.specialUsers_id);
  };
  const deleteUser = async (id) => {
    let res = await axios.delete(`http://localhost:9999/superAdmin-api/delete-special-user/${id}`,{
      headers: {Authorization: `bearer ${token}`}
    });
    console.log("Deleted object: ", res);
    setDeleted(res.data.Id);
  };
  const usersLen = users.length;
  let projectManagersCount = 0;
  let gdoHeadsCount = 0;
  let adminsCount = 0;
  let hrManagersCount = 0;
  for(let i=1;i<usersLen;i++){
    if(users[i].user_role == 'Project Manager'){
      projectManagersCount+=1;
    }
    else if(users[i].user_role =='Admin'){
      adminsCount++;
    }
    else if(users[i].user_role =='HR Manager'){
      hrManagersCount++;
    }
    else if(users[i].user_role =='GDO Head'){
      gdoHeadsCount++;
    }
  }


  return (
    <div class="row text-dark p-3">
      <div class="col-xl-3 col-md-6 mb-4 text-center mt-5">
          <div class="card" style={{backgroundImage:"linear-gradient(to right,white,#F3B171)",border:"2px solid",boxShadow:"10px 10px 20px black"}}>
              <div class="card-body">
                  <div class="row">
                          <div class="h3 font-weight-bold text-gray-800">GDO Heads</div>
                          <div class="h5 mb-3 mt-3 font-weight-bold text-gray-800">{gdoHeadsCount}</div>
                      <div class="col-auto">
                          <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4 text-center mt-5">
          <div class="card" style={{backgroundImage:"linear-gradient(to right,white,#FAE67B)",border:"2px solid",boxShadow:"10px 10px 20px black"}}>
              <div class="card-body">
                  <div class="row">
                          <div class="h3 font-weight-bold text-gray-800">
                              Project Managers</div>
                          <div class="h5 mb-3 mt-3 font-weight-bold text-gray-800">{projectManagersCount}</div>
                      <div class="col-auto">
                          <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4 text-center mt-5">
          <div class="card" style={{backgroundImage:"linear-gradient(to right,white,#D0F57B)",border:"2px solid",boxShadow:"10px 10px 20px black"}}>
              <div class="card-body">
                  <div class="row">
                          <div class="h3 font-weight-bold text-gray-800">
                              HR Managers</div>
                          <div class="h5 mb-3 mt-3 font-weight-bold text-gray-800">{hrManagersCount}</div>
                      <div class="col-auto">
                          <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4 text-center mt-5">
          <div class="card" style={{backgroundImage:"linear-gradient(to right,white,#8872CA)",border:"2px solid",boxShadow:"10px 10px 20px black"}}>
              <div class="card-body">
                  <div class="row">
                          <div class="h3 font-weight-bold text-gray-800">
                              Admins</div>
                          <div class="h5 mb-3 mt-3 font-weight-bold text-gray-800">{adminsCount}</div>
                      <div class="col-auto">
                          <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <center>
        <p className='display-4 text-white mt-5'>Users List</p>
        <hr style={{color:"white"}}/>
      <div className='row p-5 text-center'>
      <table class="table table-bordered text-white" style={{border:"white",borderRadius:"20px"}}>
        <thead className='text-dark' style={{backgroundColor:"#0074B7"}}>  
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Edit User</th>
            <th scope="col">Delete User</th>
          </tr>
        </thead>
        <tbody>
        {users?.map((userObj,index) => (
        <tr>
            <td>{userObj.specialUsers_id}</td>
            <td>{userObj.first_name}</td>
            <td>{userObj.last_name}</td>
            <td>{userObj.email_id}</td>
            <td>{userObj.user_role}</td>
            <td><button className='btn btn-warning' onClick={()=>editUser(index)}>Edit</button></td>
            <td><button className='btn btn-danger' onClick={() => deleteUser(userObj.specialUsers_id)}>Delete</button></td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>  
      </center>
      <Modal show={showModal} onHide={closeModal} backdrop="static" className='my-modal'>
        <Modal.Header closeButton>
          <Modal.Title className='text-white justify-content-center'>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* use edit form */}
          <form className="p-3 text-light bg-dark" style={{borderRadius:"10px"}}>
            {/* register your input into the hook by invoking the "register" function */}

            <div className="col">
              <label htmlFor="specialUsers_id">Id</label>
              <input
                className="form-control"
                {...register("specialUsers_id", {
                  required: true,
                })} disabled={true}
              />
              {/* errors will return when field validation fails  */}
              {errors.name && (
                <span className="text-danger">Name is required</span>
              )}
            </div>
            <br/>
            <div className="col">
              <label htmlFor="first_name">First Name</label>
              <input
                className="form-control"
                {...register("first_name", {
                  required: true,
                })} disabled={true}
              />
              {/* errors will return when field validation fails  */}
              {errors.name && (
                <span className="text-danger">Name is required</span>
              )}
            </div>
              <br/>
              <div className="col">
              <label htmlFor="last_name">Last Name</label>
              <input
                className="form-control"
                {...register("last_name", {
                  required: true,
                })} disabled={true}
              />
              {/* errors will return when field validation fails  */}
              {errors.name && (
                <span className="text-danger">Name is required</span>
              )}
            </div>
              <br/>  
            <div className="col   ">
              <label htmlFor="email_id">Email</label>
              <input
                className="form-control"
                {...register("email_id", {
                  required: true,
                  // pattern: {
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message: "Invalid email address!",
                  // },
                })} disabled={true}
              />

              {/* errors will return when field validation fails  */}
              {errors.email && (
                <span className="text-danger">Email is required</span>
              )}
            </div>
            <br/>
            <div className="  col  ">
              <label htmlFor="user_role">Role</label>
              <select id="user_role" className='form-control' {...register("user_role", { required: true })}>
              <option value="" disabled={true} selected>select</option>
                <option value="GDO Head">GDO Head</option>
                <option value="Project Manager">Project Manager</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
              </select>

              {/* errors will return when field validation fails  */}
              {errors.dob && (
                <span className="text-danger">DOB is required</span>
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

export default SuperAdminHome