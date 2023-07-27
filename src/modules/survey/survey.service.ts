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
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ChartResponse } from './dto/chart-survey.output';

@Injectable()
export class SurveyService {
  private readonly relations: string[] = ['user', 'answers'];
  constructor(
    @InjectRepository(Survey) private readonly repo: Repository<Survey>,
    private readonly utils: UtilsProvider,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(input: CreateSurveyInput): Promise<Survey> {
    const mappedContent = await Promise.all(
      (input.content as any as Array<any>).map(async (item) => {
        if (item.type === 'imagepicker') {
          const choices = await Promise.all(
            item.choices.map(async (choice: any) => {
              if (choice.base64Image) {
                const { base64Image, ...restProps } = choice;
                const { url, public_id } =
                  await this.cloudinaryService.uploadImage(
                    choice.base64Image,
                    choice?.public_id,
                  );
                return { ...restProps, imageLink: url, public_id };
              }
              return choice;
            }),
          );
          return { ...item, choices };
        }
        return item;
      }),
    );

    const survey = await this.repo.save(
      this.repo.create({ ...input, content: mappedContent }),
    );
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

  async getCharts(
    where: WhereSurveyInput = {},
    context: any,
  ): Promise<ChartResponse> {
    const copyWhere: any = { ...where };

    const question = await this.repo.findOne({
      where: this.utils.removeNullFields(copyWhere),
      relations: this.relations,
      order: { createdAt: 'DESC' },
    });

    const temp = {};
    question.answers.forEach((is) => {
      Object.entries(is.content).forEach(([answerKey, answerItem]) => {
        if (Array.isArray(answerItem)) {
          answerItem.forEach((ld) => {
            if (temp[answerKey]) {
              temp[answerKey][ld] = (temp[answerKey][ld] || 0) + 1;
            } else {
              temp[answerKey] = { [ld]: 1 };
            }
          });
        }
      });
    });

    const mappedExtracted: any = {
      title: question.title,
      items: Object.entries(temp)
        .map(([key, value]) =>
          Object.entries(value).map(([key2, value2]) => ({
            label: (question.content as any)
              .find((u) => u.name === key)
              .choices.find((y) => y.value === key2).text,
            count: value2,
          })),
        )
        .flat(),
    };

    return mappedExtracted;
  }
}
