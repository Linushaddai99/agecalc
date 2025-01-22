import React from 'react'
import arrow from '../assets/icon-arrow.svg'
import { validateValue, checkDate } from '../utilities'

type FormProps = {
    setDate:  React.Dispatch<React.SetStateAction<{
    years: number;
    months: number;
    days: number;
    }>>
    setAnimatedDate: React.Dispatch<React.SetStateAction<{
        animatedyears: number;
        animatedmonths: number;
        animateddays: number;
    }>>
}

const Form: React.FC<FormProps> = ({ setDate, setAnimatedDate })  => {

    const [day, setDay] = React.useState(0);
    const [dayError, setDayError] = React.useState('');

    const [month, setMonth] = React.useState(0);
    const [monthError, setMonthError] = React.useState('');

    const [year, setYear] = React.useState(0);
    const [yearError, setYearError] = React.useState('');

    const [info, setInfo] = React.useState('')

    const formContent = [
        {
            label: 'DAY',
            name: 'day',
            type: 'number',
            placeholder: 'DD',
            error: dayError,
            showError: false
        },
        {
            label: 'MONTH',
            name: 'month',
            type: 'number',
            placeholder: 'MM',
            error: monthError,
            showError: false
        },
        {
            label: 'YEAR',
            name: 'year',
            type: 'number',
            placeholder: 'YYYY',
            error: yearError,
            showError: false
        }
    ]

    const enableSubmit = dayError.length === 0 && monthError.length === 0 && yearError.length === 0 && day > 0 && month > 0 && year > 0;

    const checkForErrors = (type: string, value: number ) => {
       if(type === 'day') {
        setDayError(validateValue({ type: 'day', value: value }));
       } else if(type === 'month') {
        setMonthError(validateValue({ type: 'month', value: value }));
       } else if(type === 'year') {
        setYearError(validateValue({ type: 'year', value: value }));
       }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: string): void => {
        setDate({ days: 0, months: 0, years: 0 });
        setAnimatedDate({ animateddays: 0, animatedmonths: 0, animatedyears: 0 });
        const value = parseInt(e.target.value);
        if(type === 'day') {
            setDay(value);
            checkForErrors(type, value);
        } else if(type === 'month') {
            setMonth(value);
            checkForErrors(type, value);
        }  else if(type === 'year') {
            setYear(value);
            checkForErrors(type, value);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = checkDate({ day, month, year });
        if (typeof result === 'string') {
            setInfo(result);
        } else if(typeof result === 'object') {
            setInfo('');
            setDate(result);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        // e.preventDefault();
        if (e.key === 'Enter') {
            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
        }
    }
    

  return (
    <div>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <div className='flex justify-left items-left md:gap-8 gap-4 mb-5'>
        {
            formContent.map((item, index) => (
                <div key={index}>
                    <label htmlFor="" className={`text-xs font-bold ${item.error.length ? 'text-[#ff5757]' : 'text-[#716f6f]' }`} >{item.label}</label><br />
                    <input 
                    type={item.type} 
                    value={item.name === 'day' ? day : item.name === 'month' ? month : item.name === 'year' ? year : ''} 
                    onChange={(e) => handleChange(e, item.name)} 
                    placeholder={item.placeholder} 
                    className={`border ${item.error.length ? 'border-red-500' : 'border-gray-700'} md:w-32 w-16 my-2 p-2 font-bold text-xl rounded-md placeholder:text-[#716f6f] placeholder:font-bold`} />
                    <p className='text-[#ff5757] text-xs h-10'>{item.error.length? item.error : ''}</p>
                </div>
            ))
        }
        </div>
        <div className='text-right relative'>
            <hr className='w-4/5' />
            <button 
            type='submit' 
            className={`bg-[#854dff] text-white p-2 rounded-full absolute right-24 -top-6 hover:bg-black ${enableSubmit ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            disabled={!enableSubmit}
            >
                <img src={arrow} className='h-7' alt='arrow btn' />
            </button>
        </div>
      </form>
      <div>
          {
            info && <p className='text-center text-[#854dff] font-semibold mt-5'>{info}</p>
          }
        </div>
    </div>
  )
}

export default Form
