import { InputType } from '@nestjs/graphql';

@InputType()
export class WhereAnswerInput {
  id?: number;
  respondentFullname?: string;
  respondentEmail?: string;
  surveyId?: number;
}
