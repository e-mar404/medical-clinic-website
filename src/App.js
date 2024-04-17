import './App.css';
import 'react-datepicker/dist/react-datepicker.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PatientLogIn from './pages/patient/LogIn';
import PatientSignup from './pages/patient/Signup';
import PatientProfile from './pages/patient/Profile';
import PatientHome from './pages/patient/PatientHome';
import AppointmentHistory from './pages/patient/AppointmentHistory';
import DoctorHomepage from './pages/employee/DoctorHomepage';
import ReceptionistHome from './pages/employee/ReceptionistHome';
import ReceptionitAppointment from './pages/employee/ReceptionistAppointment'
import ReceptionistBilling from './pages/employee/ReceptionistBilling';
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

import AdminClinic from './pages/employee/AdminClinic';


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
        <Route path="/patient/appointment_history" element={<AppointmentHistory />} />
        <Route path='/employee' element={<EmployeeHome />} />
        <Route path='/employee/login' element={<EmployeeLogIn />} />
    
        <Route path='/receptionist/clinicAppointments' element ={<ViewClinicAppointments />} />
        <Route path='/receptionist' element={<ReceptionistHome />} />
        <Route path='/receptionist/makeAppointment' element={<ReceptionitAppointment />} />
        <Route path='/receptionist/Billing' element={<ReceptionistBilling />} />
        

        <Route path='/doctor' element={<DoctorHomepage />} />
        <Route path='doctor/appointment_calendar/:doctor_id' element={<ViewDoctorAppointments />} />
        <Route path='/doctor/referral' element={<DoctorReferralsPage />} />
        <Route path='/doctor/patient_medical_history/:patient_id' element={<PatientMedicalHistoryPage />} />


        <Route path='/admin/employeelist' element={<AdminEmployeeList />} />

        <Route path='/admin' element={<AdminHomepage />}/>
 
        <Route path='/admin/employeelist/newemployee' element ={<NewEmployeeForm />} />
        <Route path='/admin/employeelist/viewappointment/:doctor_id' element ={<ViewDoctorAppointments />} />
        <Route path='/admin/employeelist/transfer/:doctor_id' element ={<TransferDoctor />} />
        <Route path="/make_appointment" element={<MakeAppointment />} /> 

        <Route path='/admin/report_form' element={<Reports />}/>
        <Route path='/admin/report' element={<AdminLoadReports />} />

        <Route path='/admin/clinic' element={<AdminClinic />} />

      </Routes>
    </Router>
  );
}

export default App;
