import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolsDto {
  /*  @IsString()
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
  Email: string; */

  @IsString()
  name: string;

  @IsNotEmpty()
  coordinates: object;
}
