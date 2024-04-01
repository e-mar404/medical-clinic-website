import DatePicker from 'react-datepicker'; 

function ReferralsForm() {
  return(
    <div className="login-page">
      <form className="form">

        <label className="d-flex justify-content-center text-secondary">Patient:</label>    
        <select name="patient" required >
          <option>Select a patient to refer</option>
        </select>

        <label className="d-flex justify-content-center text-secondary">Specialist:</label>
        <select name="doctorId" required >
          <option>Select a doctor</option>
        </select>

        <label className="d-flex text-secondary">Referral valid through:</label>
        <DatePicker name="date" dateFormat="yyyy-MM-dd" showIcon toggleCalendarOnIconClick required />
            
        <button className="submit-button" type="submit">Refer Patient</button>
      </form>
    </div>
  );
}

export default ReferralsForm;
