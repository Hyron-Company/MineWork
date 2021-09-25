import { InputBase, InputBaseProps } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { Button } from './Button'

interface IProps extends InputBaseProps {
  children?: React.ReactNode
  isWithButton?: boolean
  buttonText?: string
  setValue?: Dispatch<SetStateAction<string>>
  handleButtonClick?: () => void
}

export const Input: React.FC<IProps> = ({
  children,
  isWithButton,
  buttonText,
  className,
  setValue,
  handleButtonClick,
  onChange,
  ...rest
}) => {
  const { find } = useLanguage()

  if (!buttonText) {
    buttonText = find
  }

  if (!onChange && setValue) {
    onChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setValue(event.target.value)
  }

  return (
    <div className={`base-input ${className}`}>
      <InputBase className="base-input__text-field" {...rest} onChange={onChange} />
      <div className="base-input__content">
        {children}
        {isWithButton && <Button variant="contained" text={buttonText} onClick={handleButtonClick} />}
      </div>
    </div>
  )
}
