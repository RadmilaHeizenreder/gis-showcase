import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('school')
export class SchoolAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /* @Column()
  Schulnummer: string;

  @Column()
  Schulform: string;

  @Column()
  Name: string;

  @Column()
  Kurzname: string;

  @Column()
  Adresse: string;

  @Column()
  Postleitzahl: string;

  @Column()
  Ort: string;

  @Column()
  Schueler: string;

  @Column()
  Rufnummer: string;

  @Column()
  Email: string; */
  @Column()
  name: string;

  @Column('geography', { spatialFeatureType: 'Point' }) // Geometry-Spalte für Koordinaten
  coordinates: object;
}
