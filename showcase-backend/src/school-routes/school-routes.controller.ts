import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SchoolRoutesService } from './school-routes.service';
import { CreateSchoolRouteDto } from './dto/create-school-route.dto';
import { SchoolRouteEntity } from './entities/school-route.entity';

@Controller('routes')
export class SchoolRoutesController {
  constructor(private readonly schoolRoutesService: SchoolRoutesService) {}

  @Post()
  async createRoute(
    @Body() createSchoolRouteDto: CreateSchoolRouteDto,
  ): Promise<CreateSchoolRouteDto> {
    return await this.schoolRoutesService.createSchoolRoute(
      createSchoolRouteDto,
    );
  }

  @Get()
  async findAll(): Promise<SchoolRouteEntity[]> {
    return await this.schoolRoutesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SchoolRouteEntity | null> {
    return await this.schoolRoutesService.getRoute(id);
  }
  @Get(':id/school')
  async findAllRoutesBySchool(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SchoolRouteEntity[]> {
    return await this.schoolRoutesService.findRoutesBySchool(id);
  }
  @Get(':id/submission')
  async findAllRoutesBySubmission(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SchoolRouteEntity[]> {
    return await this.schoolRoutesService.findRoutesBySubmission(id);
  }
}
