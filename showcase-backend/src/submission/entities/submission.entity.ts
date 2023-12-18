import { SchoolRouteEntity } from 'src/school-routes/entities/school-route.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('submission')
export class SubmissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  submission: any;

  @OneToMany(() => SchoolRouteEntity, (route) => route.submissionId)
  routes: SchoolRouteEntity[];
}
