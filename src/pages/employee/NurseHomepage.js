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
              page_link={'/nurse/clinic_appointments'} 
              icon="fa-calendar"/>
          </div>
          
          {/*This is only for styling*/}
          <div className="col-md-2"></div>

          <div className="col-md-4">
            <HomeCard 
              name="Referrals"
              page_link="/nurse/referral" 
              icon="fa-user-md"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default NurseHomepage;
