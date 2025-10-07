import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Container } from '@components/common';

const StillQuestion = () => {
  return (
    <Container className="py-8 md:py-12">
      <div className="rounded-[50px]">
        <div className="flex flex-col items-center justify-center font-helvetica">
          <h1 className="text-[#0C3373] font-extrabold text-lg md:text-[23px] mb-3">
            Still Have Questions?
          </h1>
          <button className="flex gap-2 text-lg md:text-xl bg-btnbackground text-white px-6 py-3 md:py-4 rounded-full hover:bg-hoverbtn transition">
            Contact Us <FaChevronRight className="mt-1" />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default StillQuestion;
