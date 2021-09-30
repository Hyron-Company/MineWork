import { A, IProps } from './A'

export const NavLink: React.FC<IProps> = ({ className, text, children, ...rest }) => {
  return (
    <A className={`nav-link ${className}`} {...rest}>
      {children}
      {text}
    </A>
  )
}
