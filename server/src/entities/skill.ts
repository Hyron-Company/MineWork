import { ArgsType, Field, InputType, Int, ObjectType } from 'type-graphql'
import { Typegoose } from 'typegoose'
import { Length } from 'class-validator'
import { Status } from './enum-status'
import { propField } from '../decorators/propField'

@ObjectType()
export class Skill extends Typegoose {
  @Field({ nullable: true })
  readonly _id: string;

  @propField({ required: true })
  name: string;

  @propField({}, null, { nullable: true })
  shortName: string;

  @propField({}, null, { nullable: true })
  description: string;

  @propField({}, () => Int, { nullable: true })
  progress: number

  @propField({ enum: Status }, () => Status, { nullable: true })
  status: string;
}

export const SkillModel = new Skill().getModelForClass<typeof Skill>(Skill);

@InputType()
@ArgsType()
export class AddSkill extends Typegoose{
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  @Length(0, 10)
  shortName: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Int, { nullable: true })
  progress: number;

  @Field(() => Status, { nullable: true, defaultValue: Status.ACTIVE })
  status: Status;
}