export default class ApiError extends Error {
  status
  errors
  stacktrace = []

  constructor(status: number, message: string, errors = []) {
    super(message)
    ;(this.status = status), (this.errors = errors)
  }

  static UnauthrizedError = () : ApiError => {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static BadRequest = (message: string, errors = []) : ApiError => {
    return new ApiError(401, message, errors)
  }
}
