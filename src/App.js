import { 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import Homepage from './pages/Homepage';
import PatientLogIn from './pages/patient/LogIn';
import PatientSignUp from './pages/patient/SignUp';
import PatientHome from './pages/patient/PatientHome';
import EmployeeHome from './pages/employee/EmployeeHome';
import EmployeeLogIn from './pages/employee/EmployeeLogIn';

function App() {
  if (localStorage.getItem("LoggedIn") == null) {
    localStorage.setItem("LoggedIn", false)
  }

  // localStorage.clear();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/patient' element={<PatientHome />} />
        <Route path='/patient/login' element={<PatientLogIn />} />
        <Route path="/patient/signup" element={<PatientSignUp />} />

        <Route path='/employee' element={<EmployeeHome />} />
        <Route path='/employee/login' element={<EmployeeLogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
