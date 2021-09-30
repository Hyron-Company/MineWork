import { Box } from '@mui/system'
import React from 'react'
import { TextLink } from '../atoms/TextLink'

export const BoxTextlink = () => {
  return (
    <Box className="box-text-link">
      <TextLink
        href="forgot password"
        className="dark"
        position="horizontal"
        textOne="Добро пожаловать в "
        textTwo="MineWork"
      />
      <TextLink
        href="forgot password"
        position="vertical"
        className="gray"
        textOne="Нет аккаунта?"
        textTwo="Зарегестрируйтесь!"
      />
    </Box>
  )
}
