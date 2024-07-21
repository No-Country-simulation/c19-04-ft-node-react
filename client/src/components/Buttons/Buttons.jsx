import React from 'react'
import MainButton from './MainButton'
import SecondaryButton from './SecondaryButton'
import MainIconButton from './MainIconButton'
import bookIconSvg from '../../assets/svg/book-open.svg'
import SecondaryIconButton from './SecondaryIconButton'
import IconButtonMain from './IconButtonMain'
import IconButtonSecondary from './IconButtonSecondary'
import TextButton from './TextButton'
import minusSvg from '../../assets/svg/minus.svg'
import plusSvg from '../../assets/svg/plus.svg'


const Buttons = () => {
  return (
    <div className='flex flex-col justify-center gap-4 p-7'>
      <MainButton>Main Button</MainButton>
      <MainButton disabled>Main Button Disabled</MainButton>
      <SecondaryButton>Secondary Button</SecondaryButton>
      <SecondaryButton disabled>Secondary Butto Disabled</SecondaryButton>
      <MainIconButton icon={bookIconSvg}>Main Icon Button</MainIconButton>
      <MainIconButton icon={bookIconSvg} disabled>Main Icon Button</MainIconButton>
      <SecondaryIconButton icon={bookIconSvg}>Secondary Icon Button</SecondaryIconButton>
      <SecondaryIconButton icon={bookIconSvg} disabled>Secondary Icon Button</SecondaryIconButton>
      <div className='flex flex-row gap-4 h-[60px]'>
        <IconButtonMain icon={bookIconSvg} classNameIcon={'w-6'}></IconButtonMain>
        <IconButtonMain icon={bookIconSvg} classNameIcon={'w-6'} disabled></IconButtonMain>
        <IconButtonSecondary icon={bookIconSvg} classNameIcon={'w-6'}></IconButtonSecondary>
        <IconButtonSecondary icon={bookIconSvg} classNameIcon={'w-6'} disabled></IconButtonSecondary>
        
      </div>
      <TextButton>Text Button</TextButton>
      <TextButton disabled>Text Button</TextButton>
      <div className='flex gap-4'>
        <IconButtonSecondary icon={minusSvg} classNameIcon={"w-6"}></IconButtonSecondary>
        <IconButtonSecondary icon={plusSvg} classNameIcon={"w-6"}></IconButtonSecondary>
      </div>
      
    </div>
  )
}

export default Buttons
