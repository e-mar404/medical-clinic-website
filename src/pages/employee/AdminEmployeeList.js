import Navbar from "../../components/Navbar";
import DisplayEmployee from "../../components/DisplayEmployee";
import AddNewEmployee from "../../components/AddNewEmployee";


function DisplayEmployees(){
    return(
        <>
            <Navbar />
            <div style={{ display: 'flex', alignItems: 'center', padding:'0 0 15px', margin:'0 0 0', justifyContent: "space-between"}}>
                    <div><h1>Employee List</h1></div>
                <div>
                    
                    <AddNewEmployee />
                </div>
            </div>

            <DisplayEmployee />
        </>
    );
}

export default DisplayEmployees;