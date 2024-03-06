import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SchoolAddressEntity } from './entities/school.entity';
import { CreateSchoolsDto } from './dto/school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { readFile } from 'fs/promises';
import * as path from 'path';

@Injectable()
export class SchoolAddressService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(SchoolAddressEntity)
    private readonly repo: Repository<SchoolAddressEntity>, // private readonly parserService: ParserService,
  ) {}

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} schooladdress`;
  }

  async onApplicationBootstrap(): Promise<void | null> {
    if ((await this.repo.count()) === 0) {
      await this.import(
        '../../src/school-address/bootstrap/geodaten_schulen.geojson',
      );
    }
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

  async import(filePath: string): Promise<void> {
    const pathToGeojson = path.join(__dirname, filePath);
    try {
      const data = await readFile(pathToGeojson, 'utf-8');
      const geoJsonData = JSON.parse(data);
      if (geoJsonData && geoJsonData.features) {
        for (const feature of geoJsonData.features) {
          const { geometry, properties } = feature;
          const {
            Schulnumme,
            Schulform,
            Name,
            Adresse,
            Postleitza,
            Ort,
            Schueler,
            Rufnummer,
            Email,
          } = properties;
          if (geometry.type === 'Point') {
            if (
              properties &&
              typeof properties === 'object' &&
              'Name' in properties
            ) {
              const school = new SchoolAddressEntity();
              school.schoolId = Schulnumme ?? '';
              school.schoolform = Schulform ?? '';
              school.name = Name ?? '';
              school.address = Adresse ?? '';
              school.zipCode = Postleitza ?? '';
              school.city = Ort ?? '';
              school.numberOfStudents = Schueler ?? '';
              school.phoneNumber = Rufnummer ?? '';
              school.email = Email ?? '';
              school.geometry = {
                type: 'Point',
                coordinates: geometry.coordinates,
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
