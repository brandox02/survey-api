import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateAnswerInput {
  id: number;
  respondentFullname?: string;
  respondentEmail?: string;
  @Field(() => GraphQLJSON)
  content?: typeof GraphQLJSON;
  surveyId?: number;
}
