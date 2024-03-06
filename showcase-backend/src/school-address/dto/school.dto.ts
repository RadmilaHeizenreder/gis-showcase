import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Geometry } from 'src/model';

export class CreateSchoolsDto {
  @IsString()
  schoolId: string;

  @IsString()
  schoolform: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  zipCode: string;

  @IsString()
  city: string;

  @IsNumber()
  numberOfStudents: number;

  @IsString()
  phoneNumber: string;

  @IsString()
  email: string;

  @IsNotEmpty()
  geometry: Geometry.Point;
}
