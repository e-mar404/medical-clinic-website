import './App.css';
import 'react-datepicker/dist/react-datepicker.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PatientLogIn from './pages/patient/LogIn';
import PatientSignup from './pages/patient/Signup';
import PatientProfile from './pages/patient/Profile';
import PatientHome from './pages/patient/PatientHome';
import DoctorHomepage from './pages/employee/DoctorHomepage';
import DoctorReferralsPage from './pages/employee/DoctorReferralsPage';
import EmployeeHome from './pages/employee/EmployeeHome';
import EmployeeLogIn from './pages/employee/EmployeeLogIn';
import AdminEmployeeList from './pages/employee/AdminEmployeeList';
import NewEmployeeForm from './pages/employee/NewEmployeeForm';
import ViewDoctorAppointments from './pages/employee/ViewDoctorAppointments';
import ViewClinicAppointments from './pages/employee/ViewClinicAppointments';
import MakeAppointment from './pages/appointment/MakeAppointment'; 
import TransferDoctor from './pages/employee/TransferDoctor';
import AdminHomepage from './pages/employee/AdminHomepage';

import Reports from './pages/employee/Reports';
import PatientMedicalHistoryPage from './pages/employee/PatientMedicalHistoryPage';
import AdminLoadReports from './pages/employee/LoadReport';


function App() {
  if (localStorage.getItem('LoggedIn') == null) {
    localStorage.setItem('LoggedIn', false);
    localStorage.setItem("LoggedIn", false);
    localStorage.setItem("LoginEmail", null); 
    localStorage.setItem("UserEmail", null); 
    localStorage.setItem("UserId", null);
    localStorage.setItem("UserFirstName", null);
    localStorage.setItem("UserLastName", null);
    localStorage.setItem("UserType", null); 
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/patient" element={<PatientHome />} />
        <Route path="/patient/login" element={<PatientLogIn />} />
        <Route path="/patient/signup" element={<PatientSignup />} />
        <Route path="/patient/profile" element={<PatientProfile />} />


        <Route path='/employee' element={<EmployeeHome />} />
        <Route path='/employee/login' element={<EmployeeLogIn />} />

        <Route path='/doctor' element={<DoctorHomepage />} />
        <Route path='/doctor/referral' element={<DoctorReferralsPage />} />
        <Route path='/doctor/patient_medical_history' element={<PatientMedicalHistoryPage />} />

        <Route path="/make_appointment" element={<MakeAppointment />} /> 

        <Route path='/admin/employeelist' element={<AdminEmployeeList />} />

        <Route path='/viewclinicappointment' element ={<ViewClinicAppointments />} />

        <Route path='/admin' element={<AdminHomepage />}/>
 
        <Route path='/admin/employeelist/newemployee' element ={<NewEmployeeForm />} />
        <Route path='/admin/employeelist/viewappointment' element ={<ViewDoctorAppointments />} />
        <Route path='/admin/employeelist/transfer' element ={<TransferDoctor />} />
        <Route path="/make_appointment" element={<MakeAppointment />} /> 

        <Route path='/admin/report_form' element={<Reports />}/>
        <Route path='/admin/report' element={<AdminLoadReports />} />
      </Routes>
    </Router>
  );
}

export default App;
