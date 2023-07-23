import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateAnswerInput {
  respondentFullname: string;
  respondentEmail: string;
  surveyId: number;

  @Field(() => GraphQLJSON)
  content: typeof GraphQLJSON;
}
