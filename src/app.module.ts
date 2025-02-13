import { Module } from '@nestjs/common';
import { MateriaModule } from './materia/materia.module';
import { AlunoModule } from './aluno/aluno.module';
import { GradeModule } from './grade/grade.module';
import { HistoricoModule } from './historico/historico.module';
import { TopModule } from './top/top.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./.env.development.local'],
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USERNAME,
      synchronize: true,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
    }),

    MateriaModule,
    AlunoModule,
    GradeModule,
    HistoricoModule,
    TopModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
