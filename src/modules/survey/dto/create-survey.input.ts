import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateSurveyInput {
  title: string;

  @Field(() => GraphQLJSON)
  content: typeof GraphQLJSON;

  userId: number;
}
