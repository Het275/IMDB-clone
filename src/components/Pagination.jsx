import React from 'react'

function Pagination({pageNo, handlePrevious, handleNext}) {
  return (
    <div className='flex justify-center bg-gray-900/70 p-2 mt-5'>
        <div onClick={handlePrevious} className='px-5 hover:cursor-pointer'><i className="fa-solid fa-arrow-left"></i></div>
        <div>{pageNo}</div>
        <div onClick={handleNext} className='px-5 hover:cursor-pointer'><i className="fa-solid fa-arrow-right"></i></div>
    </div>
  )
}

export default Pagination