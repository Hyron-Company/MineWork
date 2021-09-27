import UserController from '../../controllers/user-controller';
const userResolver = {
  Mutation: {
    registration: UserController.registration,
    activate: UserController.activate
  }
}

export default userResolver;
