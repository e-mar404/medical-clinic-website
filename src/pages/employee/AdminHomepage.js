import React from "react";
import Navbar from "../../components/Navbar";
import HomeCard from '../../components/HomeCard';

function AdminHomepage(){
    return(
        <>
          <Navbar />

        <div className="d-flex justify-content-center m-5" >
         <div className="row">
           <div className="col-md-4">
             <HomeCard 
                name="Employee List" 
                page_link="/admin/employeelist" 
                icon="fa-user"/>
          </div>

          <div className="col-md-4">
            <HomeCard 
                name="Reports"
                icon="fa-file"
                />
          </div>
          <div className="col-md-4">
            <HomeCard 
                name="Clinic Information"
                icon="fa-hospital-o"
                />
          </div>
        </div>
      </div>

      </>
    );
}

export default AdminHomepage;