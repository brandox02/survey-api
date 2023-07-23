import { Injectable } from '@nestjs/common';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { Between, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer.input';
import { WhereAnswerInput } from './dto/where-answer.input';
import { Answer } from './entities/answer.entity';
import * as dayjs from 'dayjs';
import { omit } from 'lodash';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginate } from './dto/paginated-answer.input';

@Injectable()
export class AnswerService {
  private readonly relations: string[] = ['survey'];
  constructor(
    @InjectRepository(Answer) private readonly repo: Repository<Answer>,
    private readonly utils: UtilsProvider,
  ) {}
  async create(input: CreateAnswerInput): Promise<Answer> {
    const answer = await this.repo.save(this.repo.create(input));
    return answer;
  }

  async findAll(where: WhereAnswerInput = {}, context: any): Promise<Answer[]> {
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
  }: FindAllInput<WhereAnswerInput>): Promise<Paginate<Answer>> {
    const copyWhere: any = { ...where };

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
    where: FindOptionsWhere<Answer>,
    context: any,
  ): Promise<Answer> {
    const copyWhere: any = { ...where };
    const withoutNull = this.utils.removeNullFields(copyWhere);
    if (!where || Object.keys(withoutNull).length == 0) {
      throw NotFoundException('Answer');
    }

    const item = await this.repo.findOne({
      where: withoutNull,
      relations: this.relations,
    });

    if (!item) {
      throw NotFoundException('Answer');
    }
    return item;
  }

  async update(input: UpdateAnswerInput, context: any): Promise<Answer> {
    await this.repo.save(this.repo.create(input));
    return this.findOne({ id: input.id }, context);
  }
}
