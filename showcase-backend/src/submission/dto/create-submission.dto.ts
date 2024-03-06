import { IsObject } from 'class-validator';
import { SchoolRouteEntity } from 'src/school-routes/entities/school-route.entity';

export class CreateSubmissionDto {
  @IsObject()
  submission: any;

  @IsObject()
  routes: SchoolRouteEntity[];
}
