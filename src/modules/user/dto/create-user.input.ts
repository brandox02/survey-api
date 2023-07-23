import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  firstname: string;

  lastname: string;

  email: string;
  password: string;
}
