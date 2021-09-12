import { HttpStatusCode } from '../types'

export class HttpException extends Error {
  status: HttpStatusCode
  trustedException: boolean
  constructor(message: string, status: HttpStatusCode){
    super(message)
    this.status = status
    this.trustedException = true
  }
}
export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found') {
    super(message, HttpStatusCode.NotFound)
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'BadRequest') {
    super(message, HttpStatusCode.BadRequest)
  }
}

export class ForbiddenException extends HttpException {
  constructor (message: string = 'Forbidden') {
    super(message, HttpStatusCode.Forbidden)
  }
}

export class UnAuthorizedException extends HttpException {
  constructor (message: string = 'UnAuthorized') {
    super(message, HttpStatusCode.UnAuthorized)
  }
}

export class InternalServerErrorException extends HttpException {
  constructor (message: string = 'Internal Server Error') {
    super(message, HttpStatusCode.InternalServer)
  }
}

