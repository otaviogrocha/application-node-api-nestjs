import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { MasterConnection, Connection } from './database.providers';


@Module({
  imports: [
      TypeOrmModule.forRootAsync({
        useClass: MasterConnection,
      }),
      TypeOrmModule.forRootAsync({
        useClass: Connection,
      }),
  ],
  providers: []
})

export class DatabaseModule{}