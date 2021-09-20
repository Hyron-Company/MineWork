import { MutationRegistrationArgs, ResolversParentTypes } from './../resolvers.d'
import { UserDto } from './../dtos/user-dto'
import { generateTokens, saveToken } from './Token'
import UserModel from '../../models/user-model'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import { sendActivationMail } from './Mail'
import { ExpressContext } from 'apollo-server-express'

export const registration = async (
  parent: ResolversParentTypes,
  { email, password }: MutationRegistrationArgs,
  { res }: ExpressContext
) => {
  const candidate = await UserModel.findOne({ email })
  if (candidate) {
    throw new Error(`Пользователь с почтой ${email} уже существует`)
  }

  const hashPassword = await bcrypt.hash(password, 3)
  const activationLink = v4()
  const user = await UserModel.create({ email, password: hashPassword, activationLink })

//   await sendActivationMail(email, `http://localhost:5000/`)

  const userDto = UserDto(user)
  const tokens = generateTokens(userDto)
  await saveToken(userDto.id, tokens.refreshToken)

//   res.cookie('refreshToken', tokens.refreshToken, {
//     httpOnly: true,
//     maxAge: 30 * 24 * 60 * 60 * 1000
//   });

  return {
    ...tokens,
    ...userDto
  }
}
