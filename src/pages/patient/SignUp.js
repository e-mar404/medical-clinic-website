import { NavLink as Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function PatientSignUp() {
  return (
    <div> 
      <Navbar />

      <h2>Patient sign up</h2>
       
      <p>Already have an account ?<Link to='/patient/login'>log in</Link></p>
    </div>
  );
}

export default PatientSignUp;

