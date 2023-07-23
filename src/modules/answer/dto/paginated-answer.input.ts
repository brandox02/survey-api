import { ObjectType } from '@nestjs/graphql';
import { PaginatedMetadata } from 'src/modules/user/dto/paginated-user.output';

import { Answer } from '../entities/answer.entity';

export interface Paginate<T> {
  items: T[];
  metadata: {
    totalItems: number;
    perPage: number;
    totalPages: number;
  };
}

@ObjectType()
export class PaginatedAnswer implements Paginate<Answer> {
  items: Answer[];
  metadata: PaginatedMetadata;
}
