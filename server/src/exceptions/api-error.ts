export default class ApiError extends Error {
  status
  errors

  constructor(status: number, message: string, errors = []) {
    super(message)
    ;(this.status = status), (this.errors = errors)
  }

  static UnauthrizedError = () => {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static BadRequest = (message: string, errors = []) => {
    return new ApiError(401, message, errors)
  }
}