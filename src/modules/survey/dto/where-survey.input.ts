import { InputType } from '@nestjs/graphql';

@InputType()
export class WhereSurveyInput {
  id?: number;
  title?: string;
  userId?: number;
  enabled?: boolean;
}
