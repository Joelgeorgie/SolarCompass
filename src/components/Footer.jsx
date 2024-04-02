import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-600 text-white p-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src="path/to/your/logo.png" alt="SolarCompass Logo" className="h-6 mr-2" />
          <span className="font-semibold">SolarCompass</span>
        </div>
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold">Company Info</h4>
            <p>New York, NY 10012, US</p>
            <p>info@example.com</p>
          </div>
          <div>
            <h4 className="font-semibold">Navigation</h4>
            <a href="/merchandise" className="text-white hover:underline">Merchandise</a>
            <a href="/team" className="text-white hover:underline">Meet our team</a>
            <a href="/login" className="text-white hover:underline">Log in / Sign up</a>
          </div>
          <div>
            <h4 className="font-semibold">Tools & Utility</h4>
            {/* Add your tools and utility links here */}
          </div>
          <div>
            <h4 className="font-semibold">Connect with Us</h4>
            <a href="https://facebook.com" className="text-white hover:underline">Facebook</a>
            <a href="https://twitter.com" className="text-white hover:underline">Twitter</a>
            <a href="https://linkedin.com" className="text-white hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center">© {year} SolarCompass. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
