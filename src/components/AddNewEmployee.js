import React from "react";
import "./AddNewEmployee.css";

function AddNewEmployee(){
    return(
        <>
            <div>
                

                <a className="button-link" href="/admin/newemployee" id="navbarDropdown" role="button" aria-expanded="false">

                    <button className="button" >Add New Employee</button>
                </a>
            </div>
        </>
    );
}

// needs link to new employee form... 

export default AddNewEmployee;
