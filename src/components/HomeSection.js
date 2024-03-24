import React from 'react';

function HomeSection() {
    return (
        <div className="row mt-5 mb-5 mx-auto">
            <div className="col-4">
                <div className="container" style={{ maxWidth: '500px' }}>
                    <div className="card">
                        <div className="card-header bg-warning"></div>
                        <div className="card-body">
                            <h5 className="card-title">Schedule an Appointment</h5>
                            <p className="card-text">Our appointment-scheduling services are managed by our amazing staff!</p>
                            <a href="/" className="btn btn-warning disabled">Find Next Available</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="container" style={{ maxWidth: '500px' }}>
                    <div className="card">
                        <div className="card-header bg-success"></div>
                        <div className="card-body">
                            <h5 className="card-title">Find a Doctor</h5>
                            <p className="card-text">We have an expert team of doctors and specialists eager to help!</p>
                            <a href="/" className="btn btn-success disabled">View Doctors Near Me</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="container" style={{ maxWidth: '500px' }}>
                    <div className="card">
                        <div className="card-header bg-info"></div>
                        <div className="card-body">
                            <h5 className="card-title">Find a Location</h5>
                            <p className="card-text">We are rapidly expanding to multiple locations near you!</p>
                            <a href="/" className="btn btn-info disabled">View Locations Near Me</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeSection;
