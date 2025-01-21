import React, {useState} from 'react'
import { getAge } from '../utilities'

// Define the type for the props
type ResultProps = {
    date: {
      year: number;
      month: number;
      day: number;
    }
  }

const Result: React.FC<ResultProps> = ({ date }) => {
    const { years, months, days } = getAge(date);

    const [animatedYears, setAnimatedYears] = useState(0)
    const [animatedMonths, setAnimatedMonths] = useState(0)
    const [animatedDays, setAnimatedDays] = useState(0)

    if (date.year > 0) {
       const yearsInterval = setInterval(() => {
          setAnimatedYears((prev: number) => {
            if (prev < years) {
              return prev + 1
            } else {
              clearInterval(yearsInterval)
              return prev
            }
          })
        }, 500)
      }

      if (date.year > 0) {
        const monthsInterval = setInterval(() => {
           setAnimatedMonths((prev: number) => {
             if (prev < months) {
               return prev + 1
             } else {
               clearInterval(monthsInterval)
               return prev
             }
           })
         }, 500)
       }

       if (date.year > 0) {
        const daysInterval = setInterval(() => {
           setAnimatedDays((prev: number) => {
             if (prev < days) {
               return prev + 1
             } else {
               clearInterval(daysInterval)
               return prev
             }
           })
         }, 500)
       }

  return (
    <div className='mt-10'>
      <div className='flex items-center'>
        <p  className='mr-5 text-[70px] font-bold text-[#854dff]'>{date.year > 0 ? animatedYears : '- -'}</p>
        <h2 className='text-[70px] font-bold'>years</h2>
      </div>

      <div className='flex items-center'>
        <p  className='mr-5 text-[70px] font-bold text-[#854dff]'>{date.month > 0 ? animatedMonths : '- -'}</p>
        <h2 className='text-[70px] font-bold'>months</h2>
      </div>

      <div className='flex items-center'>
        <p  className='mr-5 text-[70px] font-bold text-[#854dff]'>{date.day > 0 ? animatedDays : '- -'}</p>
        <h2 className='text-[70px] font-bold'>days</h2>
      </div>
    </div>
  )
}

export default Result
