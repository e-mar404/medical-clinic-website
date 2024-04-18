import React from 'react';

function HomeCarousel() {
    return (
        <div className="container mx-auto mt-5 mb-5" style={{ maxWidth: '75%' }}>
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://wallpapers.com/images/hd/medical-hospital-surgeons-in-operating-room-r3v9xr0526gzbalv.jpg" className="d-block w-100" alt="Slide 1" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Our team of experienced doctors</h5>
                            <p>At VitalLife Healthcare, you can expect top tier medical services!</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://wallpapercave.com/wp/wp2528637.jpg" className="d-block w-100" alt="Slide 2" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>The cleanest operating rooms</h5>
                            <p>We do our best to keep everything sanitized and up-to-code!</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://upstatebusinessjournal.com/wp-content/uploads/sites/2/2024/01/Med-Tech-iStock-edited.jpg" className="d-block w-100" alt="Slide 2" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>The best medical technology around</h5>
                            <p>We are proudly sponsored by software engineers at the University of Houston!</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default HomeCarousel;
