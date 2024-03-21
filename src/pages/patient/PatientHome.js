import Navbar from '../../components/Navbar';
import HomeCard from '../../components/HomeCard';

function PatientHome() {
  return(
    <>
      <Navbar />
      
       <div className="d-flex justify-content-center m-5">
         <div className="row">
           <div className="col-md-4">
             <HomeCard 
                name="Appointment History" 
                page_link="/patient/appointment_history" 
                icon="fa-calendar"/>
          </div>

          <div className="col-md-4">
            <HomeCard 
                name="Profile"
                page_link="/patient/profile" 
                icon="fa-user"/>
          </div>

          <div className="col-md-4">
            <HomeCard 
                name="Schedule Appointment" 
                page_link="" 
                icon="fa-calendar-plus-o"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientHome;
