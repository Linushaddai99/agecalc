import React, {useEffect, useState} from 'react'

// Define the type for the props
type ResultProps = {
    date: {
      years: number;
      months: number;
      days: number;
    }
    animatedDate: {
        animatedyears: number;
        animatedmonths: number;
        animateddays: number;
    }
  }

const Result: React.FC<ResultProps> = ({ date, animatedDate }) => {    

    const [years, setYears] = useState(0)
    const [months, setMonths] = useState(0)
    const [days, setDays] = useState(0)


    const [animatedYears, setAnimatedYears] = useState(0)
    const [animatedMonths, setAnimatedMonths] = useState(0)
    const [animatedDays, setAnimatedDays] = useState(0)

    if (years > 0) {
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

      if (months > 0) {
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

       if (days > 0) {
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

    useEffect(() => {
        setYears(date?.years)
        setMonths(date?.months)
        setDays(date?.days)

        setAnimatedYears(animatedDate?.animatedyears)
        setAnimatedMonths(animatedDate?.animatedmonths)
        setAnimatedDays(animatedDate?.animateddays)

    }, [date])

  return (
    <div className='mt-10'>
      <div className='flex items-center'>
        <p  className='mr-5 md:text-[50px] text-[40px] font-bold text-[#854dff]'>{years > 0 ? animatedYears : '- -'}</p>
        <h2 className='md:text-[50px] text-[40px] font-bold'>years</h2>
      </div>

      <div className='flex items-center'>
        <p  className='mr-5 md:text-[50px] text-[40px] font-bold text-[#854dff]'>{months > 0 ? animatedMonths : '- -'}</p>
        <h2 className='md:text-[50px] text-[40px] font-bold'>months</h2>
      </div>

      <div className='flex items-center'>
        <p  className='mr-5 md:text-[50px] text-[40px] font-bold text-[#854dff]'>{days > 0 ? animatedDays : '- -'}</p>
        <h2 className='md:text-[50px] text-[40px] font-bold'>days</h2>
      </div>
    </div>
  )
}

export default Result
