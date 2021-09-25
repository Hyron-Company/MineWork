import MuiButton, { ButtonProps } from '@mui/material/Button'

interface IProps extends ButtonProps {
  text?: string
}

export const Button: React.FC<IProps> = ({ text, variant, className, children, ...rest }) => {
  return (
    <MuiButton className={`button ${variant} ${className}`} {...rest}>
      {text}
      {children}
    </MuiButton>
  )
}
