import { FormLabel } from '@mui/material'
import React from 'react'
import { Input } from './Input'

interface LabelInputProps {
  label: string
  className?: string
  placeholder?: string
}

const LabelInput: React.FC<LabelInputProps> = ({ className, placeholder, label }) => {
  return (
    <div className={`label-input-container ${className}`}>
      <FormLabel className="label-input-container__label">{label}</FormLabel>
      <Input className={'input-container'} placeholder={placeholder} />
    </div>
  )
}

export default LabelInput
