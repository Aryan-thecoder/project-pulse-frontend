import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

function HomeCard() {
  return (
    // <div className='home-cards mt-3'>
    //     <div className="card border-dark" style={{width: "20rem",boxShadow:"5px 5px 25px black"}}>
    //         <div class="card-body bg-dark text-white" >
    //             <h2 class="card-title" style={{color:"skyblue"}}>GDO Head</h2>
    //             <br/>
    //             <ul>
    //                 <li>Assign roles to Users</li>
    //                 <li>Modify User details</li>
    //                 <li>Delete Users</li>
    //             </ul> 
    //         </div>
    //     </div>
    //     <div className="card border-dark" style={{width: "20rem",boxShadow:"5px 5px 25px black"}}>
    //         <div class="card-body bg-dark text-white">
    //             <h2 class="card-title text-danger">Project Manager</h2>
    //             <br/>
    //             <ul>
    //                 <li>Assign roles to Users</li>
    //                 <li>Modify User details</li>
    //                 <li>Delete Users</li>
    //             </ul> 
    //         </div>
    //     </div>
    //     <div className="card border-dark" style={{width: "20rem",boxShadow:"5px 5px 25px black"}}>
    //         <div class="card-body bg-dark text-white">
    //             <h2 class="card-title text-success">HR Manager</h2>
    //             <br/>
    //             <ul>
    //                 <li>Assign roles to Users</li>
    //                 <li>Modify User details</li>
    //                 <li>Delete Users</li>
    //             </ul> 
    //         </div>
    //     </div>
    //     <div className="card border-dark" style={{width: "20rem",boxShadow:"5px 5px 25px black"}}>
    //         <div class="card-body bg-dark text-white">
    //             <h2 class="card-title text-success">Admins</h2>
    //             <br/>
    //             <ul>
    //                 <li>Assign roles to Users</li>
    //                 <li>Modify User details</li>
    //                 <li>Delete Users</li>
    //             </ul> 
    //         </div>
    //     </div>
    //     <div className="card border-dark" style={{width: "20rem",boxShadow:"5px 5px 25px black"}}>
    //         <div class="card-body bg-dark text-white">
    //             <h2 class="card-title text-success">Super Admins</h2>
    //             <br/>
    //             <ul>
    //                 <li>Assign roles to Users</li>
    //                 <li>Modify User details</li>
    //                 <li>Delete Users</li>
    //             </ul>    
    //         </div>
    //     </div>
    // </div>
    <section class="py-5 text-white" id="features">
    <div class="container px-5 my-5">
        <div class="row gx-5">
            <div class="col-lg-4 mb-5 mb-lg-0"><h2 class="fw-bolder display-4">Features</h2></div>
            <div class="col-lg-8">
                <div class="row gx-5 row-cols-1 row-cols-md-2">
                    <div class="col mb-5 h-100">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-collection"></i></div>
                        <h2 class="h2 text-danger">GDO Head</h2>
                        <p class="mb-0" style={{fontSize:"18px"}}>
                            <li>Assign roles to Users</li>
                            <li>Modify User details</li>
                            <li>Delete Users</li>
                        </p>
                    </div>
                    <div class="col mb-5 h-100">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-building"></i></div>
                        <h2 class="h2 text-warning">Project Manager</h2>
                        <p class="mb-0" style={{fontSize:"18px"}}>
                            <li>Assign roles to Users</li>
                            <li>Modify User details</li>
                            <li>Delete Users</li>
                        </p>
                    </div>
                    <div class="col mb-5 mb-md-0 h-100">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                        <h2 class="h2 text-info">HR Manager</h2>
                        <p class="mb-0" style={{fontSize:"18px"}}>
                            <li>Assign roles to Users</li>
                            <li>Modify User details</li>
                            <li>Delete Users</li>                    
                        </p>
                    </div>
                    <div class="col mb-5 mb-md-0 h-100">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                        <h2 class="h2 text-secondary">Admins</h2>
                        <p class="mb-0" style={{fontSize:"18px"}}>
                            <li>Assign roles to Users</li>
                            <li>Modify User details</li>
                            <li>Delete Users</li>
                        </p>
                    </div>
                    <div class="col mt-5 mb-md-0 h-100">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                        <h2 class="h2 text-primary">Super Admins</h2>
                        <p class="mb-0" style={{fontSize:"18px"}}>
                            <li>Assign roles to Users</li>
                            <li>Modify User details</li>
                            <li>Delete Users</li>
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default HomeCard