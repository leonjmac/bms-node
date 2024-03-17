/**
 * All application errors should subclass this base class.
 * This will ensure that the error-handler middleware consumes 
 * the error and returns errors in a consistent format
 */

import { ISerializedError } from "../interfaces/ISerializedError"

export abstract class CustomError extends Error {
  abstract statusCode: number
  abstract serializeErrors(): ISerializedError

  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}