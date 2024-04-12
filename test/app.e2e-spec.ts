import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { AlunoEntity } from '../src/aluno/interfaces/aluno.entity';

describe('AppController (e2e)', () => {

  let app: INestApplication;

  let mock = [{id:1, name:'Otavio' }];
  const mockAlunoRepository = {
    find: jest.fn().mockResolvedValue(mock),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'admin',
          database: 'e2e_test',
          // synchronize: true,
          // dropSchema: true,
          entities: [`${__dirname}/**/*.entity{.js,.ts}`],
          // autoLoadEntities: true,
        }),
      ],
      // providers:[
      //   {
      //     provide: getRepositoryToken(AlunoEntity),
      //     useValue: mockAlunoRepository,
      //   },
      // ],
    }).compile();



    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  afterAll(async ()=>{
    await app.close();
  })

  it('should be defined', async() =>{
    expect(app).toBeDefined();
  })

  it('/aluno (GET)', () => {
    return request(app.getHttpServer())
      .get('/aluno')
      .expect(200)
      .expect(mock);
  });
});
