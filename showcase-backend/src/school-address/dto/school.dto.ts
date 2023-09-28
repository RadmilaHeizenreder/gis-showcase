import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSchoolsDto {
  @IsString()
  schulnummer: string;

  @IsString()
  schulform: string;

  @IsString()
  name: string;

  @IsString()
  adresse: string;

  @IsString()
  plz: string;

  @IsString()
  ort: string;

  @IsNumber()
  schueler: number;

  @IsString()
  rufnummer: string;

  @IsString()
  email: string;

  @IsNotEmpty()
  geometry: object;
}
