import { ObjectType } from '@nestjs/graphql';
// import { PaginatedMetadata } from 'src/modules/survey/dto/paginated-survey.output';
import { User } from '../entities/user.entity';
import { Paginate, PaginatedMetadata } from './paginated-user.output';

@ObjectType()
export class GetUserInfo {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@ObjectType()
export class PaginatedUser implements Paginate<User> {
  items: User[];
  metadata: PaginatedMetadata;
}

@ObjectType()
export class UpdateUser {
  accessToken: string;
  user: User;
}
