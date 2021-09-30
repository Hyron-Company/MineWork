import React from 'react'
interface HeadingProps {
  heading: string
}

export const Heading: React.FC<HeadingProps> = ({ heading }) => {
  return <h1 className={`text-heading`}>{heading}</h1>
}
