import { useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker'; 

function ReferralsForm() {
  const [specialists, setSpecialists] = useState([{"employee_id": 0, "first_name": "", "last_name": ""}]);
  const specialistsRef = useRef();

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const fetchSpecialists = async () => {
      fetch(`${process.env.REACT_APP_BACKEND_HOST}/employee/specialists`, requestOptions).then((response) => {
        response.json().then((data) => {
          if (response.status !== 200) {
            alert(data.error);
            return;
          }

          console.log(data.message);
          specialistsRef.current = data.message;
          setSpecialists(specialistsRef.current);
        });
      });

    }

    fetchSpecialists();

    console.log('use effect called');
  }, [specialistsRef]); 

  return(
    <div className="login-page">
      <form className="form">

        <label className="d-flex justify-content-center text-secondary">Specialist:</label>    
        <select
          name="specialistId"
          defaultValue={-1}
          required
          >
          <option key={0} value={-1} disabled>Select a specialist</option>
            {specialists.map((specialist) => (
              <option key={specialist.employee_id} value={specialist.employee_id}>Dr. {specialist.first_name} {specialist.last_name}</option>
            ))}
        </select>

        <label className="d-flex justify-content-center text-secondary">Patient:</label>
        <select name="doctorId" required >
          <option>Select a patient</option>
        </select>

        <label className="d-flex text-secondary">Referral valid through:</label>
        <DatePicker name="date" dateFormat="yyyy-MM-dd" showIcon toggleCalendarOnIconClick required />
            
        <button className="submit-button" type="submit">Refer Patient</button>
      </form>
    </div>
  );
}

export default ReferralsForm;
