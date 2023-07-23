import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';

@ObjectType()
export class AuthenticatedUser extends BaseEntity {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

@ObjectType()
export class LoginOutput {
  accessToken: string;
  user: AuthenticatedUser;
}
