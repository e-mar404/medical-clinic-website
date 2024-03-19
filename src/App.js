import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import PatientLogIn from './pages/patient/LogIn';
import PatientSignUp from './pages/patient/SignUp';
import PatientHome from './pages/patient/PatientHome';
import EmployeeHome from './pages/employee/EmployeeHome';
import EmployeeLogIn from './pages/employee/EmployeeLogIn';
<<<<<<< HEAD
import AdminEmployeeList from './pages/employee/AdminEmployeeList';
import NewEmployeeForm from './pages/employee/NewEmployeeForm';
import ViewDoctorAppointments from './pages/employee/ViewDoctorAppointments';
=======
import MakeAppointment from './pages/patient/MakeAppointment'; // Import the MakeAppointment component
>>>>>>> bc8e748 (Patient appointment)

function App() {
  if (localStorage.getItem('LoggedIn') == null) {
    localStorage.setItem('LoggedIn', false);
  }

  // localStorage.clear();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/patient" element={<PatientHome />} />
        <Route path="/patient/login" element={<PatientLogIn />} />
        <Route path="/patient/signup" element={<PatientSignUp />} />
<<<<<<< HEAD

        <Route path='/employee' element={<EmployeeHome />} />
        <Route path='/employee/login' element={<EmployeeLogIn />} />

        <Route path='/admin/employeelist' element={<AdminEmployeeList />} />
        <Route path='/admin/newemployee' element ={<NewEmployeeForm />} />
        <Route path='/admin/viewappointment' element ={<ViewDoctorAppointments />} />
=======
        <Route path="/patient/make-appointment" element={<MakeAppointment />} /> {/* Add this route */}
        
        <Route path="/employee" element={<EmployeeHome />} />
        <Route path="/employee/login" element={<EmployeeLogIn />} />
>>>>>>> bc8e748 (Patient appointment)
      </Routes>
    </Router>
  );
}

export default App;
