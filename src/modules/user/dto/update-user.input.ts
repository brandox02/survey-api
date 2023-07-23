import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  id: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}
