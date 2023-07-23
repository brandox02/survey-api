import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseEntity } from 'src/common/BaseEntity';
import { Survey } from 'src/modules/survey/entities/survey.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('answers')
@ObjectType()
export class Answer extends BaseEntity {
  @Column({ name: 'respondent_name' })
  respondentFullname: string;

  @Column({ name: 'respondent_email' })
  respondentEmail: string;

  @Column({ type: 'json' })
  @Field(() => GraphQLJSON)
  content: typeof GraphQLJSON;

  @Column({ name: 'survey_id' })
  surveyId: number;

  @ManyToOne(() => Survey, (c) => c.answers)
  @JoinColumn({ name: 'survey_id' })
  survey?: Survey;
}
