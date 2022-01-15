import { registerEnumType } from 'type-graphql'

export enum RoleEnum {
  USER = 'User',
  ADMIN = 'Admin',
  MODERATOR = 'Moderator',
}

registerEnumType(RoleEnum, {
  name: 'Role',
  description: 'Role enum'
})
