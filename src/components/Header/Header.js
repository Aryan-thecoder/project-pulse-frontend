import './Header.css'
import React from 'react'
import {NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../../slices/loginSlice';

function Header() {
  const {status,userObj} = useSelector(state=>state.login)
  let dispatch = useDispatch();
  const logout = ()=>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("status");
    dispatch(clearState())
  }
  let user = userObj.first_name;
  return (
    <div>
        <ul class="nav justify-content-end bg-dark p-3">
          {/* <li class="nav-item me-5 justify-content-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="" width={"45px"} />
          </li> */}
          {status==="Login Successful" ?(<>
            <li>
              <p className='text-white mt-2 me-5'>Welcome {user}</p>
          </li>
          <li class="nav-item me-5">
          <NavLink className={({isActive})=>isActive?"active nav-link":"inactive nav-link"} to="/login" onClick={logout}>
              Logout
            </NavLink>
          </li>
          </>
          
          ):(   
            <>
            <li class="nav-item me-5">
            <NavLink className={({isActive})=>isActive?"active nav-link":"inactive nav-link"} to="/">
              Home
            </NavLink>
          </li>
          <li class="nav-item me-5">
          <NavLink className={({isActive})=>isActive?"active nav-link":"inactive nav-link"} to="/register">
              Register
            </NavLink>
          </li>
          <li class="nav-item me-5">
          <NavLink className={({isActive})=>isActive?"active nav-link":"inactive nav-link"} to="/login">
              Login
            </NavLink>
          </li>
            </>       
          )}
        </ul>
    </div>
  )
}

export default Header
