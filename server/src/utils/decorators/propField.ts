import { Field, FieldOptions } from 'type-graphql'
import { getTypeDecoratorParams } from 'type-graphql/dist/helpers/decorators'
import { ReturnTypeFunc } from 'type-graphql/dist/decorators/types'
import { prop, PropOptionsWithValidate } from 'typegoose'

export const propField = (propOptions?: PropOptionsWithValidate, returnTypeFuncOrOptions?: ReturnTypeFunc | FieldOptions, maybeOptions?: FieldOptions) =>
  (target: Object, propertyKey: string) => {
    const { options, returnTypeFunc } = getTypeDecoratorParams(returnTypeFuncOrOptions, maybeOptions)
    prop(propOptions)(target, propertyKey)
    Field(returnTypeFunc, options)(target, propertyKey)
}
