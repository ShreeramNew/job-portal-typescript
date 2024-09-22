import React from 'react'
import { FaSearch} from "react-icons/fa";
export default function NoResult() {
  return (
    <div className="bg-gray-300 w-[900px] h-[300px] p-[30px] flex gap-[30px] justify-center items-center rounded-2xl">
      <h1 className='text-[30px]'>Search by Role, Skill or Location</h1>
      <FaSearch size={40}/>
    </div>
  )
}
