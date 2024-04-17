import Navbar from '../../components/Navbar';
import HomeCard from '../../components/HomeCard';

function NurseHomepage() {
  return (
    <>
      <Navbar />
      
      <div className="d-flex justify-content-center m-5">
        <div className="row">
          <div className="col-md-4">
            <HomeCard 
              name="Appointment Calendar" 
              page_link={`/doctor/appointment_calendar/${localStorage.getItem('UserId')}`} 
              icon="fa-calendar"/>
          </div>
          
          {/*This is only for styling while the update patient medical history is updated to go to the appointment calendars*/}
          <div className="col-md-2"></div>

          <div className="col-md-4">
            <HomeCard 
              name="Update Patient Medical History (temp)" 
              page_link="/doctor/patient_medical_history/1" 
              icon="fa-address-card"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default NurseHomepage;
