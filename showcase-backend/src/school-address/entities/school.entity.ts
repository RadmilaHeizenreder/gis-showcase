import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('school')
export class SchoolAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schulnummer: string;

  @Column()
  schulform: string;

  @Column()
  name: string;

  @Column()
  adresse: string;

  @Column()
  plz: string;

  @Column()
  ort: string;

  @Column()
  schueler: number;

  @Column()
  rufnummer: string;

  @Column()
  email: string;

  @Column('geography', { spatialFeatureType: 'Point' }) // Geometry-Spalte für Koordinaten
  geometry: object;
}
