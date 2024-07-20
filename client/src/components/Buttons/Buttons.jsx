import React from 'react'
import MainButton from './MainButton'
import SecondaryButton from './SecondaryButton';

const Buttons = () => {
  const handleClick = () => {
    console.log('Main Button');
  }

  return (
    <div className='p-4'>
      <MainButton onClick={handleClick} disabled={false}>Main Button</MainButton>
      <SecondaryButton onClick={handleClick}>Secondary Button</SecondaryButton>
    </div>
  )
}

export default Buttons
