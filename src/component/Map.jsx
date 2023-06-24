/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';

const Map = () => {
  return (
    <div className="w-screen flex justify-center items-center h-screen bg-gradient-to-r from-purple-700 to-blue-500">
      <div className="rounded-lg shadow-xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.5165983990464!2d112.65023517487154!3d-7.945445692078858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629bc05c97bc7%3A0x2cc8f9e59123671c!2sSTMIK%20PPKIA%20Pradnya%20Paramita!5e0!3m2!1sen!2sid!4v1687536430761!5m2!1sen!2sid"
          width="600"
          height="450"
          className="border-none"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
