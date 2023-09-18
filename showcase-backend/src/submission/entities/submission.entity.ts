import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Anrede: string;

  @Column()
  Adresse: string;
}
