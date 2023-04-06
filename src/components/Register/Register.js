import './Register.css'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import imageLogo from './pp.png'
function Register() {
    let navigate = useNavigate()
    let [err,setErr] = useState("")
    let {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = async(userObj) => {
        try{
          // console.log(userObj);
          let res = await axios.post('http://localhost:9999/specialUsers-api/register-special-user',userObj)
          console.log("res data",res)
          if(res.status===201)
          {
            setErr("")
            navigate('/login')
          }
          else if(res.data.Message=="Unidentified Employee! Employee does not exist."){
            setErr(res.data.Message)
          }
      }catch(err){
        setErr(err.message)
        console.log("error",err)
      }
    }
  return (
    <div>
<section class="vh-100 text-white">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src={imageLogo} class="w-100" alt="Sample image" style={{borderRadius:"20px",boxShadow:"10px 10px 100px gray",border:"0px solid black"}}/>
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <center>
        <form className='w-75'>
            <p className="display-4 mb-5" style={{textShadow:"10px 10px 20px black",color:"skyblue"}}><b>Register</b></p>
            {err && (<p className='text-danger text-center fs-2'>{err}</p>)}
            <div class="form-outline mb-3 mt-5">
            <input type="number" {...register('specialUsers_id',{required:true})} id='specialUsers_id' placeholder='Id' className='form-control border-dark' style={{boxShadow:"10px 10px 20px black"}}/>
            {errors.specialUsers_id?.type==='required' && <p className="text-danger">*Id required</p>}
          </div>
          <div class="form-outline mb-4 mt-5">
          <input type="text" {...register('first_name',{required:true})} id='first_name' placeholder='First Name' className='form-control border-dark' style={{boxShadow:"10px 10px 20px black"}}/>
            {errors.first_name?.type==='required' && <p className="text-danger">*First Name required</p>}
          </div>
          <div class="form-outline mb-3 mt-5">
          <input type="text" {...register('last_name',{required:true})} id='last_name' placeholder='Last Name' className='form-control border-dark' style={{boxShadow:"10px 10px 20px black"}}/>
            {errors.last_name?.type==='required' && <p className="text-danger">*Last Name required</p>}
          </div>
          <div class="form-outline mb-3 mt-5">
          <input type="text" {...register('email_id',{required:true})} id='email_id' placeholder='Email' className='form-control border-dark' style={{boxShadow:"10px 10px 20px black"}}/>
            {errors.email_id?.type==='required' && <p className="text-danger">*Email required</p>}
          </div>
          <div class="form-outline mb-3 mt-5">
          <input type="password" {...register('password',{required:true})} id='password' placeholder='Password' className='form-control border-dark' style={{boxShadow:"10px 10px 20px black"}}/>
            {errors.password?.type==='required' && <p className="text-danger">*Password required</p>}
          </div>
          <button type="button" class="btn mt-4" style={{boxShadow:"10px 10px 20px black",width:"25%",backgroundColor:"skyblue",textShadow:"10px 10px 20px black"}} onClick={handleSubmit(onSubmit)}>Register</button>
        </form>
        </center>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Register