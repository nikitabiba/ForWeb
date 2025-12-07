import * as t from 'io-ts'
import { fold } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

export function decodeOrThrow<A, O, I>(codec: t.Type<A, O, I>, data: I): A {
  return pipe(
    codec.decode(data),
    fold(
      (errors) => {
        const errorMessages = errors.map((error) => {
          const path = error.context.map((c) => c.key).join('.')
          return `Invalid value at ${path}: expected ${error.context[error.context.length - 1]?.type.name}`
        })
        throw new Error(`Validation failed:\n${errorMessages.join('\n')}`)
      },
      (value) => value
    )
  )
}