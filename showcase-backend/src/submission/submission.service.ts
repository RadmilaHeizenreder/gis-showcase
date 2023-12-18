import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmissionEntity } from './entities/submission.entity';
import { Repository } from 'typeorm';
import { SchoolRouteEntity } from 'src/school-routes/entities/school-route.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(SubmissionEntity)
    private readonly repoSubmissions: Repository<SubmissionEntity>,
    @InjectRepository(SchoolRouteEntity)
    private readonly routeRepository: Repository<SchoolRouteEntity>,
  ) {}

  async createSubmission(
    createSubmissionDto: CreateSubmissionDto,
  ): Promise<SubmissionEntity> {
    try {
      const savedSubmission = await this.repoSubmissions.save(
        createSubmissionDto,
      );

      for (const route of savedSubmission.routes) {
        const schoolRoute = new SchoolRouteEntity();
        schoolRoute.schoolId = route.schoolId;
        schoolRoute.route = route.route;
        schoolRoute.prio = route.prio;
        schoolRoute.submissionId = savedSubmission;
        this.routeRepository.save(schoolRoute);
      }

      return savedSubmission;
    } catch (error) {
      console.log(`Error while saving path to database: ${error}`);
      throw new Error(`Error while saving path to database: ${error}`);
    }
  }

  async findAll(): Promise<SubmissionEntity[]> {
    try {
      return this.repoSubmissions.find();
    } catch (error) {
      console.log(`Error when calling up path to database: ${error}`);
      throw new Error(`Error when calling up path to database: ${error}`);
    }
  }
}
