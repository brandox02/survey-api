import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { Answer } from './entities/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsProvider } from 'src/common/UtilsProvider';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  providers: [AnswerResolver, AnswerService, UtilsProvider],
})
export class AnswerModule {}
