import "./ForgotPassword.css"
import React,{useEffect} from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../slices/loginSlice';
import axios from "axios";

function ForgotPassword() {
    const {userObj} = useSelector(state=>state.login);
    let token = sessionStorage.getItem('token');
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const onSubmit=async(userCred)=>{
        console.log("from forgot password",userCred)
        let res = await axios.post(`http://localhost:9999/specialUsers-api/forgot-password`,userCred);
        navigate(`/reset-password/${userCred.email_id}`, { state: userCred })
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
    <h1 className='text-dark'>Forgot Password</h1>
    <form className='w-75 text-start text-white'>
        <div className='mt-5'>
        <input type="text" {...register('email_id',{required:true})} id='email_id' placeholder='Email' className='form-control border-dark' style={{boxShadow:"1px 1px 2px black"}}/>
        {errors.email_id?.type==='required' && <p className="text-danger">*Email required</p>}
        </div>
        <br/>
        <center>
            <button type='submit' className='btn mt-3 mb-2 btn-dark' onClick={handleSubmit(onSubmit)}>Send OTP</button>
        </center>
    </form>
    <br/>
    </div>
    </center>
    </div>
  )
}

export default ForgotPassword