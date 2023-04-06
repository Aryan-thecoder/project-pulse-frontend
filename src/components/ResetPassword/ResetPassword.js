import "./ResetPassword.css"
import React,{useEffect} from 'react'
import {useForm} from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../slices/loginSlice';
import axios from "axios";

function ForgotPassword() {
    const {userObj} = useSelector(state=>state.login);
    let token = sessionStorage.getItem('token');
    const { state } = useLocation();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const onSubmit=async(userCred)=>{
        let res = await axios.post(`http://localhost:9999/specialUsers-api/reset-password/${state.email_id}`,userCred);
        navigate('/login')
    }  
  return (
    <div>
    <br/>
    <br/>
    <br/>
    <center>
    <div className='loginContainer' style={{width:"400px",boxShadow:"10px 10px 25px black"}}>
    <br/>
    <br/>
    <h1 className='text-dark'>Reset Password</h1>
    <form className='w-75 text-start text-white'>
        <div className='mt-5'>
        <input type="number" {...register('otp',{required:true})} id='otp' placeholder='OTP' className='form-control border-dark' style={{boxShadow:"1px 1px 2px black"}}/>
        {errors.otp?.type==='required' && <p className="text-danger">*OTP required</p>}
        </div>
        <br/>
        <br/>
        <div>
        <input type="password" {...register('password',{required:true})} id='password' placeholder='New Password' className='form-control border-dark' style={{boxShadow:"1px 1px 2px black"}}/>
        {errors.password?.type==='required' && <p className="text-danger">*Password required</p>}
        </div>
        <br/>
        <center>
            <button type='submit' className='btn mt-3 mb-2 btn-dark' onClick={handleSubmit(onSubmit)}>Submit</button>
        </center>
    </form>
    <br/>
    </div>
    </center>
    </div>
  )
}

export default ForgotPassword