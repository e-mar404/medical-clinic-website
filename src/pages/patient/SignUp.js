import { NavLink as Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PatientRegisterModal from '../../components/PatientRegisterModal';
import Footer from '../../components/Footer';

function PatientSignUp() {
  return (
    <>
    <Navbar />

    <PatientRegisterModal />

    <Footer />
    </>
  );
}

export default PatientSignUp;

