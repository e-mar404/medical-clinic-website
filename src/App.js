import { 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import PatientLogIn from './pages/patient/LogIn';
import PatientHome from './pages/patient/PatientHome';
import EmployeeHome from './pages/employee/EmployeeHome';
import EmployeeLogIn from './pages/employee/EmployeeLogIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PatientHome />} />
        <Route path='/patient' element={<PatientHome />} />
        <Route path='/patient/login' element={<PatientLogIn />} />

        <Route path='/employee' element={<EmployeeHome />} />
        <Route path='/employee/login' element={<EmployeeLogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
