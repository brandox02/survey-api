import { ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

export interface Paginate<T> {
  items: T[];
  metadata: {
    totalItems: number;
    perPage: number;
    totalPages: number;
  };
}

@ObjectType()
export class PaginatedMetadata {
  totalItems: number;
  perPage: number;
  totalPages: number;
}

@ObjectType()
export class PaginatedUser implements Paginate<User> {
  items: User[];
  metadata: PaginatedMetadata;
}
