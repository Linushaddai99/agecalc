import { useState } from 'react'
import Form from './Form'
import Result from './Result'

const Calc = () => {
  const [date, setDate] = useState({ years: 0, months: 0, days: 0 });
  const [animatedDate, setAnimatedDate] = useState({ animatedyears: 0, animatedmonths: 0, animateddays: 0 });


  return (
    <div className='md:p-6 p-3 bg-white md:w-[550px] w-4/5 m-auto rounded-3xl md:rounded-br-[150px] rounded-br-[100px]'>
        <h1 className='text-center font-semibold mb-5 text-xl text-[#854dff]'>Check your life span</h1>
        <Form setDate={setDate} setAnimatedDate={setAnimatedDate} />
        <Result date={date} animatedDate={animatedDate} />
    </div>
  )
}

export default Calc
