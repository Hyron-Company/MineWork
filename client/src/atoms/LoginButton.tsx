import MuiButton, { ButtonProps } from '@mui/material/Button'

interface IProps extends ButtonProps {
  text?: string
  onClick: any
}
export const LoginButton: React.FC<IProps> = ({ text, className, children, onClick }) => {
  return (
    <MuiButton className={`button-login ${className}`} onClick={onClick}>
      {children}
      {text}
    </MuiButton>
  )
}
