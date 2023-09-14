import { IsString } from 'class-validator';
import { Point } from 'src/model/geometry';

export class CreateSchoolsDto {
  @IsString()
  Schulform: string;

  @IsString()
  Name: string;

  @IsString()
  Kurzname: string;

  @IsString()
  Adresse: string;

  @IsString()
  Postleitzahl: string;

  @IsString()
  Ort: string;

  @IsString()
  Schueler: string;

  @IsString()
  Rufnummer: string;

  @IsString()
  Email: string;

  @IsString() // Geometry-Spalte für Koordinaten
  coordinates: Point;
}
