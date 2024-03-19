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

  // async findSchoolByLevel(level: number) {
  //   const result = await this.repo
  //     .createQueryBuilder('ac')

  //     .select()
  //     .where('school.schoolform = :schoolform', { schoolform: 'Gesamtschule' }) // Standardfall für das breiteste Level-Spektrum
  //     .orWhere('school.schoolform = :schoolform AND :level BETWEEN 1 AND 4', {
  //       schoolform: 'Grundschule',
  //       level,
  //     })
  //     .orWhere('school.schoolform = :schoolform AND :level BETWEEN 5 AND 13', {
  //       schoolform: 'Gymnasium',
  //       level,
  //     })
  //     .orWhere('school.schoolform = :schoolform AND :level BETWEEN 5 AND 10', {
  //       schoolform: 'Hauptschule',
  //       level,
  //     })
  //     .orWhere('school.schoolform = :schoolform AND :level BETWEEN 5 AND 13', {
  //       schoolform: 'Realschule',
  //       level,
  //     })
  //     .orWhere('school.schoolform = :schoolform AND :level BETWEEN 11 AND 13', {
  //       schoolform: 'Berufskolleg',
  //       level,
  //     });

  //   return result.getMany();
  // }

  async findSchoolByLevel(level: number) {
    const eligibleSchoolForms = [];

    // Bestimmen, welche Schulformen basierend auf dem Level in Frage kommen
    if (level >= 1 && level <= 4) {
      eligibleSchoolForms.push('Grundschule');
    }
    if (level >= 5 && level <= 10) {
      eligibleSchoolForms.push('Hauptschule');
    }
    if (level >= 5 && level <= 13) {
      eligibleSchoolForms.push('Gymnasium', 'Realschule');
    }
    if (level >= 11 && level <= 13) {
      eligibleSchoolForms.push('Berufskolleg');
    }
    // Gesamtschule hinzufügen, da sie alle Level umfasst
    eligibleSchoolForms.push('Gesamtschule');

    // Eine Abfrage erstellen, die nur die zutreffenden Schulformen abfragt
    const queryBuilder = this.repo
      .createQueryBuilder('school')
      .where('school.schoolform IN (:...schoolforms)', {
        schoolforms: eligibleSchoolForms,
      });

    return queryBuilder.getMany();
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

      if (!geoJsonData || !geoJsonData.features) {
        throw new Error('ungültiges GeoJson-Format');
      }

      const schools = geoJsonData.features
        .filter(
          (feature) =>
            feature.geometry.type === 'Point' &&
            feature.properties &&
            typeof feature.properties === 'object' &&
            'Name' in feature.properties,
        )
        .map(({ geometry, properties }) => {
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
          return {
            schoolId: Schulnumme ?? '',
            schoolform: Schulform ?? '',
            name: Name ?? '',
            address: Adresse ?? '',
            zipCode: Postleitza ?? '',
            city: Ort ?? '',
            numberOfStudents: Schueler ?? '',
            phoneNumber: Rufnummer ?? '',
            email: Email ?? '',
            geometry: {
              type: 'Point',
              coordinates: geometry.coordinates,
            },
          };
        });

      await this.repo.save(schools);
    } catch (error) {
      throw new Error(
        `Fehler beim Lesen und Verarbeiten der GeoJSON-Datei: ${error.message}`,
      );
    }
  }
}
