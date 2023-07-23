import { Injectable } from '@nestjs/common';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { WhereSurveyInput } from './dto/where-survey.input';
import { Survey } from './entities/survey.entity';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginate } from './dto/paginated-survey.input';

@Injectable()
export class SurveyService {
  private readonly relations: string[] = ['user', 'answers'];
  constructor(
    @InjectRepository(Survey) private readonly repo: Repository<Survey>,
    private readonly utils: UtilsProvider,
  ) {}
  async create(input: CreateSurveyInput): Promise<Survey> {
    const survey = await this.repo.save(this.repo.create(input));
    return survey;
  }

  async findAll(where: WhereSurveyInput = {}, context: any): Promise<Survey[]> {
    const copyWhere: any = { ...where };

    const items = await this.repo.find({
      where: this.utils.removeNullFields(copyWhere),
      relations: this.relations,
      order: { createdAt: 'DESC' },
    });

    return items;
  }

  async find({
    page,
    perPage,
    where,
    order,
    context,
  }: FindAllInput<WhereSurveyInput>): Promise<Paginate<Survey>> {
    const copyWhere: any = { ...where };

    if (copyWhere.title) {
      copyWhere.title = ILike(`%${copyWhere.title}%`);
    }

    const totalItems = await this.repo.count({
      where: this.utils.removeNullFields(copyWhere),
    });

    return {
      items: await this.repo.find({
        where: this.utils.removeNullFields(copyWhere),
        skip: perPage * page,
        take: perPage,
        relations: this.relations,
        order,
      }),
      metadata: {
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
      },
    };
  }

  async findOne(
    where: FindOptionsWhere<Survey>,
    context: any,
  ): Promise<Survey> {
    const copyWhere: any = { ...where };
    const withoutNull = this.utils.removeNullFields(copyWhere);

    const item = await this.repo.findOne({
      where: withoutNull,
      relations: this.relations,
    });

    if (!item) {
      throw NotFoundException('Survey');
    }
    return item;
  }

  async update(input: UpdateSurveyInput, context: any): Promise<Survey> {
    await this.repo.save(this.repo.create(input));
    return this.findOne({ id: input.id }, context);
  }
}
