import { Enum, Geometry } from 'src/model';
import { SchoolAddressEntity } from 'src/school-address/entities/school.entity';
import { SubmissionEntity } from 'src/submission/entities/submission.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('routes')
export class SchoolRouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SchoolAddressEntity, (school) => school.routes)
  @JoinColumn({ name: 'schoolId' })
  schoolId: SchoolAddressEntity;

  @ManyToOne(() => SubmissionEntity, (route) => route.routes) // ???
  @JoinColumn({ name: 'submissionId' })
  submissionId: SubmissionEntity;

  @Column('geography', { spatialFeatureType: 'LineString' })
  route: Geometry.DrawCoords;

  @Column({ type: 'enum', enum: Enum.Prio })
  prio: Enum.Prio;
}
