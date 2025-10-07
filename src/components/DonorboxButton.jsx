import React, { useEffect } from 'react';

const DonorboxButton = () => {
  useEffect(() => {
    // Wait for Donorbox script to load
    const checkDonorbox = () => {
      if (window.Donorbox) {
        console.log('Donorbox loaded');
      } else {
        setTimeout(checkDonorbox, 100);
      }
    };
    checkDonorbox();
  }, []);

  const handleDonateClick = (e) => {
    e.preventDefault();
    console.log('Donate button clicked');
    
    // Try different methods to trigger Donorbox popup
    if (window.Donorbox && window.Donorbox.open) {
      console.log('Using Donorbox.open');
      window.Donorbox.open('https://donorbox.org/support-our-mission-821281');
    } else if (window.Donorbox && window.Donorbox.show) {
      console.log('Using Donorbox.show');
      window.Donorbox.show();
    } else {
      console.log('Donorbox not found, trying alternative method');
      // Fallback: create and click the actual Donorbox button
      const donorboxButton = document.getElementById('preview_inline_popup_button');
      if (donorboxButton) {
        console.log('Found Donorbox button, clicking it');
        donorboxButton.click();
      } else {
        console.log('Donorbox button not found');
      }
    }
  };

  return (
    <a 
      className="dbox-donation-button" 
      id="preview_inline_popup_button" 
      href="https://donorbox.org/support-our-mission-821281?" 
      onClick={handleDonateClick}
      style={{
        background: 'rgb(12, 51, 115)', 
        color: 'rgb(255, 255, 255)', 
        textDecoration: 'none', 
        fontFamily: 'Verdana, sans-serif', 
        display: 'flex', 
        gap: '8px', 
        width: 'fit-content', 
        fontSize: '16px', 
        borderRadius: '5px', 
        lineHeight: '24px', 
        padding: '8px 24px'
      }}
    >
      <img src="https://donorbox.org/images/white_logo.svg" />
      Donate
    </a>
  );
};

export default DonorboxButton;
