import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { Survey } from './entities/survey.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  providers: [SurveyResolver, SurveyService, UtilsProvider, CloudinaryService],
})
export class SurveyModule {}
