import React, { useState } from 'react'
import Form from './Form'
import Result from './Result'
// import { getAge } from '../utilities'

const Calc = () => {
  const [date, setDate] = useState({ year: 0, month: 0, day: 0 });


  return (
    <div className='p-10 bg-white w-[800px] m-auto rounded-br-3xl'>
        <h1 className='text-center font-semibold mb-5 text-xl text-[#854dff]'>Welcome to Age Calculator</h1>
        <Form setDate={setDate}/>
        
        <Result date={date} />
    </div>
  )
}

export default Calc
