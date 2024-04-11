import { Module } from '@nestjs/common';
import { MateriaModule } from './materia/materia.module';
import { AlunoModule } from './aluno/aluno.module';
import { GradeModule } from './grade/grade.module';
import { HistoricoModule } from './historico/historico.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaModule } from './nota/nota.module';
import { TopModule } from './top/top.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./.env.development.local'],
    }),

    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   database: "School_Schedule",
    //   host: "localhost",
    //   password: "admin",
    //   port: 3306,
    //   username: "root",
    //   synchronize: false,
    //   dropSchema: false,
    //   entities: [`${__dirname}/**/*.entity{.js,.ts}`],
    // }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USERNAME,
      synchronize: true,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      autoLoadEntities: true,
    }),

    MateriaModule,
    AlunoModule,
    GradeModule,
    HistoricoModule,
    NotaModule,
    TopModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
