import { NavLink as Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PatientLoginModal from '../../components/PatientLoginModal';
import Footer from '../../components/Footer';
function PatientLogIn() {
  return (
    <>
      <Navbar />

      <PatientLoginModal />    

      <Footer />
    </>
  );
}

export default PatientLogIn;
