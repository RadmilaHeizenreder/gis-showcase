import { IsObject, IsString } from 'class-validator';
import { Geometry } from 'src/model';

export class CreateSubmissionDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsObject()
  geometry: Geometry.Point;
}
