import Navbar from '../../components/Navbar';
import HomeCard from '../../components/HomeCard';

function DoctorHomepage() {
  return (
    <>
      <Navbar />
      
      <div className="d-flex justify-content-center m-5">
        <div className="row">
          <div className="col-md-3">
            <HomeCard 
              name="Appointment Calendar" 
              page_link={`/doctor/appointment_calendar/${localStorage.getItem('UserId')}`} 
              icon="fa-calendar"/>
          </div>

          <div className="col-md-3"></div>

          <div className="col-md-3">
            <HomeCard 
              name="Referrals"
              page_link="/doctor/referral" 
              icon="fa-user-md"/>
          </div>

        </div>
      </div>
    </>
  );
}

export default DoctorHomepage;

