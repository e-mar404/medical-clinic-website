import { NavLink as Link } from 'react-router-dom';
import PatientNavbar from '../../components/PatientNavbar';

function PatientSignUp() {
  return (
    <div> 
      <PatientNavbar />

      <h2>Patient sign up</h2>
       
      <p>Already have an account ?<Link to='/patient/login'>log in</Link></p>
    </div>
  );
}

export default PatientSignUp;

