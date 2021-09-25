import UserController from '../../controllers/user-controller';
const userResolver = {
  Mutation: {
    registration: UserController.registration
  }
}

export default userResolver;
