import MuiButton, { ButtonProps } from '@mui/material/Button'

interface IProps extends ButtonProps {
  text?: string
}

export const ButtonWithBG: React.FC<IProps> = ({ text, className, ...rest }) => {
  return (
    <MuiButton className={`button-with-bg  ${className}`} {...rest}>
      <span className="button-with-bg__text">{text}</span>
    </MuiButton>
  )
}
