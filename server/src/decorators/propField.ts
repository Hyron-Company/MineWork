import { Field, FieldOptions } from 'type-graphql';
import { ReturnTypeFunc } from 'type-graphql/dist/decorators/types';
import { prop, PropOptionsWithValidate } from 'typegoose';

export const propField = (propOptions?: PropOptionsWithValidate, returnTypeFunction?: ReturnTypeFunc | null, fieldOptions?: FieldOptions) => (target: Object, propertyKey: string | symbol) => {
    prop(propOptions)(target, propertyKey as string);
    (returnTypeFunction ? Field(returnTypeFunction, fieldOptions || undefined) : Field(fieldOptions || {}))(target, propertyKey as string)
}
