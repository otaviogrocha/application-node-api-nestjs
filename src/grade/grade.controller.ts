import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateGradeDTO } from './dto/createGrade.dto';
import { GradeService } from './grade.service';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}
  // @Post()
  // async createGrade(@Body() CreateGrade: CreateGradeDTO) {
  //   return this.gradeService.createGrade(CreateGrade);
  // }
  @Post(':idAluno')
  async createGrade(@Param('idAluno') idAluno: number, @Body() CreateGrade: CreateGradeDTO) {
    return this.gradeService.createGrade(idAluno, CreateGrade);
  } 
  @Get()
  async getAllGrades() {
    return this.gradeService.getAllGrades();
  }
}
