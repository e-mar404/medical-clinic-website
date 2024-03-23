import React from "react";

function SearchForEmployee(){
    return(
        <form className="form-inline my-2 my-lg-0" >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ width: 14 + 'em'}}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </div>
      </form>
    );

}
// fix color and spacing


export default SearchForEmployee;