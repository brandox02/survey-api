import { InputType } from '@nestjs/graphql';

@InputType()
export class UserWhereInput {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}
