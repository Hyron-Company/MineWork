import * as React from 'react'
import { Box } from '@mui/system'
import Dialog from '@mui/material/Dialog'
import { useGlobalState } from '../../globalState'
import LabelInput from '../../atoms/LabelInput'
import { ButtonWithBG } from '../../atoms/ButtonWithBG'
import { Heading } from '../../atoms/Heading'
import { Button } from '../../atoms/Button'
import { FacebookLink } from '../../molecules/FacebookLink'
import { AppleLink } from '../../molecules/AppleLink'
import { AuthGoogleButton } from '../../atoms/AuthGoogleButton'
import { TextLink } from '../../atoms/TextLink'
import { LinkToUsContainer } from '../../molecules/LinkToUsContainer'
import { BoxTextlink } from '../../molecules/BoxTextlink'

export const AuthorizationDialog = () => {
  const [open, setOpen] = useGlobalState('followPopup')

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className="authorization-dialog">
      <Dialog className="modal-window" open={open} onClose={handleClose}>
        <BoxTextlink />
        <Heading heading={'Войдите'} />

        <LinkToUsContainer />

        <LabelInput label="Почта" placeholder="Введите почту" />
        <LabelInput label="Пароль" placeholder="Введите пароль" />

        <TextLink href="forgot password" textOne="Забыли пароль?" />

        <ButtonWithBG className="" text={'Войти'} />
      </Dialog>
    </div>
  )
}
