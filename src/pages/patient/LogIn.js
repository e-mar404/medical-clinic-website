import { NavLink as Link } from 'react-router-dom';
import PatientNavbar from '../../components/PatientNavbar';

function PatientLogIn() {
  return (
    <>
      <PatientNavbar />

      <h1>Patient log in page</h1>

      <p>Dont have an account ?<Link to="/patient/signup">Sign Up</Link></p>
    </>
  );
}

export default PatientLogIn;
