import { ObjectType } from '@nestjs/graphql';
import { PaginatedMetadata } from 'src/modules/user/dto/paginated-user.output';

import { Survey } from '../entities/survey.entity';

export interface Paginate<T> {
  items: T[];
  metadata: {
    totalItems: number;
    perPage: number;
    totalPages: number;
  };
}

@ObjectType()
export class PaginatedSurvey implements Paginate<Survey> {
  items: Survey[];
  metadata: PaginatedMetadata;
}
