import { registerEnumType } from 'type-graphql'

export enum Role {
  USER = 'User',
  ADMIN = 'Admin',
  MODERATOR = 'Moderator',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'Role enum'
})
