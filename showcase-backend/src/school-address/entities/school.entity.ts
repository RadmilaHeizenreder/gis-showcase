import { Geometry } from 'src/model';
import { SchoolRouteEntity } from 'src/school-routes/entities/school-route.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('school')
export class SchoolAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schoolId: string;

  @Column()
  schoolform: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  zipCode: string;

  @Column()
  city: string;

  @Column()
  numberOfStudents: number;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column('geography', { spatialFeatureType: 'Point' }) // Geometry-Spalte für Koordinaten
  geometry: Geometry.Point;

  @OneToMany(() => SchoolRouteEntity, (route) => route.schoolId)
  routes: SchoolRouteEntity[];
}
