import React from 'react'

const InputSearch = ({ onChange, onValue, placeholder }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            value={onValue}
            className='min-w-full min-h-[38px] text-sm leading-[17.64px] rounded-lg p-[10px] text-customRed-600 outline-none transition-all duration-300 shadow-custom-light hover:shadow-custom-light-focushovered focus:shadow-custom-light-focushovered disabled:shadow-custom-light'
        />
    )
}

export default InputSearch