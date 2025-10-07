import React from 'react';
import { RxCross1 } from 'react-icons/rx';

const BadgesPopup = ({ badge, onClose }) => {
  if (!badge) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      zIndex: 1000,
      width: '90%',
      maxWidth: '400px',
      textAlign: 'center'
    }}>
      <div className='absolute right-3 top-2' onClick={onClose}>
        <RxCross1 className='text-3xl rounded-full bg-btnbackground text-white p-2 cursor-pointer' />
      </div>
      <div className='flex flex-col justify-between gap-8 mt-10'>
        <h2 className='text-3xl text-[#0c3373] mb-[15px] font-semibold font-HelveticaNeue'>Congratulations! 🎉</h2>
        <p className='mb-[10px] text-xl'>You've earned a new badge:</p>
        <h3 className='text-[#1CC932] text-3xl mb-[15px]'>{badge.name}</h3>
        <p className='font-serif mb-[20px] font-semibold text-xl'>{badge.criteria}</p>
        <button 
          onClick={onClose}
          className='py-[8px] px-[16px] bg-btnbackground text-white rounded-sm cursor-pointer mt-[10px] font-bold'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BadgesPopup;