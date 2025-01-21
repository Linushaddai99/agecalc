import React from 'react'
import arrow from '../assets/icon-arrow.svg'
import { validateValue, checkDate } from '../utilities'

type FormProps = {
    setDate:  React.Dispatch<React.SetStateAction<{
    year: number;
    month: number;
    day: number;
    }>>
}

const Form: React.FC<FormProps> = ({ setDate })  => {

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

    const textColor = '#716f6f';
    const errorColor = '#ff5757'
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
        setDate({ day: 0, month: 0, year: 0 });
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
            setDate({ day, month, year })
        }
    }
    

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-left items-left gap-8 mb-5'>
        {
            formContent.map((item, index) => (
                <div key={index}>
                    <label htmlFor="" className={`text-xs font-semibold text-[${item.error.length ? errorColor : textColor}]`} >{item.label}</label><br />
                    <input 
                    type={item.type} 
                    value={item.name === 'day' ? day : item.name === 'month' ? month : item.name === 'year' ? year : ''} 
                    onChange={(e) => handleChange(e, item.name)} 
                    placeholder={item.placeholder} 
                    className={`border ${item.error.length ? 'border-red-500' : 'border-gray-700'} w-32 my-2 p-2 rounded-md placeholder:text-[#716f6f] placeholder:font-bold`} />
                    <p className='text-[#ff5757] text-xs h-10'>{item.error.length? item.error : ''}</p>
                </div>
            ))
        }
        </div>
        <div className='text-right relative'>
            <hr />
            <button 
            type='submit' 
            // className='bg-[#854dff] text-white p-2 rounded-full absolute right-0 -top-6'
            className={`bg-[#854dff] text-white p-2 rounded-full absolute right-0 -top-6 ${enableSubmit ? 'cursor-pointer' : 'cursor-not-allowed'}`}
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
