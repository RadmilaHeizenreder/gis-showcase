import { Injectable } from '@nestjs/common';
import { SchoolAddressEntity } from './entities/school.entity';
import { CreateSchoolsDto } from './dto/school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { readFile } from 'fs/promises';
import * as path from 'path';

@Injectable()
export class SchoolAddressService {
  constructor(
    @InjectRepository(SchoolAddressEntity)
    private readonly repo: Repository<SchoolAddressEntity>, // private readonly parserService: ParserService,
  ) {}

  async findAll() {
    return `This action returns all schooladdress`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} schooladdress`;
  }

  async createSchoolAddress(
    createSchoolsDto: CreateSchoolsDto,
  ): Promise<SchoolAddressEntity> {
    try {
      return this.repo.save(createSchoolsDto);
    } catch (err) {
      console.log(`Error while saving path to database: ${err}`);
    }
  }

  async bootstrap(): Promise<void | null> {
    if ((await this.repo.count()) === 0) {
      await this.import(
        '../../src/school-address/bootstrap/geodaten_schulen.geojson',
      );
    }
  }

  async import(filePath: string): Promise<void> {
    const pathToGeojson = path.join(__dirname, filePath);
    try {
      const data = await readFile(pathToGeojson, 'utf-8');
      const geoJsonData = JSON.parse(data);
      if (geoJsonData && geoJsonData.features) {
        for (const feature of geoJsonData.features) {
          console.log(feature);

          if (feature.geometry.type === 'Point') {
            if (
              feature.properties &&
              typeof feature.properties === 'object' &&
              'Name' in feature.properties
            ) {
              const school = new SchoolAddressEntity();
              school.schulnummer = feature.properties.Schulnumme
                ? feature.properties.Schulnumme
                : '';
              school.schulform = feature.properties.Schulform
                ? feature.properties.Schulform
                : '';
              school.name = feature.properties.Name
                ? feature.properties.Name
                : '';
              school.adresse = feature.properties.Adresse
                ? feature.properties.Adresse
                : '';
              school.plz = feature.properties.Postleitza
                ? feature.properties.Postleitza
                : '';
              school.ort = feature.properties.Ort ? feature.properties.Ort : '';
              school.schueler = feature.properties.Schueler
                ? feature.properties.Schueler
                : '';
              school.rufnummer = feature.properties.Rufnummer
                ? feature.properties.Rufnummer
                : '';
              school.email = feature.properties.Email
                ? feature.properties.Email
                : '';
              school.geometry = {
                type: 'Point',
                coordinates: feature.geometry.coordinates,
              };

              await this.repo.save(school);
            } else {
              throw new Error(
                'Das GeoJSON-Feature enthält keinen gültigen Namen.',
              );
            }
          }
        }
      } else {
        throw new Error('ungültiges GeoJson-Format');
      }
    } catch (error) {
      throw new Error(
        `Fehler beim Lesen und Verarbeiten der GeoJSON-Datei: ${error.message}`,
      );
    }
  }
}
