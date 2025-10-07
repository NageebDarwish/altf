import React from 'react'
import { FiArrowRightCircle } from 'react-icons/fi'
import { GrCaretNext } from 'react-icons/gr'

const ApprochLanding = () => {
  return (
    <>
       <div className=' bg-[#E9E9E9] py-10 lg:py-10 px-6 sm:px-10 gap-8 lg:gap-0'>
                <div className=''>
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl text-[#0C3373] font-semibold mb-4'>
                    This Approach Really Works!
                    </h1>
                    <div className='flex flex-col text-[#9B9B9B] gap-6 sm:gap-8 lg:gap-10 text-base sm:text-lg lg:text-xl w-full lg:w-[90%]'>
                        <p>
                        Curious to know why? Discover the science behind comprehensible input, the most effective way to learn a language naturally. It’s backed by decades of research, highly intuitive, and proven to work.                        </p>
                    </div>
                </div>
                <div className='pt-20'>
                    <button className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-3 font-semibold rounded-full hover:bg-orange-600 transition ">
                    Learn More About the Approach <FiArrowRightCircle className="mt-1" />
                </button>
                </div>
            </div>
    </>
  )
}

export default ApprochLanding
