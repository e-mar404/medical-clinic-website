import Navbar from '../components/Navbar';
import HomeCarousel from '../components/HomeCarousel';

function Homepage() {
  return(
    <>
      <Navbar />
      
      <HomeCarousel />

      <div className="text-left mx-auto bg-info p-3" style={{ maxWidth: '80%' }}>
        <p className="text-center h4">
          <strong>Welcome to the Medical Clinic, Your Partner in Health and Wellness!</strong>
        </p>

        <p className="fs-6">
          At the Medical Clinic, we are dedicated to providing exceptional healthcare services with a compassionate touch. As a leading medical clinic in our community, we prioritize the well-being of our patients above all else. Our team of experienced healthcare professionals is committed to delivering personalized care tailored to your unique needs.
        </p>

        <p className="fs-6">
          Your health and well-being are our top priorities. Whether you're seeking routine medical care, managing a chronic condition, or exploring options for enhancing your overall wellness, we are here to support you on your healthcare journey.
        </p>

        <p className="fs-6">
          Take the first step towards better health and schedule an appointment with us today. We look forward to partnering with you to achieve your health goals and provide you with the exceptional care you deserve.
        </p>
      </div>

      <footer className="bg-info" style={{marginTop: '5vh'}}>
  <div className="container-fluid">
    <div className="row mx-auto">
      <div className="col">
        <section className="p-3 m-5">
          <p className="fs-6 font-monospace">
            © 2024 Team 16 Medical Clinic Database Application. All Rights Reserved.
          </p>
          <p className="fs-6 mb-0">
            The health information contained on this website is for educational purposes only and does not constitute medical advice or a guaranty of treatment, outcome, or cure. Please consult with your healthcare provider for specific medical advice. This information is not intended to create a physician-patient relationship between Medical Clinic Database Application or any physician and the reader.
          </p>
          <p className="fs-6 mb-0">
            <br></br>This project's GitHub repositories can be found here: <a href="https://github.com/e-mar404/medical-clinic-website">Website</a> <a href="https://github.com/e-mar404/medical-clinic-database">Database</a> 
          </p>
        </section>
      </div>
    </div>
  </div>
</footer>

    </>
  );
}

export default Homepage;
