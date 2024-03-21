import Navbar from '../../components/Navbar';
import HomeCard from '../../components/HomeCard';

function EmployeeHome() {
  return (
    <>
      <Navbar />
      
      <div className="d-flex justify-content-center m-5">
        <div className="row">
          <div className="col-md-4">
            <HomeCard 
              name="?" 
              page_link="/employee" 
              icon="fa-question-circle"/>
          </div>

          <div className="col-md-4">
            <HomeCard 
              name="?"
              page_link="/employee" 
              icon="fa-question-circle"/>
          </div>

          <div className="col-md-4">
            <HomeCard 
              name="?" 
              page_link="/employee" 
              icon="fa-question-circle"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeHome;
