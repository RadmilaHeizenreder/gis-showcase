import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolRouteDto } from './create-school-route.dto';
import { IsArray, IsEnum } from 'class-validator';
import { Enum, Geometry } from 'src/model';

export class UpdateSchoolRouteDto extends PartialType(CreateSchoolRouteDto) {
  @IsArray()
  route: Geometry.DrawCoords;

  @IsEnum(Enum.Prio)
  prio: Enum.Prio;
}
