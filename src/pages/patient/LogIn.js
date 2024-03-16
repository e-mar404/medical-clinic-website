import { NavLink as Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function PatientLogIn() {
  return (
    <>
      <Navbar />

      <h1>Patient log in page</h1>

      <p>Dont have an account ?<Link to="/patient/signup">Sign Up</Link></p>
    </>
  );
}

export default PatientLogIn;
