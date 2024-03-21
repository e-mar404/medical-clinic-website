import Navbar from '../../components/Navbar';
import PatientHomeCard from '../../components/PatientHomeCard';

function PatientHome() {
  return(
    <>
      <Navbar />
      
       <div className="d-flex justify-content-center m-5">
         <div className="row">
           <div className="col-md-4">
             <PatientHomeCard 
                name="Appointment History" 
                page_link="/appointment_history" 
                icon="fa-calendar"/>
          </div>

          <div className="col-md-4">
            <PatientHomeCard 
                name="Profile"
                page_link="/profile" 
                icon="fa-user"/>
          </div>

          <div className="col-md-4">
            <PatientHomeCard 
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
