import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomeHeader() {
  let navigate = useNavigate()
  return (
    <div>
      <br/>
      <br/>
      <br/>
      <center>
      <div class="jumbotron text-dark p-5">
        <div className='row'>
          <div className='col ms-5' style={{boxShadow:"5px 5px 100px skyblue",borderRadius:"20px"}}>
            <p className='display-5 text-white mt-4' style={{textShadow:"10px 10px 20px black"}}><b>Project Tracking Tool</b></p>
            <p className='text-secondary mt-5' style={{textShadow:"10px 10px 20px black"}}>This product will serve as tracking tool for projects and portfolio for each GDO and overall organization.</p>
            <div className='homePageButton mt-5'>
              <button className='btn btn-dark me-5 border-white' style={{boxShadow:"2px 2px 20px black"}} onClick={()=>navigate('/register')}>Register</button>
              <button className='btn btn-dark text-dark' style={{backgroundColor:"skyblue",boxShadow:"2px 2px 20px black"}} onClick={()=>navigate('/login')}>Login</button>
            </div>
          </div>
          <div className='col'>
            <h1 className='display-1' style={{color:"skyblue",fontSize:"120px",textShadow:"5px 5px 20px black"}}><b>Project Pulse</b></h1>
          </div>
        </div>



        {/* <h1 class="display-4"><b>Project Pulse</b></h1>
        <hr></hr>
        <p class="lead">This product will serve as tracking tool for projects and portfolio for each GDO and overall organisation.</p>
        <br/>
        <div className='homePageButton'>
          <button className='btn btn-dark me-5' onClick={()=>navigate('/register')}>Register</button>
          <button className='btn btn-dark' onClick={()=>navigate('/login')}>Login</button>
        </div> */}
      </div>
      </center>
    </div>
  )
}

export default HomeHeader