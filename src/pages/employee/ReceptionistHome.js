import Navbar from '../../components/Navbar';
import HomeCard from '../../components/HomeCard';

function ReceptionistHome() {
  return (
    <>
      <Navbar />
      
      <div className="d-flex justify-content-center m-5">
        <div className="row">
          <div className="col-md-4">
            <HomeCard 
              name="Appointment Calendar" 
              page_link="viewclinicappointment" 
              icon="fa-calendar"/>
          </div>

          <div className="col-md-4">
            <HomeCard 
              name="Referrals"
              page_link="/doctor/referral" 
              icon="fa-user-md"/>
          </div>

          <div className="col-md-4">
            <HomeCard 
              name="Update Patient Medical History (temp)" 
              page_link="/doctor/patient_medical_history" 
              icon="fa-address-card"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceptionistHome;

