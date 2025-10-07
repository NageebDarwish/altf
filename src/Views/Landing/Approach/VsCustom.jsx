import React from 'react'

const VsCustom = ({img,note,description1,description2}) => {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg overflow-hidden">
    <div className="relative">
      <img
        src={img}
        alt="Learning Inspiration"
        className="w-full h-60 object-cover "
      />
      <a
        href="#"
        className="absolute bottom-0 right-0 text-white bg-black/60 px-4 py-2 rounded-tl-lg"
      >
        {note}
      </a>
    </div>
    <div className="p-6">
      <p className="text-paracolor text-sm mb-4">
       {description1}
      </p>
      <p className="text-paracolor text-sm">
      {description2}
      </p>
    </div>
  </div>
  )
}

export default VsCustom
