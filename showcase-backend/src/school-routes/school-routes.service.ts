import { Injectable } from '@nestjs/common';
import { CreateSchoolRouteDto } from './dto/create-school-route.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolRouteEntity } from './entities/school-route.entity';
import { Repository } from 'typeorm';
@Injectable()
export class SchoolRoutesService {
  constructor(
    @InjectRepository(SchoolRouteEntity)
    private readonly repoSchoolRoute: Repository<SchoolRouteEntity>,
  ) {}

  async createSchoolRoute(
    createSchoolRouteDto: CreateSchoolRouteDto,
  ): Promise<SchoolRouteEntity> {
    try {
      const { schoolId, route, prio, submissionId } = createSchoolRouteDto;
      const schoolRoute = new SchoolRouteEntity();
      schoolRoute.schoolId = schoolId;
      schoolRoute.route = route;
      schoolRoute.prio = prio;
      schoolRoute.submissionId = submissionId;

      return this.repoSchoolRoute.save(schoolRoute);
    } catch (error) {
      console.log(`Error while saving path to database: ${error}`);
      throw new Error(`Error while saving path to database: ${error}`);
    }
  }
  async createRoutes(
    routes: SchoolRouteEntity[],
  ): Promise<SchoolRouteEntity[]> {
    try {
      const savedRoutes: SchoolRouteEntity[] = [];
      for (const route of routes) {
        // route.submissionId = submissionId;
        const savedRoute = await this.repoSchoolRoute.save(route);
        savedRoutes.push(savedRoute);
      }
      return savedRoutes;
    } catch (error) {
      console.log(`Error while saving path to database: ${error}`);
      throw new Error(`Error while saving path to database: ${error}`);
    }
  }

  async findAll() {
    try {
      return this.repoSchoolRoute.find();
    } catch (error) {
      console.log(`Error when calling up path to database: ${error}`);
      throw new Error(`Error when calling up path to database: ${error}`);
    }
  }

  async findRoutesBySchool(schoolId: number): Promise<SchoolRouteEntity[]> {
    try {
      const routes = await this.repoSchoolRoute.find({
        where: { schoolId: { id: schoolId } },
      });
      return routes;
    } catch (error) {
      console.log(`Error when calling up path to database: ${error}`);
      throw new Error(`Error when calling up path to database: ${error}`);
    }
  }
  async findRoutesBySubmission(
    submissionId: number,
  ): Promise<SchoolRouteEntity[]> {
    try {
      const routes = await this.repoSchoolRoute.find({
        where: { submissionId: { id: submissionId } },
      });
      return routes;
    } catch (error) {
      console.log(`Error when calling up path to database: ${error}`);
      throw new Error(`Error when calling up path to database: ${error}`);
    }
  }

  async getRoute(id: number): Promise<SchoolRouteEntity | null> {
    try {
      return this.repoSchoolRoute.findOne({ where: { id } });
    } catch (error) {
      console.log(`Error when calling up path to database: ${error}`);
      throw new Error(`Error when calling up path to database: ${error}`);
    }
  }
}
