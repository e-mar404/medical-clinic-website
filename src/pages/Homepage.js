import Navbar from '../components/Navbar';
import HomeComponent from '../components/HomeComponent';

function Homepage() {
  return(
    <>
      <Navbar />
      
      <h1 className="text-center">this is the homepage of the app; there is currently nothing in it</h1>

      <HomeComponent />
    </>
  );
}

export default Homepage;
