import { ObjectType } from '@nestjs/graphql';

@ObjectType()
class ChartItemResponse {
  label: string;
  count: number;
}

@ObjectType()
export class ChartResponse {
  title: string;
  items: Array<ChartItemResponse>;
}
