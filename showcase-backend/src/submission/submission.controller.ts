import { Controller, Get, Post, Body } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionEntity } from './entities/submission.entity';
// import { SchoolRoutesService } from 'src/school-routes/school-routes.service';

@Controller('api/v1/submission')
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService, // private readonly schoolRoutesService: SchoolRoutesService,
  ) {}

  @Post()
  async createSubmit(@Body() createSubmissionDto: CreateSubmissionDto) {
    await this.submissionService.createSubmission(createSubmissionDto);
  }

  @Get()
  async findAllSubmission(): Promise<SubmissionEntity[]> {
    return await this.submissionService.findAll();
  }
}
