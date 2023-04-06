import './Login.css'
import React,{useEffect} from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../slices/loginSlice';
import { NavLink } from 'react-router-dom';
import imageLogo from './pp.png'

function Login() {
    let {userObj,status,errorMessage} = useSelector(state=>state.login)
    let dispatch = useDispatch();
    let navigate = useNavigate()
    let {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    useEffect(()=>{
      if(status==="Login Successful"){
        if(userObj.user_role==="Super Admin")
        {
          navigate(`/super-admin-home`);
        }
        else if(userObj.user_role==="Project Manager")
        {
          navigate(`/project-manager-home`)
        }
        else if(userObj.user_role==="Admin")
        {
          navigate(`/admin-home`)
        }
        else if(userObj.user_role==="GDO Head")
        {
          navigate(`/gdo-head-home`)
        }
        else{
          navigate(`/role-not-assigned`)
        }
      }
    },[status]);  
    const onSubmit=async(userCred)=>{
        dispatch(userLogin(userCred))
    }
  return (
    <div>
<section class="vh-100 text-white">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src={imageLogo} class="w-100" alt="Sample image" style={{borderRadius:"20px",boxShadow:"10px 10px 100px skyblue",border:"0px solid black"}}/>
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <center>
        <form>
            <p className="display-4 mb-5" style={{textShadow:"10px 10px 20px black",color:"skyblue"}}><b>Login</b></p>
            {errorMessage && (<p className='text-danger text-center fs-2'>{errorMessage}</p>)}
          <div class="form-outline mb-4">
          <input type="text" {...register('email_id',{required:true})} id='email_id' placeholder='Email' className='form-control border-dark' style={{boxShadow:"10px 10px 20px black"}}/>
          {errors.email_id?.type==='required' && <p className="text-danger">*Email required</p>}
          </div>

          <div class="form-outline mb-3 mt-5">
          <input type="password" {...register('password',{required:true})} id='password' placeholder='Password' className='form-control border-dark' style={{boxShadow:"10px 10px 20px black"}}/>
          {errors.password?.type==='required' && <p className="text-danger">*Password required</p>}
          </div>
          <button type="button" class="btn btn-dark mt-4 float-start border-white" style={{boxShadow:"5px 5px 20px black",width:"35%"}} onClick={()=>navigate('/forgot-password')}>Forgot Password?</button>
          <button type="button" class="btn mt-4 float-end" style={{boxShadow:"10px 10px 20px black",width:"25%",backgroundColor:"skyblue"}} onClick={handleSubmit(onSubmit)}>Login</button>
          <br/>
          <br/>
          <p className="mt-5" style={{textShadow:"10px 10px 10px black"}}>Don't have an account? <NavLink to='/register' style={{color:"skyblue"}}>Register Here</NavLink></p>
        </form>
        </center>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Login