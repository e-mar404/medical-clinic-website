import './App.css';
import 'react-datepicker/dist/react-datepicker.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PatientLogIn from './pages/patient/LogIn';
import PatientSignup from './pages/patient/Signup';
import PatientHome from './pages/patient/PatientHome';
import EmployeeHome from './pages/employee/EmployeeHome';
import EmployeeLogIn from './pages/employee/EmployeeLogIn';
import AdminEmployeeList from './pages/employee/AdminEmployeeList';
import NewEmployeeForm from './pages/employee/NewEmployeeForm';
import ViewDoctorAppointments from './pages/employee/ViewDoctorAppointments';
import MakeAppointment from './pages/appointment/MakeAppointment'; 
import TransferDoctor from './pages/employee/TransferDoctor';
import AdminHomepage from './pages/employee/AdminHomepage';

function App() {
  if (localStorage.getItem('LoggedIn') == null) {
    localStorage.setItem('LoggedIn', false);
    localStorage.setItem("LoggedIn", false);
    localStorage.setItem("LoginEmail", null); // Email of logged in user
    localStorage.setItem("LoginType", null); // Type of logged in user (patient, employee)
    localStorage.setItem("UserEmail", null); // Email of logged in user
    localStorage.setItem("UserId", null); // Email of logged in user
    localStorage.setItem("UserFirstName", null); // First name of logged in user
    localStorage.setItem("UserLastName", null); // Last name of logged in user
    localStorage.setItem("UserType", null); // Type of logged in user (patient, employee)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/patient" element={<PatientHome />} />
        <Route path="/patient/login" element={<PatientLogIn />} />
        <Route path="/patient/signup" element={<PatientSignup />} />


        <Route path='/employee' element={<EmployeeHome />} />
        <Route path='/employee/login' element={<EmployeeLogIn />} />

        <Route path='/admin/employeelist' element={<AdminEmployeeList />} />
        <Route path='/admin/newemployee' element ={<NewEmployeeForm />} />
        <Route path='/admin/viewappointment' element ={<ViewDoctorAppointments />} />
        <Route path='/admin/transfer' element ={<TransferDoctor />} />

        <Route path='/admin' element={<AdminHomepage />}/>
        <Route path="/make_appointment" element={<MakeAppointment />} /> 
      </Routes>
    </Router>
  );
}

export default App;
