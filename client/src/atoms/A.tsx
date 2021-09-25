import Link, { LinkProps } from 'next/link'

export interface IProps extends LinkProps {
  className?: string
  text?: string
}

export const A: React.FC<IProps> = ({ children, text, href, className, ...rest }) => {
  return (
    <Link href={href} {...rest}>
      <a className={className}>
        {text}
        {children}
      </a>
    </Link>
  )
}
