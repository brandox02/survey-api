import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { AuthModule } from './modules/auth/auth.module';
import { SurveyModule } from './modules/survey/survey.module';
import { AnswerModule } from './modules/answer/answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphqlModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    SurveyModule,
    AnswerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // constructor(c: DataSource) {
  //   // this is for fix the delay time of posgresql
  //   const driver = c.driver as any;
  //   driver.postgres.defaults.parseInputDatesAsUTC = true;
  //   driver.postgres.types.setTypeParser(
  //     1114,
  //     (str: any) => new Date(str + 'Z'),
  //   );
  // }
}
