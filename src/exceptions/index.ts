import { HttpStatusCode } from '../types'
/**
 * @example
 * throw new HttpException("your error message", your_status_number)
 */
export class HttpException extends Error {
  status: HttpStatusCode
  trustedException: boolean
  constructor(message: string, status: HttpStatusCode){
    super(message)
    this.status = status
    this.trustedException = true
  }
}
/**
 * @example
 * throw new NotFoundException()
 */
export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found') {
    super(message, HttpStatusCode.NotFound)
  }
}
/**
 * @example
 * throw new BadRequestException()
 */
export class BadRequestException extends HttpException {
  constructor(message: string = 'BadRequest') {
    super(message, HttpStatusCode.BadRequest)
  }
}
/**
 * @example
 * throw new ForbiddenException()
 */
export class ForbiddenException extends HttpException {
  constructor (message: string = 'Forbidden') {
    super(message, HttpStatusCode.Forbidden)
  }
}
/**
 * @example
 * throw new UnAuthorizedException()
 */
export class UnAuthorizedException extends HttpException {
  constructor (message: string = 'UnAuthorized') {
    super(message, HttpStatusCode.UnAuthorized)
  }
}
/**
 * @example
 * throw new InternalServerErrorException()
 */
export class InternalServerErrorException extends HttpException {
  constructor (message: string = 'Internal Server Error') {
    super(message, HttpStatusCode.InternalServer)
  }
}

