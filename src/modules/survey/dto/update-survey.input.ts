import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateSurveyInput {
  id: number;
  title?: string;
  @Field(() => GraphQLJSON)
  content?: typeof GraphQLJSON;
  userId?: number;
  enabled?: boolean;
}
