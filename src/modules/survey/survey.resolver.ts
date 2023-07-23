import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { CreateSurveyInput } from './dto/create-survey.input';
import { Paginate, PaginatedSurvey } from './dto/paginated-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { WhereSurveyInput } from './dto/where-survey.input';
import { Survey } from './entities/survey.entity';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private readonly service: SurveyService) {}

  @Mutation(() => Survey)
  async createSurvey(@Args('input') input: CreateSurveyInput): Promise<Survey> {
    return this.service.create(input);
  }

  @Query(() => [Survey])
  async surveyList(
    @Args('where', { defaultValue: {} }) where: WhereSurveyInput,
    @Context() context: any,
  ): Promise<Survey[]> {
    return this.service.findAll(where, context);
  }

  @Query(() => Survey)
  async survey(
    @Args('where') where: WhereSurveyInput,
    @Context() context: any,
  ): Promise<Survey> {
    return this.service.findOne(where, context);
  }

  @Query(() => PaginatedSurvey)
  async surveys(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('perPage', { defaultValue: 12 }) perPage: number,
    @Args('where', { defaultValue: {} }) where: WhereSurveyInput,
    @Context() context: any,
  ): Promise<Paginate<Survey>> {
    return this.service.find({
      context,
      page,
      perPage,
      where,
      order: { id: 'DESC' },
    });
  }

  @Mutation(() => Survey)
  async updateSurvey(
    @Args('input') input: UpdateSurveyInput,
    @Context() context: any,
  ): Promise<Survey> {
    return this.service.update(input, context);
  }
}
