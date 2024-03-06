import { IsArray, IsEnum, IsUUID } from 'class-validator';
import { Enum, Geometry } from 'src/model';
import { SchoolAddressEntity } from 'src/school-address/entities/school.entity';
import { SubmissionEntity } from 'src/submission/entities/submission.entity';

export class CreateSchoolRouteDto {
  @IsUUID() //fremdschlüssel
  schoolId: SchoolAddressEntity;

  @IsUUID() //fremdschlüssel
  submissionId: SubmissionEntity;

  @IsArray()
  route: Geometry.DrawCoords;

  @IsEnum(Enum.Prio)
  prio: Enum.Prio;
}
