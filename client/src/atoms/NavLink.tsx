import { A, AProps } from './A'

export const NavLink: React.FC<AProps> = ({ className, text, children, ...rest }) => {
  return (
    <A className={`nav-link ${className}`} {...rest}>
      {children}
      {text}
    </A>
  )
}