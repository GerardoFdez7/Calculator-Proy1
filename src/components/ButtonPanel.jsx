import React from 'react'
import Button from './Button'

const ButtonPanel = ({ onButtonClick }) => {
  const buttonConfigs = [
    {l:'AC',c:'ac'},{l:'DEL',c:'del'},{l:'+/-',c:'plus-minus'},{l:'÷',c:'operator'},
    {l:'7'},{l:'8'},{l:'9'},{l:'*',c:'operator'},
    {l:'4'},{l:'5'},{l:'6'},{l:'+',c:'operator'},
    {l:'1'},{l:'2'},{l:'3'},{l:'-',c:'operator'},
    {l:'0',c:'span-two'},{l:'.'},{l:'=',c:'operator'}
  ]
  return (
    <>
      {buttonConfigs.map(b => <Button key={b.l} label={b.l} onClick={onButtonClick} className={b.c} />)}
    </>
  )
}
export default ButtonPanel