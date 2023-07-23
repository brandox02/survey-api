import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { CreateAnswerInput } from './dto/create-answer.input';
import { Paginate, PaginatedAnswer } from './dto/paginated-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { WhereAnswerInput } from './dto/where-answer.input';
import { Answer } from './entities/answer.entity';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly service: AnswerService) {}

  @Mutation(() => Answer)
  async createAnswer(@Args('input') input: CreateAnswerInput): Promise<Answer> {
    return this.service.create(input);
  }

  @Query(() => [Answer])
  async answerList(
    @Args('where', { defaultValue: {} }) where: WhereAnswerInput,
    @Context() context: any,
  ): Promise<Answer[]> {
    return this.service.findAll(where, context);
  }

  @Query(() => Answer)
  async answer(
    @Args('where') where: WhereAnswerInput,
    @Context() context: any,
  ): Promise<Answer> {
    return this.service.findOne(where, context);
  }

  @Query(() => PaginatedAnswer)
  async answers(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('perPage', { defaultValue: 12 }) perPage: number,
    @Args('where', { defaultValue: {} }) where: WhereAnswerInput,
    @Context() context: any,
  ): Promise<Paginate<Answer>> {
    return this.service.find({
      context,
      page,
      perPage,
      where,
      order: { id: 'DESC' },
    });
  }

  @Mutation(() => Answer)
  async updateAnswer(
    @Args('input') input: UpdateAnswerInput,
    @Context() context: any,
  ): Promise<Answer> {
    return this.service.update(input, context);
  }
}
