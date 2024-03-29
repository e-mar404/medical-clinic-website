import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <>
      <footer className="bg-info">
        <div className="container-fluid">
          <div className="row mx-auto">
            <div className="col">
              <section className="p-4">
                <p className="fs-6 font-monospace">
                  © 2024 Team 16 Medical Clinic Database Application. All Rights Reserved.
                </p>
                <p className="fs-6 mb-0">
                  The health information contained on this website is for educational purposes only and does not constitute medical advice or a guaranty of treatment, outcome, or cure. Please consult with your healthcare provider for specific medical advice. This information is not intended to create a physician-patient relationship between Medical Clinic Database Application or any physician and the reader.
                </p>
              </section>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
