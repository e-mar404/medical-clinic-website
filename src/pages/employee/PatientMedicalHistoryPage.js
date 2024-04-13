import Navbar from "../../components/Navbar";
import MedicalHistoryForm from '../../components/MedicalHistoryForm';

function PatientMedicalHistoryPage(){
    return(
      <>
        <Navbar />
        <MedicalHistoryForm patient_id={1} />
      </>
    );
}

export default PatientMedicalHistoryPage;
