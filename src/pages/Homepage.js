import Navbar from '../components/Navbar';
import HomeCarousel from '../components/HomeCarousel';
import HomeSection from '../components/HomeSection';

function Homepage() {
  return(
    <>
      <Navbar />
      
      <HomeCarousel />

      <div class="text-left mx-auto bg-info p-3" style={{ maxWidth: '80%' }}>
        <p class="text-center h4">
          <strong>Welcome to the Medical Clinic, Your Partner in Health and Wellness!</strong>
        </p>

        <p class="fs-6">
          At the Medical Clinic, we are dedicated to providing exceptional healthcare services with a compassionate touch. As a leading medical clinic in our community, we prioritize the well-being of our patients above all else. Our team of experienced healthcare professionals is committed to delivering personalized care tailored to your unique needs.
        </p>

        <p class="fs-6">
          Your health and well-being are our top priorities. Whether you're seeking routine medical care, managing a chronic condition, or exploring options for enhancing your overall wellness, we are here to support you on your healthcare journey.
        </p>

        <p class="fs-6">
          Take the first step towards better health and schedule an appointment with us today. We look forward to partnering with you to achieve your health goals and provide you with the exceptional care you deserve.
        </p>
      </div>

      <HomeSection />
    </>
  );
}

export default Homepage;
