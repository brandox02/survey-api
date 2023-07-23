import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseEntity } from 'src/common/BaseEntity';
import { Answer } from 'src/modules/answer/entities/answer.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

export type QuestionType =
  | 'text'
  | 'comment'
  | 'radiogroup'
  | 'checkbox'
  | 'boolean';

interface BaseQuestion {
  name: string;
  title: string;
  type: QuestionType;
  isRequired: boolean;
}
export interface TextFieldQuestion extends BaseQuestion {
  inputType: 'text' | 'number';
}
export interface RadioGroupQuestion extends BaseQuestion {
  choices: Array<{ text: string; value: string }>;
}

export interface CheckboxGroupQuestion extends BaseQuestion {
  choices: Array<{ text: string; value: string }>;
}

export interface BooleanQuestion extends BaseQuestion {
  labelTrue: string;
  labelFalse: string;
}

export type QuestionElement =
  | TextFieldQuestion
  | RadioGroupQuestion
  | CheckboxGroupQuestion
  | BooleanQuestion;

@Entity({ name: 'surveys' })
@ObjectType()
export class Survey extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ type: 'json' })
  @Field(() => GraphQLJSON)
  content: typeof GraphQLJSON;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'enabled', default: true, nullable: true })
  enabled: boolean;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToMany(() => Answer, (d) => d.survey, {
    cascade: true,
    eager: true,
  })
  answers?: Answer[];
}
